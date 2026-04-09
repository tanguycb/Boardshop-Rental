import CommonTypes "../types/common";
import VerhuurTypes "../types/verhuur";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func nieuweVerhuur(
    id : CommonTypes.RentalId,
    invoer : VerhuurTypes.NieuweVerhuur,
  ) : VerhuurTypes.Verhuur {
    {
      id;
      productIds = invoer.productIds;
      klantNaam = invoer.klantNaam;
      klantContact = invoer.klantContact;
      startDatum = invoer.startDatum;
      eindDatum = invoer.eindDatum;
      status = #Actief;
      isSet = invoer.isSet;
    };
  };

  public func markeerIngeleverd(
    verhuringen : List.List<VerhuurTypes.Verhuur>,
    id : CommonTypes.RentalId,
  ) {
    verhuringen.mapInPlace(func(v) {
      if (v.id == id) { { v with status = #Ingeleverd } } else { v };
    });
  };

  public func getActieveVerhuringen(
    verhuringen : List.List<VerhuurTypes.Verhuur>,
  ) : [VerhuurTypes.Verhuur] {
    verhuringen.filter(func(v) { v.status == #Actief or v.status == #TeLaat }).toArray();
  };

  public func getVervallenVerhuringen(
    verhuringen : List.List<VerhuurTypes.Verhuur>,
    nu : CommonTypes.Timestamp,
  ) : [VerhuurTypes.Verhuur] {
    verhuringen.filter(func(v) { v.status == #TeLaat or (v.status == #Actief and v.eindDatum < nu) }).toArray();
  };

  public func updateVerhuurStatussen(
    verhuringen : List.List<VerhuurTypes.Verhuur>,
    nu : CommonTypes.Timestamp,
  ) {
    verhuringen.mapInPlace(func(v) {
      if (v.status == #Actief and v.eindDatum < nu) {
        { v with status = #TeLaat };
      } else {
        v;
      };
    });
  };
};
