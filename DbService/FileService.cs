using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataModel;

namespace DataService
{
    /* Files */
    public partial class DbService
    {
        public FileModel SaveFile(byte[] filebody, string filename)
        {
            using (var db = GetDataContext())
            {
                var newFileName = SaveToFileSystem(filebody, filename);

                var file = new File
                {
                    Name = filename,
                    Path = GetRelativeUrl(newFileName)
                };
                db.Files.InsertOnSubmit(file);
                db.SubmitChanges();

                return new FileModel()
                {
                    FileId = file.IdRecord,
                    Url = file.Path
                };
            }
        }

        private static string SaveToFileSystem(byte[] filebody, string filename)
        {
            string photoPath = ConfigurationManager.AppSettings["FilePath"];

            var appDirName = Path.GetDirectoryName(AppDomain.CurrentDomain.BaseDirectory);
            
            string serverPhotoPath = Path.Combine(appDirName, photoPath);

            if (!Directory.Exists(serverPhotoPath)) { Directory.CreateDirectory(serverPhotoPath); };
            string newFileName = Path.GetFileNameWithoutExtension(filename) + "_" + Guid.NewGuid() + Path.GetExtension(filename);
            string fullPath = serverPhotoPath + newFileName;
            System.IO.File.WriteAllBytes(fullPath, filebody);
            return newFileName;
        }

        public static string GetRelativeUrl(string path)
        {
            if (!string.IsNullOrWhiteSpace(path))
            {
                string photoPath = @"/" + ConfigurationManager.AppSettings["FilePath"].Replace(@"\", "/");
                return Path.Combine(photoPath, path);
            }
            else return null;
        }
    }
}
