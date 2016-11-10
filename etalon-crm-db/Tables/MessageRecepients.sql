CREATE TABLE [dbo].[MessageRecepients]
(
	[IdRecord] INT NOT NULL PRIMARY KEY,
	[MessageId] INT NOT NULL,
	[UserId] UNIQUEIDENTIFIER NOT NULL,
	FOREIGN KEY (MessageId) REFERENCES Messages(IdRecord)
)
