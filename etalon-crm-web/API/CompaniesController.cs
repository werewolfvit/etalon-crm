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
using NLog;

namespace etalon_crm_web.API
{
    [Authorize(Roles = "Admin, Employer")]
    public class CompaniesController : ApiController
    {
        private readonly DbService _dbService;
        private readonly Logger _logger = LogManager.GetLogger("CompaniesController");

        public CompaniesController() : this(
            new DbService(ConfigurationManager.ConnectionStrings["EtalonCrmDb"].ConnectionString))
        {

        }

        public CompaniesController(DbService dbService)
        {
            _dbService = dbService;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public MessageModel Add(JObject jsonData)
        {
            try
            {
                CompanyModel newComp = ParseJsonCompany(jsonData);
                return MessageBuilder.GetSuccessMessage(_dbService.AddCompany(newComp));
            }
            catch (Exception ex)
            {
                return MessageBuilder.GetErrorMessage(ex.Message);
            }
        }

        private CompanyModel ParseJsonCompany(JObject jsonData)
        {
            dynamic data = jsonData;
            var result = new CompanyModel();

            string monthCount = data.MonthCount;
            result.MonthCount = string.IsNullOrWhiteSpace(monthCount) ? null : data.MonthCount;

            string payByDoc = data.PayByDoc;
            result.PayByDoc = string.IsNullOrWhiteSpace(payByDoc) ? null : data.PayByDoc;

            string payReceived = data.PayReceived;
            result.PayReceived = string.IsNullOrWhiteSpace(payReceived) ? null : data.PayReceived;

            string toPay = data.ToPay;
            result.ToPay = string.IsNullOrWhiteSpace(toPay) ? null : data.ToPay;

            result.BTINums = data.BTINums;
            result.Building = data.Building;

            string docDate = data.DocDate;
            if (!string.IsNullOrWhiteSpace(docDate))
                result.DocDate = DateTime.Parse(docDate);
            else
                result.DocDate = null;
            
            string docExpDate = data.DocExpDate;
            if (!string.IsNullOrWhiteSpace(docExpDate))
                result.DocExpDate = DateTime.Parse(docExpDate);
            else
                result.DocExpDate = null;

            result.DocNum = data.DocNum;
            result.FullName = data.FullName;
            result.IdRecord = data.IdRecord;
            result.Name = data.Name;

            string rentPayment = data.RentPayment;
            if (!string.IsNullOrWhiteSpace(rentPayment))
                result.RentPayment = data.RentPayment;
            else
                result.RentPayment = null;

            return result;
        }

        [Authorize(Roles = "Admin, Employer")]
        [HttpGet]
        public MessageModel List()
        {
            try
            {
                return MessageBuilder.GetSuccessMessage(_dbService.ListCompany(User.IsInRole("Employer")));
            }
            catch (Exception ex)
            {
                return MessageBuilder.GetErrorMessage(ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public MessageModel Update(JObject jsonData)
        {
            try
            {
                var currComp = ParseJsonCompany(jsonData);
                _dbService.UpdateCompany(currComp);
                return MessageBuilder.GetSuccessMessage(null);
            }
            catch (Exception ex)
            {
                return MessageBuilder.GetErrorMessage(ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
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
