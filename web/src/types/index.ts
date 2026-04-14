export type ShapeType = "circle" | "square" | "triangle";
export type PaymentMethod = "COD" | "BANKING";
export type Role = "ADMIN" | "USER";
export type FoodCategory = "DO_AN" | "NUOC_UONG" | "KHAC";
export type OrderStatus = "CHO_XAC_NHAN" | "DANG_CHUAN_BI" | "DANG_GIAO" | "DA_GIAO";

export type FoodItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  accent: string;
  shape: ShapeType;
  category: FoodCategory;
  available: boolean;
};

export type CartItem = FoodItem & {
  quantity: number;
};

export type UserAccount = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: Role;
};

export type OrderItem = {
  id: number;
  customerName: string;
  email: string;
  phone: string;
  total: number;
  status: OrderStatus;
  itemsCount: number;
};
