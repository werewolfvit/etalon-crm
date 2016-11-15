CREATE TABLE [dbo].[Rooms]
(
	[IdRecord] INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	[FloorId] INT NULL,
	[Number] NVARCHAR(10) NULL,
	[Square] NUMERIC(10,4) NULL,
	[MeterPrice] NUMERIC (10, 4) NULL,
	[X1] INT NULL,
	[X2] INT NULL,
	[Y1] INT NULL,
	[Y2] INT NULL,
	[RenterId] INT NULL,
	FOREIGN KEY (RenterId) references Companies(IdRecord),
	FOREIGN KEY (FloorId) references Floors(IdRecord)
)
