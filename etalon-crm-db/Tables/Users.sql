CREATE TABLE [dbo].[Users] (
    [UserId]        UNIQUEIDENTIFIER DEFAULT (newid()) NOT NULL,
    [UserName]      NVARCHAR (50)    NOT NULL,
    [Description]   NVARCHAR (256)   DEFAULT ('') NULL,
    [Email]         NVARCHAR (50)    NULL,
    [TimeLimit]     DATETIME2 (7)    NULL,
    [PasswordHash]  NVARCHAR (MAX)   NULL,
    [SecurityStamp] NVARCHAR (MAX)   NULL,
    PRIMARY KEY CLUSTERED ([UserId] ASC)
);

