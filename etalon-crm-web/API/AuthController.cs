using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using DataModel;
using DataService;
using etalon_crm_web.Models.Common;
using etalon_crm_web.Models.Identity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Newtonsoft.Json.Linq;
using Role = etalon_crm_web.Models.Role;
using User = etalon_crm_web.Models.User;

namespace etalon_crm_web.API
{
    public class AuthController : ApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly DbService _dbService;

        public AuthController() : this(new UserManager<User>(new UserStore()), new RoleManager<Role>(new RoleStore()), new DbService(ConfigurationManager.ConnectionStrings["EtalonCrmDb"].ConnectionString))
        {
        }

        public AuthController(UserManager<User> userManager, RoleManager<Role> roleManager, DbService dbService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _dbService = dbService;
        }

        [HttpPost]
        [AllowAnonymous]
        public MessageModel RestorePassword(JObject jsonData)
        {
            try
            {
                var userAdmin = _dbService.ListUser().Single(x => x.UserName == "admin");
                var addressList = new List<string> {userAdmin.Email};

                dynamic data = jsonData;
                MailSender.Send("Восстановление пароля", 
                    string.Format("Пользователь с почтой {0} просит изменить пароль, по причине своей забывчивости!", data.email), addressList);

                return MessageBuilder.GetSuccessMessage(null);
            }
            catch (Exception ex)
            {
                return MessageBuilder.GetErrorMessage(ex.Message);
            }
        }

        [HttpGet]
        [AllowAnonymous]
        public MessageModel GetUserInfo()
        {
            try
            {
                return !User.Identity.IsAuthenticated ? 
                    MessageBuilder.GetErrorMessage("Пользователь не авторизован!") : MessageBuilder.GetSuccessMessage(_dbService.GetUserInfo(User.Identity.GetUserId()));
            }
            catch (Exception ex)
            {
                return MessageBuilder.GetErrorMessage(ex.Message);
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<MessageModel> Login(JObject jsonData)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return MessageBuilder.GetErrorMessage("Ошибка запроса");
                }

                dynamic json = jsonData;
                string email = json.email;
                string password = json.password;

                var user = await _userManager.FindByEmailAsync(email);
                if (user == null)
                    return MessageBuilder.GetErrorMessage(@"Неверная пара логин\пароль!");

                user = await _userManager.FindAsync(user.UserName, password);
                if (user == null)
                    return MessageBuilder.GetErrorMessage(@"Неверная пара логин\пароль!");

                await SignInAsync(user, true);
                return MessageBuilder.GetSuccessMessage(null);
            }
            catch (Exception ex)
            {
                return MessageBuilder.GetErrorMessage(ex.Message);
            }
        }

        [HttpPost]
        [Authorize]
        public MessageModel Logout()
        {
            try
            {
                AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
                return MessageBuilder.GetSuccessMessage(null);
            }
            catch (Exception ex)
            {
                return MessageBuilder.GetErrorMessage(ex.Message);
            }
        }
        

        private async Task SignInAsync(User user, bool isPersistent)
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ExternalCookie);
            var identity = await _userManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
            AuthenticationManager.SignIn(new AuthenticationProperties() { IsPersistent = isPersistent }, identity);
        }


        private static IAuthenticationManager AuthenticationManager => HttpContext.Current.GetOwinContext().Authentication;
    }
}
