import type { OrderItem } from "../types";

export const orders: OrderItem[] = [
  { id: 123, customerName: "Tran Giang", email: "giang@company.com", phone: "0901112223", total: 57000, status: "CHO_XAC_NHAN", itemsCount: 2 },
  { id: 124, customerName: "Nguyen Minh Anh", email: "minhanh@company.com", phone: "0903334445", total: 82000, status: "DANG_CHUAN_BI", itemsCount: 3 },
  { id: 125, customerName: "Le Quoc Bao", email: "quocbao@company.com", phone: "0907778889", total: 39000, status: "DANG_GIAO", itemsCount: 1 },
  { id: 126, customerName: "Tran Giang", email: "giang@company.com", phone: "0901112223", total: 99000, status: "DA_GIAO", itemsCount: 4 },
  { id: 127, customerName: "Vo Thanh Dat", email: "thanhdat@company.com", phone: "0909991112", total: 28000, status: "DA_GIAO", itemsCount: 1 },
];