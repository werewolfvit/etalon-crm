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
                    var newComp = new Company {
                        Name = company.Name,
                        FullName = company.FullName,
                        DocNum = company.DocNum,
                        BTINums = company.BTINums,
                        Building = company.Building,
                        DocDate = company.DocDate,
                        DocExpDate = company.DocExpDate,
                        RentPayment = company.RentPayment,
                        MonthCount = company.MonthCount,
                        PayByDoc = company.PayByDoc,
                        ToPay = company.ToPay,
                        PayReceived = company.PayReceived
                    };
                    db.Companies.InsertOnSubmit(newComp);
                    db.SubmitChanges();
                    return new CompanyModel()
                    {
                        IdRecord = newComp.IdRecord,
                        Name = newComp.Name,
                        FullName = newComp.FullName,
                        DocNum = newComp.DocNum,
                        BTINums = newComp.BTINums,
                        Building = newComp.Building,
                        DocDate = newComp.DocDate,
                        DocExpDate = newComp.DocExpDate,
                        RentPayment = newComp.RentPayment,
                        MonthCount = newComp.MonthCount,
                        PayByDoc = newComp.PayByDoc,
                        ToPay = newComp.ToPay,
                        PayReceived = newComp.PayReceived
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
                    currComp.BTINums = company.BTINums;
                    currComp.Building = company.Building;
                    currComp.DocNum = company.DocNum;
                    currComp.DocDate = company.DocDate;
                    currComp.DocExpDate = company.DocExpDate;
                    currComp.RentPayment = company.RentPayment;
                    currComp.FullName = company.FullName;
                    currComp.MonthCount = company.MonthCount;
                    currComp.PayByDoc = company.PayByDoc;
                    currComp.ToPay = company.ToPay;
                    currComp.PayReceived = company.PayReceived;
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
                        Name = x.Name,
                        FullName = x.FullName,
                        BTINums = x.BTINums,
                        Building = x.Building,
                        DocDate = x.DocDate,
                        DocExpDate = x.DocExpDate,
                        DocNum = x.DocNum,
                        RentPayment = x.RentPayment,
                        MonthCount = x.MonthCount,
                        PayReceived = x.PayReceived,
                        ToPay = x.ToPay,
                        PayByDoc = x.PayByDoc
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
