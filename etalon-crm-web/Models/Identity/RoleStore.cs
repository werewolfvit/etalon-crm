using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Dapper;
using Microsoft.AspNet.Identity;

namespace etalon_crm_web.Models.Identity
{
    public class RoleStore : IRoleStore<Role>, IQueryableRoleStore<Role>
    {
        private string _connectionString;

        public RoleStore() : this(ConfigurationManager.ConnectionStrings["EtalonCrmDb"].ConnectionString)
        {
        }

        public RoleStore(string connectionString)
        {
            if (connectionString == null)
                throw new ArgumentException(nameof(connectionString));

            _connectionString = connectionString;
        }

        public void Dispose()
        {
            Dispose();
        }

        public Task CreateAsync(Role role)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(Role role)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(Role role)
        {
            throw new NotImplementedException();
        }

        public Task<Role> FindByIdAsync(string roleId)
        {
            throw new NotImplementedException();
        }

        public Task<Role> FindByNameAsync(string roleName)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Role> Roles
        {
            get
            {
                using (var db = new SqlConnection(_connectionString))
                {
                    return db.Query<Role>("SELECT * FROM SecRoles").AsQueryable();
                }
            }
        }
    }
}