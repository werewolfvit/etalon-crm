using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using DataService;
using etalon_crm_web.Models.Common;
using etalon_crm_web.Models.Identity;
using Microsoft.AspNet.Identity;
using Newtonsoft.Json.Linq;
using User = etalon_crm_web.Models.User;

namespace etalon_crm_web.API
{
    public class FilesController : ApiController
    {
        private readonly DbService _dbService;

        public FilesController() : this(new DbService(ConfigurationManager.ConnectionStrings["EtalonCrmDb"].ConnectionString))
        {

        }

        public FilesController(DbService dbService)
        {
            _dbService = dbService;
        }


        [Authorize]
        [HttpPost]
        public async Task<MessageModel> UploadProfilePhoto(string userId)
        {
            try
            {
                if (!Request.Content.IsMimeMultipartContent())
                {
                    throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
                }

                var steamProvider = new MultipartMemoryStreamProvider();
                await Request.Content.ReadAsMultipartAsync(steamProvider);

                var file = steamProvider.Contents[0];

                var filename = file.Headers.ContentDisposition.FileName.Trim('\"');
                var buffer = await file.ReadAsByteArrayAsync();

                var result = _dbService.SaveFile(buffer, filename);
                _dbService.SetUserPhotoId(result.FileId, userId);


                return MessageBuilder.GetSuccessMessage(result);
            }
            catch (Exception ex)
            {
                return MessageBuilder.GetErrorMessage(null);
            }
            
        }
    }
}
