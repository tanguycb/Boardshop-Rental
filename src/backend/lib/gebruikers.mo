import CommonTypes "../types/common";
import List "mo:core/List";
import Principal "mo:core/Principal";

module {
  public func registreerGebruiker(
    gebruikers : List.List<CommonTypes.UserProfile>,
    principal : Principal,
    rol : CommonTypes.UserRole,
    naam : Text,
    contactInfo : Text,
  ) {
    let bestaatAl = gebruikers.find(func(g) { Principal.equal(g.principal, principal) });
    switch (bestaatAl) {
      case null {
        gebruikers.add({ principal; role = rol; naam; contactInfo });
      };
      case (?_) {
        gebruikers.mapInPlace(func(g) {
          if (Principal.equal(g.principal, principal)) {
            { g with role = rol; naam; contactInfo };
          } else {
            g;
          };
        });
      };
    };
  };

  public func getGebruikersProfiel(
    gebruikers : List.List<CommonTypes.UserProfile>,
    principal : Principal,
  ) : ?CommonTypes.UserProfile {
    gebruikers.find(func(g) { Principal.equal(g.principal, principal) });
  };

  public func getRolVanGebruiker(
    gebruikers : List.List<CommonTypes.UserProfile>,
    principal : Principal,
  ) : ?CommonTypes.UserRole {
    switch (gebruikers.find(func(g) { Principal.equal(g.principal, principal) })) {
      case (?g) ?g.role;
      case null null;
    };
  };
};
