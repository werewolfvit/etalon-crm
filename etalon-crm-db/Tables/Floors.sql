CREATE TABLE [dbo].[Floors]
(
	[IdRecord] INT NOT NULL IDENTITY(1, 1) PRIMARY KEY, 
    [FloorName] NVARCHAR(50) NOT NULL UNIQUE,
	[PhotoId] INT NOT NULL,
	foreign key ([PhotoId]) references Files(IdRecord)
)
