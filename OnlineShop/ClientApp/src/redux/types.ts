import { Done } from "@material-ui/icons";

export class UserDTO {
  id?: number;
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  phone?: string;
  address?: AddressDTO;
  password: string = "";
}

export class AddressDTO {
  userId?: string;
  country: string = "";
  city: string = "";
  street: string = "";
}

export class ProductDTO {
  id?: number;
  name: string = "";
  description: string = "";
  price: string = "";
  imageUrl?: string;
  isInStock?: boolean;
  categoryId: number = 0;
  category?: CategoryDTO;
}

export class CategoryDTO {
  id?: number;
  name: string = "";
  description: string = "";
}

export class OrderDTO {
  id?: number;
  createTime?: string;
  amount?: number;
  status: OrderStatus = OrderStatus.PENDING;
  userId?: number;
  products?: Array<ProductDTO>;
  user?: UserDTO;
}

export enum OrderStatus {
  DONE,
  PENDING,
  CANCELLED,
  CART,
}
