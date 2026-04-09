import CommonTypes "common";

module {
  public type VerhuurStatus = {
    #Actief;
    #Ingeleverd;
    #TeLaat;
  };

  public type Verhuur = {
    id : CommonTypes.RentalId;
    productIds : [CommonTypes.ProductId];
    klantNaam : Text;
    klantContact : Text;
    startDatum : CommonTypes.Timestamp;
    eindDatum : CommonTypes.Timestamp;
    status : VerhuurStatus;
    isSet : Bool;
  };

  public type NieuweVerhuur = {
    productIds : [CommonTypes.ProductId];
    klantNaam : Text;
    klantContact : Text;
    startDatum : CommonTypes.Timestamp;
    eindDatum : CommonTypes.Timestamp;
    isSet : Bool;
  };
};
