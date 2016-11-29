using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataModel;

namespace DataService
{
    /* Room Photos */
    public partial class DbService
    {
        public IEnumerable<RoomPhotoModel> ListRoomPhoto()
        {
            try
            {
                using (var db = GetDataContext())
                {
                    return db.RoomPhotos.Select(x => new RoomPhotoModel()
                    {
                        IdRecord = x.IdRecord,
                        RoomId = x.RoomId,
                        Url = GetRelativeUrl(x.File.Path)
                    }).ToList();
                }
            }
            catch (Exception ex)
            {
                // log
                throw  new Exception("Can't get list room photos");
            }
        }

        public void DeleteRoomPhoto(RoomPhotoModel roomPhoto)
        {
            try
            {
                using (var db = GetDataContext())
                {
                    var currRoomPhoto = db.RoomPhotos.Single(x => x.IdRecord == roomPhoto.IdRecord);
                    db.RoomPhotos.DeleteOnSubmit(currRoomPhoto);
                    db.SubmitChanges();
                }
            }
            catch (Exception ex)
            {
                // log
                throw new Exception("Can't delete room photo");
            }
        }
    }
}
