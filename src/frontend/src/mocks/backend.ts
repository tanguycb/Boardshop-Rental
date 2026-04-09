import type { backendInterface, Product, Verhuur, Reservering, UserProfile, ProductFilter } from "../backend";
import { ProductType, ReserveringStatus, UserRole, VerhuurStatus } from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

const now = BigInt(Date.now()) * BigInt(1_000_000);
const dag = BigInt(86_400_000_000_000);

const sampleProducten: Product[] = [
  {
    id: BigInt(1),
    naam: "Burton Custom 158",
    productType: ProductType.Snowboard,
    maat: "158cm",
    prijsPerDag: BigInt(2500),
    beschikbaar: true,
    qrCode: "WSR-BOARD-001",
  },
  {
    id: BigInt(2),
    naam: "Burton Ion 42",
    productType: ProductType.Boots,
    maat: "42",
    prijsPerDag: BigInt(1000),
    beschikbaar: true,
    qrCode: "WSR-BOOTS-002",
  },
  {
    id: BigInt(3),
    naam: "Union Force 2024",
    productType: ProductType.Bindingen,
    maat: "M",
    prijsPerDag: BigInt(800),
    beschikbaar: false,
    qrCode: "WSR-BIND-003",
  },
  {
    id: BigInt(4),
    naam: "Jones Flagship 154",
    productType: ProductType.Snowboard,
    maat: "154cm",
    prijsPerDag: BigInt(2200),
    beschikbaar: true,
    qrCode: "WSR-BOARD-004",
  },
  {
    id: BigInt(5),
    naam: "Nitro Team 44",
    productType: ProductType.Boots,
    maat: "44",
    prijsPerDag: BigInt(1000),
    beschikbaar: false,
    qrCode: "WSR-BOOTS-005",
  },
];

const sampleVerhuringen: Verhuur[] = [
  {
    id: BigInt(1),
    klantNaam: "Jan de Vries",
    klantContact: "jan@example.com",
    productIds: [BigInt(1), BigInt(2)],
    isSet: true,
    startDatum: now - dag * BigInt(3),
    eindDatum: now + dag * BigInt(2),
    status: VerhuurStatus.Actief,
  },
  {
    id: BigInt(2),
    klantNaam: "Sanne Bakker",
    klantContact: "sanne@example.com",
    productIds: [BigInt(3)],
    isSet: false,
    startDatum: now - dag * BigInt(5),
    eindDatum: now - dag * BigInt(1),
    status: VerhuurStatus.TeLaat,
  },
];

const sampleReserveringen: Reservering[] = [
  {
    id: BigInt(1),
    contactNaam: "Tom Smits",
    contactEmail: "tom@example.com",
    contactTelefoon: "+32 470 12 34 56",
    productIds: [BigInt(4)],
    startDatum: now + dag * BigInt(3),
    eindDatum: now + dag * BigInt(7),
    aangemaakt: now,
    status: ReserveringStatus.InAfwachting,
  },
];

const medewerkerProfiel: UserProfile = {
  principal: { toText: () => "medewerker-principal" } as unknown as Principal,
  naam: "Emma Jansen",
  contactInfo: "emma@west-site.com",
  role: UserRole.Medewerker,
};

export const mockBackend: backendInterface = {
  annuleerReservering: async (_id) => true,
  bevestigReservering: async (_id) => true,
  bewerkProduct: async (_id, _naam, _maat, _prijs, _beschikbaar) => true,
  getActieveVerhuringen: async () => sampleVerhuringen,
  getAlleProductenVoorQrBatch: async () => sampleProducten,
  getAlleReserveringen: async () => sampleReserveringen,
  getBeschikbareProducten: async (_start, _eind) =>
    sampleProducten.filter((p) => p.beschikbaar),
  getMijnProfiel: async () => medewerkerProfiel,
  getMijnRol: async () => UserRole.Medewerker,
  getProduct: async (id) => sampleProducten.find((p) => p.id === id) ?? null,
  getProducten: async (_filter: ProductFilter) => sampleProducten,
  getVerhuur: async (id) => sampleVerhuringen.find((v) => v.id === id) ?? null,
  getVervallenVerhuringen: async () =>
    sampleVerhuringen.filter((v) => v.status === VerhuurStatus.TeLaat),
  markeerIngeleverd: async (_id) => true,
  plaatsReserveringPubliek: async (_invoer) => BigInt(99),
  registreerMedewerker: async (_naam, _contact) => true,
  startVerhuur: async (_invoer) => BigInt(99),
  verwijderProduct: async (_id) => true,
  voegProductToe: async (_naam, _type, _maat, _prijs) => BigInt(99),
  zoekProductOpQrCode: async (qr) =>
    sampleProducten.find((p) => p.qrCode === qr) ?? null,
};
