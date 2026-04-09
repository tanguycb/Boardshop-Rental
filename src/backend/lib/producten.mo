import CommonTypes "../types/common";
import ProductTypes "../types/producten";
import List "mo:core/List";
import Time "mo:core/Time";
import Nat "mo:core/Nat";

module {
  public func nieuwProduct(
    id : CommonTypes.ProductId,
    naam : Text,
    productType : ProductTypes.ProductType,
    maat : Text,
    prijsPerDag : Nat,
  ) : ProductTypes.Product {
    let qrCode = genereerQrCode(id);
    {
      id;
      naam;
      productType;
      maat;
      prijsPerDag;
      beschikbaar = true;
      qrCode;
    };
  };

  public func genereerQrCode(id : CommonTypes.ProductId) : Text {
    "WSR-" # id.toText();
  };

  public func filterProducten(
    producten : List.List<ProductTypes.Product>,
    filter : ProductTypes.ProductFilter,
  ) : [ProductTypes.Product] {
    let gefilterd = producten.filter(func(p) {
      let typeOk = switch (filter.productType) {
        case null true;
        case (?t) p.productType == t;
      };
      let maatOk = switch (filter.maat) {
        case null true;
        case (?m) p.maat == m;
      };
      let beschikbaarOk = switch (filter.beschikbaar) {
        case null true;
        case (?b) p.beschikbaar == b;
      };
      typeOk and maatOk and beschikbaarOk;
    });
    gefilterd.toArray();
  };

  public func zoekOpQrCode(
    producten : List.List<ProductTypes.Product>,
    qrCode : Text,
  ) : ?ProductTypes.Product {
    producten.find(func(p) { p.qrCode == qrCode });
  };

  public func updateBeschikbaarheid(
    producten : List.List<ProductTypes.Product>,
    id : CommonTypes.ProductId,
    beschikbaar : Bool,
  ) {
    producten.mapInPlace(func(p) {
      if (p.id == id) { { p with beschikbaar } } else { p };
    });
  };
};
