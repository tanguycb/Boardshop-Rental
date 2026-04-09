import CommonTypes "../types/common";
import ReserveringTypes "../types/reserveringen";
import ProductTypes "../types/producten";
import ReserveringenLib "../lib/reserveringen";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

mixin (
  reserveringen : List.List<ReserveringTypes.Reservering>,
  producten : List.List<ProductTypes.Product>,
  volgendeReserveringId : CommonTypes.Counter,
) {
  // Publieke functie: geen authenticatie vereist
  public shared func plaatsReserveringPubliek(
    invoer : ReserveringTypes.NieuweReservering,
  ) : async CommonTypes.ReservationId {
    let id = volgendeReserveringId.value;
    volgendeReserveringId.value += 1;
    let reservering = ReserveringenLib.nieuweReservering(id, invoer);
    reserveringen.add(reservering);
    id;
  };

  // Medewerker: reservering bevestigen
  public shared ({ caller }) func bevestigReservering(id : CommonTypes.ReservationId) : async Bool {
    if (caller.isAnonymous()) Runtime.trap("Niet ingelogd");
    let gevonden = reserveringen.find(func(r) { r.id == id });
    switch (gevonden) {
      case null false;
      case (?_) {
        ReserveringenLib.bevestigReservering(reserveringen, id);
        true;
      };
    };
  };

  // Medewerker: reservering annuleren
  public shared ({ caller }) func annuleerReservering(id : CommonTypes.ReservationId) : async Bool {
    if (caller.isAnonymous()) Runtime.trap("Niet ingelogd");
    let gevonden = reserveringen.find(func(r) { r.id == id });
    switch (gevonden) {
      case null false;
      case (?_) {
        ReserveringenLib.annuleerReservering(reserveringen, id);
        true;
      };
    };
  };

  // Publieke query: alle reserveringen (admin/medewerker view)
  public query func getAlleReserveringen() : async [ReserveringTypes.Reservering] {
    reserveringen.toArray();
  };

  // Publieke query: beschikbare producten voor een periode
  public query func getBeschikbareProducten(
    startDatum : CommonTypes.Timestamp,
    eindDatum : CommonTypes.Timestamp,
  ) : async [ProductTypes.Product] {
    let gereserveerdIds = reserveringen.filter(func(r) {
      r.status != #Geannuleerd and r.startDatum <= eindDatum and r.eindDatum >= startDatum
    }).flatMap<ReserveringTypes.Reservering, CommonTypes.ProductId>(
      func(r) { r.productIds.values() }
    ).toArray();

    producten.filter(func(p) {
      p.beschikbaar and not gereserveerdIds.any(func(rid) { rid == p.id })
    }).toArray();
  };
};
