import List "mo:core/List";
import CommonTypes "types/common";
import ProductTypes "types/producten";
import VerhuurTypes "types/verhuur";
import ReserveringTypes "types/reserveringen";

module {
  // ── Old types (inline from .old/src/backend/types/) ──────────────────────

  type OldUserRole = { #Medewerker; #Klant };

  type OldUserProfile = {
    principal : Principal;
    role : OldUserRole;
    naam : Text;
    contactInfo : Text;
  };

  type OldReserveringStatus = { #InAfwachting; #Bevestigd; #Geannuleerd };

  type OldReservering = {
    id : Nat;
    klantPrincipal : Principal;
    klantNaam : Text;
    klantContact : Text;
    productIds : [Nat];
    startDatum : Int;
    eindDatum : Int;
    status : OldReserveringStatus;
  };

  // ── Actor state shapes ─────────────────────────────────────────────────────

  type OldActor = {
    gebruikers : List.List<OldUserProfile>;
    reserveringen : List.List<OldReservering>;
    producten : List.List<ProductTypes.Product>;
    verhuringen : List.List<VerhuurTypes.Verhuur>;
    volgendeProductId : CommonTypes.Counter;
    volgendeVerhuurId : CommonTypes.Counter;
    volgendeReserveringId : CommonTypes.Counter;
  };

  type NewActor = {
    gebruikers : List.List<CommonTypes.UserProfile>;
    reserveringen : List.List<ReserveringTypes.Reservering>;
    producten : List.List<ProductTypes.Product>;
    verhuringen : List.List<VerhuurTypes.Verhuur>;
    volgendeProductId : CommonTypes.Counter;
    volgendeVerhuurId : CommonTypes.Counter;
    volgendeReserveringId : CommonTypes.Counter;
  };

  // ── Migration function ─────────────────────────────────────────────────────

  public func run(old : OldActor) : NewActor {
    // Map old UserRole: #Klant becomes #Medewerker; #Medewerker stays
    let gebruikers = old.gebruikers.map<OldUserProfile, CommonTypes.UserProfile>(
      func(u) {
        let newRole : CommonTypes.UserRole = switch (u.role) {
          case (#Medewerker) #Medewerker;
          case (#Klant) #Medewerker; // promote former customers to Medewerker
        };
        { u with role = newRole };
      }
    );

    // Map old Reservering: rename fields, add aangemaakt = 0 (unknown)
    let reserveringen = old.reserveringen.map<OldReservering, ReserveringTypes.Reservering>(
      func(r) {
        {
          id = r.id;
          contactNaam = r.klantNaam;
          contactEmail = "";      // not stored in old version
          contactTelefoon = r.klantContact;
          productIds = r.productIds;
          startDatum = r.startDatum;
          eindDatum = r.eindDatum;
          status = r.status;
          aangemaakt = 0;         // unknown; default to epoch
        };
      }
    );

    {
      gebruikers;
      reserveringen;
      producten = old.producten;
      verhuringen = old.verhuringen;
      volgendeProductId = old.volgendeProductId;
      volgendeVerhuurId = old.volgendeVerhuurId;
      volgendeReserveringId = old.volgendeReserveringId;
    };
  };
};
