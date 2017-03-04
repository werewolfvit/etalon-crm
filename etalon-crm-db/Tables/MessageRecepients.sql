CREATE TABLE [dbo].[MessageRecepients]
(
	[IdRecord] INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	[MessageId] INT NOT NULL,
	[ToUserId] UNIQUEIDENTIFIER NOT NULL,
	[IsReaded] BIT NOT NULL DEFAULT 0,
	FOREIGN KEY ([ToUserId]) REFERENCES Users(UserId),
    FOREIGN KEY (MessageId) REFERENCES [Messages](IdRecord),
)
