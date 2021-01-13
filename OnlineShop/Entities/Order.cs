using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.Entities
{
    public class Order : BaseEntity
    {
        public int Amount { get; set; }
        public int Status { get; set; }
        public virtual ICollection<OrderProduct> Products { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}

enum OrderStatus
{
    DONE,
    PENDING,
    CANCELLED,
    CART
}