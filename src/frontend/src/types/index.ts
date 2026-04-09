export type {
  Product,
  ProductId,
  ProductType,
  ProductFilter,
  Verhuur,
  VerhuurStatus,
  RentalId,
  NieuweVerhuur,
  Reservering,
  ReserveringStatus,
  ReservationId,
  NieuweReservering,
  Timestamp,
  UserProfile,
  UserRole,
} from "../backend";

export type NavItem = {
  label: string;
  href: string;
  icon: string;
};

export type FilterState = {
  productType?: import("../backend.d.ts").ProductType;
  maat?: string;
  beschikbaar?: boolean;
  zoekterm: string;
};
