using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DataModel;
using OfficeOpenXml;
using OfficeOpenXml.Drawing;
using OfficeOpenXml.Style;

namespace etalon_crm_web.Models.Reports
{
    public static class ReportBuilder
    {
        public static ExcelPackage GetClientRoomReport(List<ReportClientRoomModel> data)
        {
            ExcelPackage p = new ExcelPackage();
            var sheetName = "Отчет";
            p.Workbook.Worksheets.Add(sheetName);
            ExcelWorksheet ws = p.Workbook.Worksheets[1];
            ws.Name = sheetName;
            var headerCells = ws.Cells[1, 1, 1, 15];
            headerCells.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            headerCells.Style.VerticalAlignment = ExcelVerticalAlignment.Center;
            headerCells.Style.WrapText = true;
            headerCells.Style.Font.Bold = true;
            ws.Row(1).Height = 57;

            ws.Cells[1, 1].Value = "№ договора";
            ws.Column(1).Width = 12;
            ws.Cells[1, 2].Value = "Дата начала договора";
            ws.Column(2).Width = 14;
            ws.Cells[1, 3].Value = "Дата окончания договора";
            ws.Column(3).Width = 14;
            ws.Cells[1, 4].Value = "Арендатор";
            ws.Column(4).Width = 11;
            ws.Cells[1, 5].Value = "Площадь кв. м.";
            ws.Cells[1, 6].Value = "Строение";
            ws.Cells[1, 7].Value = "Этаж";
            ws.Cells[1, 8].Value = "№ комнаты БТИ";
            ws.Cells[1, 9].Value = "Номер офиса";
            ws.Cells[1, 10].Value = "Стоймость кв.м.в год в рублях (в т.ч. НДС - 18%)";
            ws.Column(10).Width = 14;
            ws.Cells[1, 11].Value = "Размер а/п в месяц в рублях (в т.ч. НДС - 18%)";
            ws.Column(11).Width = 14;
            ws.Cells[1, 12].Value = "Кол-во мес.";
            ws.Column(12).Width = 12;
            ws.Cells[1, 13].Value = "По договору";
            ws.Column(13).Width = 12;
            ws.Cells[1, 14].Value = "Перечислен";
            ws.Column(14).Width = 12;
            ws.Cells[1, 15].Value = "К доплате";
            ws.Column(15).Width = 12;

            for (int i = 0; i < data.Count; i++)
            {
                int rowNum = i + 2;

                var curData = data[i];
                ws.Cells[rowNum, 1].Value = curData.DocNum;
                ws.Cells[rowNum, 2].Value = curData.DocDate?.ToString("dd.MM.yyyy") ?? string.Empty;
                ws.Cells[rowNum, 3].Value = curData.DocExpDate?.ToString("dd.MM.yyyy") ?? string.Empty;
                ws.Cells[rowNum, 4].Value = curData.FullName;
                ws.Cells[rowNum, 5].Value = curData.Square;
                ws.Cells[rowNum, 6].Value = curData.Building;

                ws.Cells[rowNum, 7].Value = curData.FloorId;
                ws.Cells[rowNum, 8].Value = curData.BTINums;
                ws.Cells[rowNum, 9].Value = curData.Number;
                ws.Cells[rowNum, 10].Value = curData.MeterPrice;

                ws.Cells[rowNum, 11].Value = curData.RentPayment;
                ws.Cells[rowNum, 12].Value = curData.MonthCount;
                ws.Cells[rowNum, 13].Value = curData.PayByDoc;
                ws.Cells[rowNum, 14].Value = curData.PayReceived;
                ws.Cells[rowNum, 15].Value = curData.ToPay;
            };
            ws.Cells[1, 1, data.Count + 2, 15].AutoFitColumns();



            return p;
        }
    }
}