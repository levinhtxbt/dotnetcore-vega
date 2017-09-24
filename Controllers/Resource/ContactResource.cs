using System.ComponentModel.DataAnnotations;

namespace vega.Controllers.Resource
{
    public class ContactResource
    {
        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        [Required]
        [StringLength(255)]
        public string Phone { get; set; }

        public string Email { get; set; }
    }
}