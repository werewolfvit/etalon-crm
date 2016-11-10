using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;
using etalon_crm_web.Models;
using etalon_crm_web.Models.Common;
using etalon_crm_web.Models.Identity;
using Microsoft.AspNet.Identity;
using Newtonsoft.Json.Linq;

namespace etalon_crm_web.API
{
    [System.Web.Http.Authorize(Roles = "admin")]
    public class RolesController : ApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManger;

        public RolesController() : this(new UserManager<User>(new UserStore()), new RoleManager<Role>(new RoleStore()))
        {
        }

        public RolesController(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            _userManager = userManager;
            _roleManger = roleManager;
        }

        [System.Web.Http.HttpPost]
        public MessageModel SetByUserId(JObject jsonData)
        {
            try
            {
                dynamic data = jsonData;
                var rolesArr = JArray.Parse(data.Data.ToString());
                string[] needRoles = rolesArr.ToObject<string[]>();

                string userId = data.UserId;
                var currRoles = _userManager.GetRoles(userId);

                var rolesToAdd = needRoles.Except(currRoles);
                var result = _userManager.AddToRoles(userId, rolesToAdd.ToArray());
                if (!result.Succeeded)
                    return MessageBuilder.GetErrorMessage(string.Join(Environment.NewLine, result.Errors));

                var rolesToRem = currRoles.Except(needRoles);
                result = _userManager.RemoveFromRoles(userId, rolesToRem.ToArray());
                if (!result.Succeeded)
                    return MessageBuilder.GetErrorMessage(string.Join(Environment.NewLine, result.Errors));

                return MessageBuilder.GetSuccessMessage(null);
            }
            catch (Exception ex)
            {
                return MessageBuilder.GetErrorMessage(ex.Message);
            }
        }

        [System.Web.Http.HttpGet]
        public MessageModel GetAll()
        {
            return MessageBuilder.GetSuccessMessage(_roleManger.Roles);
        }

        [System.Web.Http.HttpGet]
        public MessageModel GetByUserId(string userId)
        {
            return MessageBuilder.GetSuccessMessage(_userManager.GetRoles(userId));
        }
    }
}
