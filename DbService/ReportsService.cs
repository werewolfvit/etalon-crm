using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataModel;

namespace DataService
{
    //class ReportsService
    public partial class DbService
    {
        public List<ReportClientRoomModel> GetReportClientRoomData()
        {
            using (var db = GetDataContext())
            {
                return db.vClientsRoomsReports.Select(x => new ReportClientRoomModel()
                {
                    BTINums = x.BTINums,
                    DocDate = x.DocDate,
                    DocExpDate = x.DocExpDate,
                    DocNum = x.DocNum,
                    FloorId = x.FloorId,
                    FullName = x.FullName,
                    Number = x.Number,
                    RentPayment = x.RentPayment,
                    Square = x.Square,
                    MonthCount = x.MonthCount,
                    PayByDoc = x.PayByDoc,
                    PayReceived = x.PayReceived,
                    ToPay = x.ToPay,
                    Building = x.Building,
                    MeterPrice = x.MeterPrice
                }).ToList();
            }
        }
    }
}
