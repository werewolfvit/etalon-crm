using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Authentication;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Helpers;
using System.Web.Http;
using System.Web.Mvc;
using DataService;
using DataModel;
using etalon_crm_web.Models.Common;
using etalon_crm_web.Models.Identity;
using Microsoft.AspNet.Identity;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using User = etalon_crm_web.Models.User;

namespace etalon_crm_web.API
{
    [System.Web.Http.Authorize(Roles = "Admin")]
    public class UsersController : ApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly DbService _dbService;

        public UsersController() : this(new UserManager<User>(new UserStore()),
            new DbService(ConfigurationManager.ConnectionStrings["EtalonCrmDb"].ConnectionString))
        {

        }

        public UsersController(UserManager<User> userManager, DbService dbService)
        {
            _dbService = dbService;
            _userManager = userManager;
        }

        [System.Web.Http.HttpPost]
        public MessageModel Add(JObject jsonData)
        {
            try
            {
                dynamic data = jsonData;
                var newUserGuid = Guid.NewGuid();
                var userName = newUserGuid.ToString().Replace("-", "");
                var result = _userManager.Create(new User()
                {
                    UserId = newUserGuid,
                    UserName = userName
                });

                if (!result.Succeeded)
                    return MessageBuilder.GetErrorMessage("При добавлении пользователя была допущена ошибка!");

                var userToUpdate = new UserModel()
                {
                    UserName = userName,
                    UserId = newUserGuid,
                    IsActive = data.IsActive,
                    Description = data.Description,
                    Email = data.Email,
                    Name = data.Name,
                    Surname = data.Surname,
                    Middlename = data.Middlename,
                    Phone = data.Phone,
                    Position = data.Position,
                    TimeLimit = data.TimeLimit,
                    CompanyId = data.CompanyId
                };
                _dbService.UpdateUser(userToUpdate);

                return MessageBuilder.GetSuccessMessage(userToUpdate);
            }
            catch (Exception ex)
            {
                return MessageBuilder.GetErrorMessage(ex.Message);
            }
        }

        [System.Web.Http.Authorize(Roles = "Admin,Employer,Renter")]
        [System.Web.Http.HttpPost]
        public MessageModel UserChangePassword(JObject jsonData)
        {
            try
            {
                dynamic data = jsonData;
                string pass = data.password;
                var user = _userManager.FindByName(User.Identity.Name);
                user.PasswordHash = _userManager.PasswordHasher.HashPassword(pass);
                var result = _userManager.Update(user);
                if (!result.Succeeded)
                    return MessageBuilder.GetErrorMessage(string.Join(Environment.NewLine, result.Errors));

                return MessageBuilder.GetSuccessMessage(null);
            }
            catch (Exception ex)
            {
                return MessageBuilder.GetErrorMessage(ex.Message);
            }
        }

        [System.Web.Http.HttpPost]
        public MessageModel ChangePassword(JObject jsonData)
        {
            try
            {
                dynamic data = jsonData;
                string userId = data.UserId;
                string pass = data.Data.Pass;
                string confPass = data.Data.ConfPass;

                if (string.IsNullOrWhiteSpace(pass) || string.IsNullOrWhiteSpace(confPass) || pass != confPass)
                    return MessageBuilder.GetErrorMessage("Пароли не совпадают");

                var user = _userManager.FindById(userId);
                user.PasswordHash = _userManager.PasswordHasher.HashPassword(pass);
                var result = _userManager.Update(user);
                if (!result.Succeeded)
                    return MessageBuilder.GetErrorMessage(string.Join(Environment.NewLine, result.Errors));

                return MessageBuilder.GetSuccessMessage(null);
            }
            catch (Exception ex)
            {
                return MessageBuilder.GetErrorMessage(ex.Message);
            }
        }

        //[System.Web.Http.HttpPost]
        //public MessageModel Delete(JObject jsonData)
        //{
        //    try
        //    {
        //        dynamic data = jsonData;
        //        string userId = data.userId;
        //        var userToDelete = _userManager.FindById(userId);
        //        var result = _userManager.Delete(userToDelete);
        //        return result.Succeeded
        //            ? MessageBuilder.GetSuccessMessage(null)
        //            : MessageBuilder.GetErrorMessage(string.Join(Environment.NewLine, result.Errors));
        //    }
        //    catch (Exception ex)
        //    {
        //        return MessageBuilder.GetErrorMessage(ex.Message);
        //    }
        //}

        [System.Web.Http.HttpPost]
        public MessageModel Update(JObject jsonData)
        {
            try
            {
                dynamic data = jsonData;
                var userToUpd = new UserModel()
                {
                    Description = data.Description,
                    Email = data.Email,
                    IsActive = data.IsActive,
                    Middlename = data.Middlename,
                    Phone = data.Phone,
                    PhotoId = data.PhotoId,
                    Position = data.Position,
                    Name = data.Name,
                    Surname = data.Surname,
                    TimeLimit = data.TimeLimit,
                    UserId = data.UserId,
                    UserName = data.UserName,
                    CompanyId = data.CompanyId
                };

                _dbService.UpdateUser(userToUpd);
                return MessageBuilder.GetSuccessMessage(null);
            }
            catch (Exception ex)
            {
                return MessageBuilder.GetErrorMessage(ex.Message);
            }
        }

        [System.Web.Http.HttpGet]
        public MessageModel List()
        {
            try
            {
                var users = _dbService.ListUser();
                return MessageBuilder.GetSuccessMessage(users);
            }
            catch (Exception ex)
            {
                return MessageBuilder.GetErrorMessage(ex.Message);
            }
        }
    }
}
