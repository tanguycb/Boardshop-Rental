import CommonTypes "../types/common";
import VerhuurTypes "../types/verhuur";
import ProductTypes "../types/producten";
import VerhuurLib "../lib/verhuur";
import ProductenLib "../lib/producten";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  verhuringen : List.List<VerhuurTypes.Verhuur>,
  producten : List.List<ProductTypes.Product>,
  volgendeVerhuurId : CommonTypes.Counter,
) {
  public shared func startVerhuur(invoer : VerhuurTypes.NieuweVerhuur) : async CommonTypes.RentalId {
    let id = volgendeVerhuurId.value;
    volgendeVerhuurId.value += 1;
    let verhuur = VerhuurLib.nieuweVerhuur(id, invoer);
    verhuringen.add(verhuur);
    // Markeer alle betrokken producten als niet beschikbaar
    for (productId in invoer.productIds.values()) {
      ProductenLib.updateBeschikbaarheid(producten, productId, false);
    };
    id;
  };

  public shared func markeerIngeleverd(id : CommonTypes.RentalId) : async Bool {
    let gevonden = verhuringen.find(func(v) { v.id == id });
    switch (gevonden) {
      case null false;
      case (?verhuur) {
        VerhuurLib.markeerIngeleverd(verhuringen, id);
        // Producten weer beschikbaar zetten
        for (productId in verhuur.productIds.values()) {
          ProductenLib.updateBeschikbaarheid(producten, productId, true);
        };
        true;
      };
    };
  };

  public query func getActieveVerhuringen() : async [VerhuurTypes.Verhuur] {
    VerhuurLib.getActieveVerhuringen(verhuringen);
  };

  public query func getVervallenVerhuringen() : async [VerhuurTypes.Verhuur] {
    let nu = Time.now();
    VerhuurLib.getVervallenVerhuringen(verhuringen, nu);
  };

  public query func getVerhuur(id : CommonTypes.RentalId) : async ?VerhuurTypes.Verhuur {
    verhuringen.find(func(v) { v.id == id });
  };
};
