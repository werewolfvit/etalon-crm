CREATE VIEW [dbo].[vClientsRoomsReport]
	AS   
	SELECT c.DocNum, CAST(c.DocDate AS DATE) AS DocDate, c.FullName, r.[Square], r.FloorId, c.BTINums, r.Number, CAST(c.DocExpDate AS date) as DocExpDate, 
	c.RentPayment,
	c.MonthCount,
	c.PayByDoc,
	c.PayReceived,
	c.ToPay,
	c.Building,
	r.MeterPrice
  FROM Rooms r 
	INNER JOIN [dbo].[Companies]  c ON r.CompanyID = c.IdRecord
	WHERE c.IdRecord > 0	

