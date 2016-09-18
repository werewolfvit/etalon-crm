using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using etalon_crm_web.Models;
using etalon_crm_web.Models.Common;
using etalon_crm_web.Models.Identity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;

namespace etalon_crm_web.API
{
    public class AuthController : ApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;

        public AuthController() : this(new UserManager<User>(new UserStore()), new RoleManager<Role>(new RoleStore()))
        {
        }

        public AuthController(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<MessageModel> Login([FromBody] LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return MessageBuilder.GetErrorMessage("Ошибка запроса");
            }

            var user = await _userManager.FindAsync(model.Login, model.Password);
            if (user == null)
                return MessageBuilder.GetErrorMessage(@"Неверная пара логин\пароль!");

            try
            {
                await SignInAsync(user, true);
                return MessageBuilder.GetSuccessMessage(null);
            }
            catch (Exception ex)
            {
                return MessageBuilder.GetErrorMessage(ex.Message);
            }
        }

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
