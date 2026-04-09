import CommonTypes "../types/common";
import ReserveringTypes "../types/reserveringen";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func nieuweReservering(
    id : CommonTypes.ReservationId,
    invoer : ReserveringTypes.NieuweReservering,
  ) : ReserveringTypes.Reservering {
    {
      id;
      contactNaam = invoer.contactNaam;
      contactEmail = invoer.contactEmail;
      contactTelefoon = invoer.contactTelefoon;
      productIds = invoer.productIds;
      startDatum = invoer.startDatum;
      eindDatum = invoer.eindDatum;
      status = #InAfwachting;
      aangemaakt = Time.now();
    };
  };

  public func bevestigReservering(
    reserveringen : List.List<ReserveringTypes.Reservering>,
    id : CommonTypes.ReservationId,
  ) {
    reserveringen.mapInPlace(func(r) {
      if (r.id == id) { { r with status = #Bevestigd } } else { r };
    });
  };

  public func annuleerReservering(
    reserveringen : List.List<ReserveringTypes.Reservering>,
    id : CommonTypes.ReservationId,
  ) {
    reserveringen.mapInPlace(func(r) {
      if (r.id == id) { { r with status = #Geannuleerd } } else { r };
    });
  };
};
