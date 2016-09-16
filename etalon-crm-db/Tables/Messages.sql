CREATE TABLE [dbo].[Messages] (
    [IdRecord]    INT              IDENTITY (1, 1) NOT NULL,
    [MessageText] NVARCHAR (MAX)   NULL,
    [FromUser]    UNIQUEIDENTIFIER NOT NULL,
    [ToUser]      UNIQUEIDENTIFIER NOT NULL,
    [DateCreate]  DATETIME2 (7)    NOT NULL,
    [IsReaded]    BIT              DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([IdRecord] ASC)
);

