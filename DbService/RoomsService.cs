using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataModel;

namespace DataService
{
    /* Rooms */
    public partial class DbService
    {
        public RoomModel AddRoom(RoomModel model)
        {
            try
            {
                Room newRoom = new Room();
                CopyRoomModelToDb(ref newRoom, ref model);

                using (var db = GetDataContext())
                {
                    db.Rooms.InsertOnSubmit(newRoom);
                    db.SubmitChanges();
                }

                return CopyRoomDbToModel(newRoom);

            }
            catch (Exception ex)
            {
                // log
                throw new Exception("Can not add object to database");
            }
        }

        public void UpdateRoom(RoomModel model)
        {
            try
            {
                using (var db = GetDataContext())
                {
                    var curRoom = db.Rooms.Single(x => x.IdRecord == model.IdRecord);
                    CopyRoomModelToDb(ref curRoom, ref model);
                    db.SubmitChanges();
                }

            }
            catch (Exception ex)
            {
                // log
                throw new Exception("Can not update object in database");
            }
        }

        public IEnumerable<RoomPublicModel> ListRoomPublic()
        {
            try
            {
                using (var db = GetDataContext())
                {
                    return db.Rooms.Select(x => new RoomPublicModel()
                    {
                        FloorNum = x.FloorId,
                        IdRecord = x.IdRecord,
                        IsBusy = (x.CompanyId != null),
                        Number = x.Number,
                        Photos = x.RoomPhotos.Select(y => GetRelativeUrl(y.File.Path)).ToList(),
                        RentPayment = x.RentPayment,
                        Square = x.Square,
                        X1 = x.X1,
                        X2 = x.X2,
                        Y1 = x.Y1,
                        Y2 = x.Y2
                    }).ToList();
                }
            }
            catch (Exception ex)
            {
                // log
                throw new Exception("Can't get public list room");
            }
        }

        public IEnumerable<RoomModel> ListRoom()
        {
            try
            {
                using (var db = GetDataContext())
                {
                    var result = db.Rooms.Select(x => CopyRoomDbToModel(x)).ToList();
                    return result;
                }
            }
            catch (Exception ex)
            {
                // log
                throw new Exception("Can not get list object from database");
            }
        }

        public void DeleteRoom(RoomModel model)
        {
            try
            {
                using (var db = GetDataContext())
                {
                    var curRoom = db.Rooms.Single(x => x.IdRecord == model.IdRecord);
                    db.Rooms.DeleteOnSubmit(curRoom);
                    db.SubmitChanges();
                }
            }
            catch (Exception ex)
            {
                // log
                throw new Exception("Can not delete object from database");
            }
        }

        public void AddRoomPhoto(int fileId, int roomId)
        {
            try
            {
                using (var db = GetDataContext())
                {
                    RoomPhoto rp = new RoomPhoto()
                    {
                        PhotoId = fileId,
                        RoomId = roomId
                    };
                    db.RoomPhotos.InsertOnSubmit(rp);
                    db.SubmitChanges();
                }
            }
            catch (Exception ex)
            {
                // Log
                throw new Exception("Can't add new photo room");
            }
        }

        private RoomModel CopyRoomDbToModel(Room dbRoom)
        {
            return new RoomModel
            {
                IdRecord = dbRoom.IdRecord,
                FloorId = dbRoom.FloorId,
                Number = dbRoom.Number,
                Square = dbRoom.Square,
                MeterPrice = dbRoom.MeterPrice,
                X1 = dbRoom.X1,
                X2 = dbRoom.X2,
                Y1 = dbRoom.Y1,
                Y2 = dbRoom.Y2,
                CompanyId = dbRoom.CompanyId,
                //
                DocNum = dbRoom.DocNum,
                DocDate = dbRoom.DocDate,
                Building = dbRoom.Building,
                BTINums = dbRoom.BTINums,
                DocExpDate = dbRoom.DocExpDate,
                RentPayment = dbRoom.RentPayment
                };
        }

        private void CopyRoomModelToDb(ref Room dbRoom, ref RoomModel modelRoom)
        {
            dbRoom.IdRecord = modelRoom.IdRecord;
            dbRoom.FloorId = modelRoom.FloorId;
            dbRoom.Number = modelRoom.Number;
            dbRoom.Square = modelRoom.Square;
            dbRoom.MeterPrice = modelRoom.MeterPrice;
            dbRoom.X1 = modelRoom.X1;
            dbRoom.X2 = modelRoom.X2;
            dbRoom.Y1 = modelRoom.Y1;
            dbRoom.Y2 = modelRoom.Y2;
            dbRoom.CompanyId = modelRoom.CompanyId;
            //
            dbRoom.DocNum = modelRoom.DocNum;
            dbRoom.DocDate = modelRoom.DocDate;
            dbRoom.Building = modelRoom.Building;
            dbRoom.BTINums = modelRoom.BTINums;
            dbRoom.DocExpDate = modelRoom.DocExpDate;
            dbRoom.RentPayment = modelRoom.RentPayment;
        }
    }
}
