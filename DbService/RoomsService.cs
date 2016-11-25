﻿using System;
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
                RenterId = dbRoom.RenterId,
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
            dbRoom.RenterId = modelRoom.RenterId;
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
