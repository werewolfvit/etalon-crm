using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataModel;

namespace DataService
{
    // Company
    public partial class DbService
    {
        public CompanyModel AddCompany(CompanyModel company)
        {
            try
            {
                using (var db = GetDataContext())
                {
                    var newComp = new Company {Name = company.Name};
                    db.Companies.InsertOnSubmit(newComp);
                    db.SubmitChanges();
                    return new CompanyModel()
                    {
                        IdRecord = newComp.IdRecord,
                        Name = newComp.Name
                    };
                }
            }
            catch (Exception ex)
            {
                // need Log
                throw new Exception("Can't add new company");
            }
        }

        public void DeleteCompany(CompanyModel company)
        {
            try
            {
                using (var db = GetDataContext())
                {
                    var currComp = db.Companies.Single(x => x.IdRecord == company.IdRecord);
                    db.Companies.DeleteOnSubmit(currComp);
                    db.SubmitChanges();
                }
            }
            catch (Exception ex)
            {
                // need Log
                throw new Exception("Can't delete company");
            }
        }

        public void UpdateCompany(CompanyModel company)
        {
            try
            {
                using (var db = GetDataContext())
                {
                    var currComp = db.Companies.Single(x => x.IdRecord == company.IdRecord);
                    currComp.Name = company.Name;
                    db.SubmitChanges();
                }
            }
            catch (Exception ex)
            {
                // need Log
                throw new Exception("Can't edit company");
            }
        }

        public IEnumerable<CompanyModel> ListCompany()
        {
            try
            {
                using (var db = GetDataContext())
                {
                    return db.Companies.Select(x => new CompanyModel()
                    {
                        IdRecord = x.IdRecord,
                        Name = x.Name
                    }).ToList();
                }
            }
            catch (Exception ex)
            {
                // need Log
                throw new Exception("Can't get company-list");
            }
        }
    }
}
