CREATE TABLE [dbo].[Users] (
    [UserId]        UNIQUEIDENTIFIER DEFAULT (newid()) NOT NULL,
    [UserName]      NVARCHAR (50)    NOT NULL,
    [PasswordHash]  NVARCHAR (MAX)   NULL,
    [SecurityStamp] NVARCHAR (MAX)   NULL,
	-----
	[Position] NVARCHAR(256) NULL,
	[Name] NVARCHAR(50) NULL,
	[Surname] NVARCHAR(50) NULL,
	[Middlename] NVARCHAR(50) NULL,
	[TimeLimit]     DATETIME2 (7)    NULL,
	[IsActive]	BIT NOT NULL DEFAULT 1,
	[Email]         NVARCHAR (50) NULL UNIQUE,
	[Phone] NVARCHAR(50) NULL,
	[PhotoId] INT NULL,
	[Description]   NVARCHAR (256)   DEFAULT ('') NULL,
    [CompanyId] INT NOT NULL DEFAULT 0, 
	PRIMARY KEY CLUSTERED ([UserId] ASC),
	FOREIGN KEY ([PhotoId]) REFERENCES Files(IdRecord),
	FOREIGN KEY ([CompanyId]) references Companies(IdRecord)
);

