using AutoMapper;
using vega.Controllers.Resource;
using vega.Core.Models;
using System.Linq;

namespace vega.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // Model to API Resource
            CreateMap<Make, MakeResource>();
            CreateMap<Make, KeyValuePairResource>();
            CreateMap<Model, KeyValuePairResource>();
            CreateMap<Feature, KeyValuePairResource>();
            CreateMap<Vehicle, SaveVehicleResource>()
                .ForMember(vf => vf.Contact, opt => opt.MapFrom(v => new ContactResource() { Name = v.ContactName, Phone = v.ContactPhone, Email = v.ContactEmail }))
                .ForMember(vf => vf.Features, opt => opt.MapFrom(v => v.Features.Select(f => f.FeatureId)));
            CreateMap<Vehicle, VehicleResource>()
                .ForMember(vf => vf.Contact, opt => opt.MapFrom(v => new ContactResource() { Name = v.ContactName, Phone = v.ContactPhone, Email = v.ContactEmail }))
                .ForMember(vf => vf.Features, opt => opt.MapFrom(v => v.Features.Select(f => new KeyValuePairResource { Id = f.Feature.Id, Name = f.Feature.Name })))
                .ForMember(vf => vf.Make, opt => opt.MapFrom(v => v.Model.Make));

            // API Resource to Model
            CreateMap<SaveVehicleResource, Vehicle>()
                .ForMember(v => v.Id, opt => opt.Ignore())
                .ForMember(v => v.ContactName, opt => opt.MapFrom(vf => vf.Contact.Name))
                .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vf => vf.Contact.Phone))
                .ForMember(v => v.ContactEmail, opt => opt.MapFrom(vf => vf.Contact.Email))
                .ForMember(v => v.Features, opt => opt.Ignore())
                .AfterMap((vr, v) =>
                {
                    // Remove item
                    var removeItem = v.Features
                                        .Where(ve => !vr.Features.Contains(ve.FeatureId))
                                        .ToList();
                    foreach (var f in removeItem)            
                        v.Features.Remove(f);            

                    // Add item
                    var addItem = vr.Features
                                        .Where(ver => !v.Features.Select(x => x.FeatureId).Contains(ver))
                                        .Select(ver => new VehicleFeature { FeatureId = ver })
                                        .ToList();
                    foreach (var f in addItem)                    
                        v.Features.Add(f);                    
                });
            CreateMap<VehicleQueryResource, VehicleQuery>();
        }
    }
}