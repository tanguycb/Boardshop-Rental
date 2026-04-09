import CommonTypes "../types/common";
import GebruikersLib "../lib/gebruikers";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

mixin (gebruikers : List.List<CommonTypes.UserProfile>) {
  public shared ({ caller }) func registreerMedewerker(
    naam : Text,
    contactInfo : Text,
  ) : async Bool {
    if (caller.isAnonymous()) Runtime.trap("Niet ingelogd");
    GebruikersLib.registreerGebruiker(gebruikers, caller, #Medewerker, naam, contactInfo);
    true;
  };

  public query ({ caller }) func getMijnProfiel() : async ?CommonTypes.UserProfile {
    if (caller.isAnonymous()) Runtime.trap("Niet ingelogd");
    GebruikersLib.getGebruikersProfiel(gebruikers, caller);
  };

  public query ({ caller }) func getMijnRol() : async ?CommonTypes.UserRole {
    if (caller.isAnonymous()) Runtime.trap("Niet ingelogd");
    GebruikersLib.getRolVanGebruiker(gebruikers, caller);
  };
};
