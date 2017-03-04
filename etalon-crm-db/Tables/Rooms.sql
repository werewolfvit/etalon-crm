CREATE TABLE [dbo].[Rooms]
(
	[IdRecord] INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	[FloorId] INT NULL,
	[Number] NVARCHAR(10) NULL,
	[Square] NUMERIC(14,4) NULL,
	[MeterPrice] NUMERIC (14, 4) NULL,
	[X1] INT NULL,
	[X2] INT NULL,
	[Y1] INT NULL,
	[Y2] INT NULL,
	[CompanyId] INT NOT NULL DEFAULT 0,
	FOREIGN KEY (CompanyId) references Companies(IdRecord),
)
