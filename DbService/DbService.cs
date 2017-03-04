using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using DataService;
using NLog;

namespace DataService
{
    public partial class DbService
    {
        private readonly string _connectionString;
        private static Logger _logger = LogManager.GetLogger("DbService");

        private static string IdentityName
        {
            get
            {
                var customIdentity = Thread.CurrentPrincipal.Identity.Name;

                if (!string.IsNullOrEmpty(customIdentity))
                    return customIdentity;
                var windowsIdentity = System.Security.Principal.WindowsIdentity.GetCurrent();
                return windowsIdentity != null ? windowsIdentity.Name : string.Empty;
            }
        }

        private EtalonDbDataContext GetDataContext()
        {
            if (string.IsNullOrWhiteSpace(_connectionString))
            {
                throw new Exception("Incorrect connection string");
            }

            return new EtalonDbDataContext(_connectionString);
        }

        public DbService(string connectionString)
        {
            _connectionString = connectionString;
        }
    }
}
