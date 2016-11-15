CREATE TABLE [dbo].[RoomPhotos]
(
	[IdRecord] INT NOT NULL IDENTITY(1, 1) PRIMARY KEY, 
    [PhotoId] INT NOT NULL, 
    [RoomId] INT NOT NULL,
	foreign key (PhotoId) references Files(IdRecord),
	foreign key (RoomId) references Rooms(IdRecord)
)
