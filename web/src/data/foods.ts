import type { FoodItem } from "../types";

export const foods: FoodItem[] = [
  { id: 1, name: "COM GA", description: "GA NUONG, COM THOM, RAU CU", price: 35000, accent: "bg-[#D02020]", shape: "circle", category: "DO_AN", available: true },
  { id: 2, name: "BUN BO", description: "NUOC DUNG DAM VI, BO TAI", price: 42000, accent: "bg-[#1040C0]", shape: "square", category: "DO_AN", available: true },
  { id: 3, name: "MI XAO BO", description: "MI XAO GION, BO XAO", price: 39000, accent: "bg-[#F0C020]", shape: "triangle", category: "DO_AN", available: false },
  { id: 4, name: "TRA DAO", description: "TRA MAT LANH, DAO NGAM", price: 18000, accent: "bg-[#D02020]", shape: "square", category: "NUOC_UONG", available: true },
  { id: 5, name: "CA PHE SUA", description: "DAM, NGOT VUA", price: 22000, accent: "bg-[#1040C0]", shape: "circle", category: "NUOC_UONG", available: true },
  { id: 6, name: "BANH NGOT", description: "AN NHE GIUA GIO", price: 28000, accent: "bg-[#F0C020]", shape: "triangle", category: "KHAC", available: true },
  { id: 7, name: "PHO BO", description: "PHO BO TAI NAM", price: 45000, accent: "bg-[#D02020]", shape: "circle", category: "DO_AN", available: true },
  { id: 8, name: "NUOC SUOI", description: "CHAI 500ML", price: 10000, accent: "bg-[#1040C0]", shape: "square", category: "NUOC_UONG", available: true },
];
