using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestWebApp.Models
{
    [Table("Owners")]
    public class OwnerDbModel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Owner { get; set; }

        public ICollection<HeroDbModel> Heroes;

        public OwnerDbModel()
        {
            Heroes = new HashSet<HeroDbModel>();
        }
    }
}
