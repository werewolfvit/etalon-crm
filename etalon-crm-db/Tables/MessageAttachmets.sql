CREATE TABLE [dbo].[MessageAttachmets] (
    [IdRecord]  INT IDENTITY (1, 1) NOT NULL,
    [IdMessage] INT NOT NULL,
    [IdFile]    INT NOT NULL,
    PRIMARY KEY CLUSTERED ([IdRecord] ASC),
    CONSTRAINT [fk_fileAttachments] FOREIGN KEY ([IdFile]) REFERENCES [dbo].[Files] ([IdRecord]),
    CONSTRAINT [fk_msgAttachments] FOREIGN KEY ([IdMessage]) REFERENCES [dbo].[Messages] ([IdRecord])
);

