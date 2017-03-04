CREATE TABLE [dbo].[Roles] (
    [RoleId] UNIQUEIDENTIFIER DEFAULT (newid()) NOT NULL,
    [Name]   NVARCHAR (256)   NOT NULL,
    [Description] NVARCHAR(256) NULL, 
    PRIMARY KEY CLUSTERED ([RoleId] ASC)
);

