using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using vega.Controllers.Resource;
using vega.Core;
using vega.Core.Models;

namespace vega.Controllers
{
    [Route("/api/vehicles/{vehicleId}/photo")]
    public class PhotoController : Controller
    {
        private readonly IHostingEnvironment host;
        private readonly IVehicleRepository vehicleRepository;
        private readonly IMapper mapper;
        private readonly IPhotoRepository photoRepository;
        private readonly IPhotoService photoService;
        private readonly PhotoSettings photoSettings;

        public PhotoController(
            IHostingEnvironment host,
            IVehicleRepository vehicleRepository,
            IMapper mapper,
            IOptionsSnapshot<PhotoSettings> options,
            IPhotoRepository photoRepository,
            IPhotoService photoService)
        {
            this.mapper = mapper;
            this.photoRepository = photoRepository;
            this.photoService = photoService;
            this.vehicleRepository = vehicleRepository;
            this.host = host;
            this.photoSettings = options.Value;
        }

        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {

            var vehicle = await vehicleRepository.GetVehicle(vehicleId, includeRelated: false);
            if (vehicle == null)
                return NotFound();

            // Validate file upload
            if (file == null) return BadRequest("Null file");
            if (file.Length == 0) return BadRequest("Empty file");
            if (file.Length > photoSettings.MaxBytes) return BadRequest("Max file size exceeded");
            if (!photoSettings.IsSupported(file.FileName)) return BadRequest("Invaid file type");

            var uploadFolderPath = Path.Combine(host.WebRootPath, "uploads");
            var photo = await photoService.UploadPhoto(vehicle, file, uploadFolderPath);

            return Ok(mapper.Map<Photo, PhotoResource>(photo));

        }

        [HttpGet]
        public async Task<IActionResult> GetPhotos(int vehicleId)
        {
            var photos = await photoRepository.GetPhotos(vehicleId);
            var result = Mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>>(photos);

            return Ok(result);
        }
    }
}