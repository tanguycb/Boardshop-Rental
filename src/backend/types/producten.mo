import CommonTypes "common";

module {
  public type ProductType = {
    #Snowboard;
    #Boots;
    #Bindingen;
  };

  public type Product = {
    id : CommonTypes.ProductId;
    naam : Text;
    productType : ProductType;
    maat : Text;
    prijsPerDag : Nat;
    beschikbaar : Bool;
    qrCode : Text;
  };

  public type ProductFilter = {
    productType : ?ProductType;
    maat : ?Text;
    beschikbaar : ?Bool;
  };
};
