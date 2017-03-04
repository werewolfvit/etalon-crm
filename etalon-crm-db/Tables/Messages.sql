CREATE TABLE [dbo].[Messages] (
    [IdRecord]    INT              IDENTITY (1, 1) NOT NULL,
	[Subject]     NVARCHAR(256)    NULL,
    [MessageText] NVARCHAR (MAX)   NULL,
    [DateCreate]  DATETIME2 (7)    NOT NULL,
	[ToUserText]	NVARCHAR(1024) NOT NULL,
	[FromUserId]	UNIQUEIDENTIFIER	NOT NULL,
	FOREIGN KEY ([FromUserId]) REFERENCES Users(UserId),
    PRIMARY KEY CLUSTERED ([IdRecord] ASC)
);

