module {
  public type ProductId = Nat;
  public type RentalId = Nat;
  public type ReservationId = Nat;
  public type Timestamp = Int;

  public type Counter = { var value : Nat };

  public type UserRole = {
    #Medewerker;
    #Admin;
  };

  public type UserProfile = {
    principal : Principal;
    role : UserRole;
    naam : Text;
    contactInfo : Text;
  };
};
