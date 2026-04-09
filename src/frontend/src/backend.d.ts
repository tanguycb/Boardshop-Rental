import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Verhuur {
    id: RentalId;
    status: VerhuurStatus;
    klantNaam: string;
    klantContact: string;
    productIds: Array<ProductId>;
    isSet: boolean;
    eindDatum: Timestamp;
    startDatum: Timestamp;
}
export type Timestamp = bigint;
export interface Reservering {
    id: ReservationId;
    status: ReserveringStatus;
    contactNaam: string;
    productIds: Array<ProductId>;
    contactTelefoon: string;
    aangemaakt: Timestamp;
    contactEmail: string;
    eindDatum: Timestamp;
    startDatum: Timestamp;
}
export type ReservationId = bigint;
export interface NieuweVerhuur {
    klantNaam: string;
    klantContact: string;
    productIds: Array<ProductId>;
    isSet: boolean;
    eindDatum: Timestamp;
    startDatum: Timestamp;
}
export interface ProductFilter {
    maat?: string;
    productType?: ProductType;
    beschikbaar?: boolean;
}
export type RentalId = bigint;
export interface NieuweReservering {
    contactNaam: string;
    productIds: Array<ProductId>;
    contactTelefoon: string;
    contactEmail: string;
    eindDatum: Timestamp;
    startDatum: Timestamp;
}
export type ProductId = bigint;
export interface Product {
    id: ProductId;
    maat: string;
    naam: string;
    prijsPerDag: bigint;
    productType: ProductType;
    beschikbaar: boolean;
    qrCode: string;
}
export interface UserProfile {
    principal: Principal;
    contactInfo: string;
    naam: string;
    role: UserRole;
}
export enum ProductType {
    Boots = "Boots",
    Snowboard = "Snowboard",
    Bindingen = "Bindingen"
}
export enum ReserveringStatus {
    Bevestigd = "Bevestigd",
    InAfwachting = "InAfwachting",
    Geannuleerd = "Geannuleerd"
}
export enum UserRole {
    Admin = "Admin",
    Medewerker = "Medewerker"
}
export enum VerhuurStatus {
    Actief = "Actief",
    Ingeleverd = "Ingeleverd",
    TeLaat = "TeLaat"
}
export interface backendInterface {
    annuleerReservering(id: ReservationId): Promise<boolean>;
    bevestigReservering(id: ReservationId): Promise<boolean>;
    bewerkProduct(id: ProductId, naam: string, maat: string, prijsPerDag: bigint, beschikbaar: boolean): Promise<boolean>;
    getActieveVerhuringen(): Promise<Array<Verhuur>>;
    getAlleProductenVoorQrBatch(): Promise<Array<Product>>;
    getAlleReserveringen(): Promise<Array<Reservering>>;
    getBeschikbareProducten(startDatum: Timestamp, eindDatum: Timestamp): Promise<Array<Product>>;
    getMijnProfiel(): Promise<UserProfile | null>;
    getMijnRol(): Promise<UserRole | null>;
    getProduct(id: ProductId): Promise<Product | null>;
    getProducten(filter: ProductFilter): Promise<Array<Product>>;
    getVerhuur(id: RentalId): Promise<Verhuur | null>;
    getVervallenVerhuringen(): Promise<Array<Verhuur>>;
    markeerIngeleverd(id: RentalId): Promise<boolean>;
    plaatsReserveringPubliek(invoer: NieuweReservering): Promise<ReservationId>;
    registreerMedewerker(naam: string, contactInfo: string): Promise<boolean>;
    startVerhuur(invoer: NieuweVerhuur): Promise<RentalId>;
    verwijderProduct(id: ProductId): Promise<boolean>;
    voegProductToe(naam: string, productType: ProductType, maat: string, prijsPerDag: bigint): Promise<ProductId>;
    zoekProductOpQrCode(qrCode: string): Promise<Product | null>;
}
