import CommonTypes "common";

module {
  public type ReserveringStatus = {
    #InAfwachting;
    #Bevestigd;
    #Geannuleerd;
  };

  public type Reservering = {
    id : CommonTypes.ReservationId;
    contactNaam : Text;
    contactEmail : Text;
    contactTelefoon : Text;
    productIds : [CommonTypes.ProductId];
    startDatum : CommonTypes.Timestamp;
    eindDatum : CommonTypes.Timestamp;
    status : ReserveringStatus;
    aangemaakt : CommonTypes.Timestamp;
  };

  public type NieuweReservering = {
    contactNaam : Text;
    contactEmail : Text;
    contactTelefoon : Text;
    productIds : [CommonTypes.ProductId];
    startDatum : CommonTypes.Timestamp;
    eindDatum : CommonTypes.Timestamp;
  };
};
