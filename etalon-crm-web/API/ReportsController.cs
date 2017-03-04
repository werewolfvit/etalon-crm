using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using DataService;
using etalon_crm_web.Models.Reports;

namespace etalon_crm_web.API
{
    [System.Web.Http.Authorize(Roles = "Admin")]
    public class ReportsController : ApiController
    {
        private DbService _dbService;

        public ReportsController()
            : this(new DbService(ConfigurationManager.ConnectionStrings["EtalonCrmDb"].ConnectionString))
        {

        }

        public ReportsController(DbService dbService)
        {
            _dbService = dbService;
        }

        [System.Web.Http.HttpGet]
        public HttpResponseMessage ClientRoom()
        {
            try
            {
                HttpResponseMessage result = null;
                result = Request.CreateResponse(HttpStatusCode.OK);

                var data = _dbService.GetReportClientRoomData();
                var package = ReportBuilder.GetClientRoomReport(data);
                var fileStream = new MemoryStream();
                package.SaveAs(fileStream);
                fileStream.Position = 0;

                result.Content = new StreamContent(fileStream);
                result.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
                result.Content.Headers.ContentDisposition.FileName = "Отчет_Клиент_Офис_от_{DATE}.xlsx".Replace("{DATE}", DateTime.Now.ToString("dd.MM.yyy"));
                return result;
            }
            catch (Exception ex)
            {
                // log
                return null;
            }
           
        }
    }
}
