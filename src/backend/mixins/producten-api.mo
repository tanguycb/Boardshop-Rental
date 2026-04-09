import CommonTypes "../types/common";
import ProductTypes "../types/producten";
import ProductenLib "../lib/producten";
import List "mo:core/List";

mixin (
  producten : List.List<ProductTypes.Product>,
  volgendeProductId : CommonTypes.Counter,
) {
  public shared func voegProductToe(
    naam : Text,
    productType : ProductTypes.ProductType,
    maat : Text,
    prijsPerDag : Nat,
  ) : async CommonTypes.ProductId {
    let id = volgendeProductId.value;
    volgendeProductId.value += 1;
    let product = ProductenLib.nieuwProduct(id, naam, productType, maat, prijsPerDag);
    producten.add(product);
    id;
  };

  public shared func bewerkProduct(
    id : CommonTypes.ProductId,
    naam : Text,
    maat : Text,
    prijsPerDag : Nat,
    beschikbaar : Bool,
  ) : async Bool {
    let gevonden = producten.find(func(p) { p.id == id });
    switch (gevonden) {
      case null false;
      case (?_) {
        producten.mapInPlace(func(p) {
          if (p.id == id) { { p with naam; maat; prijsPerDag; beschikbaar } } else { p };
        });
        true;
      };
    };
  };

  public shared func verwijderProduct(id : CommonTypes.ProductId) : async Bool {
    let voor = producten.size();
    let gefilterd = producten.filter(func(p) { p.id != id });
    if (gefilterd.size() < voor) {
      producten.clear();
      producten.append(gefilterd);
      true;
    } else {
      false;
    };
  };

  public query func getProducten(filter : ProductTypes.ProductFilter) : async [ProductTypes.Product] {
    ProductenLib.filterProducten(producten, filter);
  };

  public query func getProduct(id : CommonTypes.ProductId) : async ?ProductTypes.Product {
    producten.find(func(p) { p.id == id });
  };

  public query func zoekProductOpQrCode(qrCode : Text) : async ?ProductTypes.Product {
    ProductenLib.zoekOpQrCode(producten, qrCode);
  };

  public query func getAlleProductenVoorQrBatch() : async [ProductTypes.Product] {
    producten.toArray();
  };
};
