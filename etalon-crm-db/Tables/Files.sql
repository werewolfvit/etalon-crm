CREATE TABLE [dbo].[Files] (
    [IdRecord] INT            IDENTITY (1, 1) NOT NULL,
    [Name]     NVARCHAR (256) NULL,
    [Path]     NVARCHAR (260) NULL,
    PRIMARY KEY CLUSTERED ([IdRecord] ASC)
);

