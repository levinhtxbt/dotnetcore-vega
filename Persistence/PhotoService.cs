using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using vega.Core;
using vega.Core.Models;

namespace vega.Persistence
{
    public class PhotoService : IPhotoService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IPhotoStorage photoStorage;

        public PhotoService(IUnitOfWork unitOfWork, IPhotoStorage photoStorage)
        {
            this.photoStorage = photoStorage;
            this.unitOfWork = unitOfWork;
        }

        public async Task<Photo> UploadPhoto(Vehicle vehicle, IFormFile file, string uploadFolderPath)
        {

            var fileName = await photoStorage.StorePhoto(uploadFolderPath, file);

            var photo = new Photo { FileName = fileName };
            vehicle.Photos.Add(photo);
            
            await unitOfWork.CompleteAsync();

            return photo;
        }
    }
}