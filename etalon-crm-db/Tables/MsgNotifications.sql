CREATE TABLE [dbo].[MsgNotifications]
(
	[IdRecord] INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
	[MessageId] INT NOT NULL,
	[UserId] UNIQUEIDENTIFIER NOT NULL,
	[Email] NVARCHAR(256) NOT NULL,
	[Text] NVARCHAR(1000) NOT NULL,
	[DateCreate] DATETIME2 NOT NULL,
	[DateSend] DATETIME2 NULL,
	[LastSendError] NVARCHAR(1000) NULL,
	FOREIGN KEY ([MessageId]) REFERENCES [Messages](IdRecord),
	FOREIGN KEY ([UserId]) REFERENCES Users(UserId)
)
