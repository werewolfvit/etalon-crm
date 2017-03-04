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
    public class UserStore : IUserStore<User>,
            IUserPasswordStore<User>,
            IUserSecurityStampStore<User>,
            IUserRoleStore<User>,
            IQueryableUserStore<User>,
            IUserEmailStore<User>
    {

        private readonly string _connectionString;

        public UserStore() : this(ConfigurationManager.ConnectionStrings["EtalonCrmDb"].ConnectionString)
        {
        }

        public UserStore(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void Dispose()
        {
            Dispose();
        }

        public Task CreateAsync(User user)
        {
            return Task.Factory.StartNew(() =>
            {
                using (var db = new SqlConnection(_connectionString))
                {
                    return
                        db.Execute(@"INSERT INTO Users(UserId, UserName, PasswordHash, SecurityStamp) 
                        values (@userId, @userName, @passwordHash, @securityStamp)",
                            user);
                }
            });
        }

        public Task UpdateAsync(User user)
        {
            return Task.Factory.StartNew(() =>
            {
                using (var db = new SqlConnection(_connectionString))
                {
                    return
                        db.Execute(
                            @"UPDATE Users SET UserName = @UserName,  PasswordHash = @PasswordHash, SecurityStamp = @SecurityStamp 
                                WHERE UserId = @UserId",
                            user);
                }
            });
        }

        public Task DeleteAsync(User user)
        {
            return Task.Factory.StartNew(() =>
            {
                using (var db = new SqlConnection(_connectionString))
                {
                    return db.Execute(@"DELETE FROM UsersRoles WHERE UserId = @UserId; 
                    DELETE Users WHERE UserId = @UserId", user);
                }
            });
        }

        public Task<User> FindByIdAsync(string userId)
        {
            return Task.Factory.StartNew(() =>
            {
                using (var db = new SqlConnection(_connectionString))
                {
                    return (db.QueryFirstOrDefault<User>("SELECT * FROM Users WHERE UserId = @UserId",
                        new { UserId = userId }));
                }
            });
        }

        public Task<User> FindByNameAsync(string userName)
        {
            return Task.Factory.StartNew(() =>
            {
                using (var db = new SqlConnection(_connectionString))
                {
                    return db.QueryFirstOrDefault<User>("SELECT * FROM Users WHERE UserName = @UserName", new { userName });
                }
            });
        }

        public Task SetPasswordHashAsync(User user, string passwordHash)
        {
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            user.PasswordHash = passwordHash;
            return Task.FromResult(0);
        }

        public Task<string> GetPasswordHashAsync(User user)
        {
            return Task.Factory.StartNew(() =>
            {
                using (var db = new SqlConnection(_connectionString))
                {
                    return
                            db.QueryFirstOrDefault<string>(
                                "SELECT TOP 1 PasswordHash FROM Users WHERE @UserId = UserId",
                                new { user.UserId });
                }
            });
        }

        public Task<bool> HasPasswordAsync(User user)
        {
            return Task.FromResult(!string.IsNullOrWhiteSpace(user.PasswordHash));
        }

        public Task SetSecurityStampAsync(User user, string stamp)
        {
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            user.SecurityStamp = stamp;
            return Task.FromResult(0);
        }

        public Task<string> GetSecurityStampAsync(User user)
        {
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            return Task.FromResult(user.SecurityStamp);
        }

        public Task AddToRoleAsync(User user, string roleName)
        {
            return Task.Factory.StartNew(() =>
            {
                using (var db = new SqlConnection(_connectionString))
                {
                    return db.Execute(@"INSERT INTO UsersRoles (UserId, RoleId) 
                    VALUES (@UserId, (SELECT TOP 1 RoleId FROM Roles WHERE Name = @roleName))",
                        new { user.UserId, roleName });
                }
            });
        }

        public Task RemoveFromRoleAsync(User user, string roleName)
        {
            return Task.Factory.StartNew(() =>
            {
                using (var db = new SqlConnection(_connectionString))
                {
                    return db.Execute("DELETE FROM UsersRoles " +
                                           "WHERE userId = @userId AND RoleId = (SELECT TOP 1 RoleId FROM Roles WHERE Name = @roleName)",
                        new { user.UserId, roleName });
                }
            });
        }

        public Task<IList<string>> GetRolesAsync(User user)
        {
            return Task.Factory.StartNew(() =>
            {
                using (var db = new SqlConnection(_connectionString))
                {
                    var result = db.Query<string>(@"SELECT DISTINCT Name FROM Roles
                    WHERE RoleId IN (SELECT RoleId FROM UsersRoles WHERE UserId = @UserId)", new { user.UserId });
                    return (IList<string>)result.ToList();
                }
            });
        }

        public Task<bool> IsInRoleAsync(User user, string roleName)
        {
            return Task.Factory.StartNew(() =>
            {
                using (var db = new SqlConnection(_connectionString))
                {
                    var result = db.Query<string>(@"SELECT DISTINCT Name FROM Roles 
                    WHERE RoleId IN (SELECT RoleId FROM UsersRoles WHERE UserId = @UserId)", new { user.UserId });
                    return result.Contains(roleName);
                }
            });
        }

        public IQueryable<User> Users
        {
            get
            {
                using (var db = new SqlConnection(_connectionString))
                {
                    return db.Query<User>("SELECT * FROM Users").AsQueryable();
                }
            }
        }

        public Task SetEmailAsync(User user, string email)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetEmailAsync(User user)
        {
            throw new NotImplementedException();
        }

        public Task<bool> GetEmailConfirmedAsync(User user)
        {
            throw new NotImplementedException();
        }

        public Task SetEmailConfirmedAsync(User user, bool confirmed)
        {
            throw new NotImplementedException();
        }

        public Task<User> FindByEmailAsync(string email)
        {
            return Task.Factory.StartNew(() =>
            {
                using (var db = new SqlConnection(_connectionString))
                {
                    return db.QueryFirstOrDefault<User>("SELECT * FROM Users WHERE Email = @Email", new { email });
                }
            });
        }
    }
}