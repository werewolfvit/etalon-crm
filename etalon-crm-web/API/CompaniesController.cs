using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DataModel;
using DataService;
using etalon_crm_web.Models.Common;
using etalon_crm_web.Models.Identity;
using Microsoft.AspNet.Identity;
using Newtonsoft.Json.Linq;

namespace etalon_crm_web.API
{
    [Authorize(Roles = "admin")]
    public class CompaniesController : ApiController
    {
        private readonly DbService _dbService;

        public CompaniesController() : this(
            new DbService(ConfigurationManager.ConnectionStrings["EtalonCrmDb"].ConnectionString))
        {

        }

        public CompaniesController(DbService dbService)
        {
            _dbService = dbService;
        }

        [HttpPost]
        public MessageModel Add(JObject jsonData)
        {
            try
            {
                var newComp = jsonData.ToObject<CompanyModel>();
                return MessageBuilder.GetSuccessMessage(_dbService.AddCompany(newComp));
            }
            catch (Exception ex)
            {
                return MessageBuilder.GetErrorMessage(ex.Message);
            }
        }

        [HttpGet]
        public MessageModel List()
        {
            try
            {
                return MessageBuilder.GetSuccessMessage(_dbService.ListCompany());
            }
            catch (Exception ex)
            {
                return MessageBuilder.GetErrorMessage(ex.Message);
            }
        }

        [HttpPost]
        public MessageModel Update(JObject jsonData)
        {
            try
            {
                var currComp = jsonData.ToObject<CompanyModel>();
                _dbService.UpdateCompany(currComp);
                return MessageBuilder.GetSuccessMessage(null);
            }
            catch (Exception ex)
            {
                return MessageBuilder.GetErrorMessage(ex.Message);
            }
        }

        [HttpPost]
        public MessageModel Delete(JObject jsonData)
        {
            try
            {
                var currComp = jsonData.ToObject<CompanyModel>();
                _dbService.DeleteCompany(currComp);
                return MessageBuilder.GetSuccessMessage(null);
            }
            catch (Exception ex)
            {
                return MessageBuilder.GetErrorMessage(ex.Message);
            }
        }
    }
}
