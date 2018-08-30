using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestWebApp.Models
{
    [Table("Heroes")]
    public class HeroDbModel
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }

        [ForeignKey("Owner")]
        public int OwnerId { get; set; }
        public OwnerDbModel Owner { get; set; }

    }
}
