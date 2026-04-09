import CommonTypes "types/common";
import ProductTypes "types/producten";
import VerhuurTypes "types/verhuur";
import ReserveringTypes "types/reserveringen";
import List "mo:core/List";
import ProductenAPI "mixins/producten-api";
import VerhuurAPI "mixins/verhuur-api";
import ReserveringenAPI "mixins/reserveringen-api";
import GebruikersAPI "mixins/gebruikers-api";
import Migration "migration";

(with migration = Migration.run)
actor {
  let producten = List.empty<ProductTypes.Product>();
  let verhuringen = List.empty<VerhuurTypes.Verhuur>();
  let reserveringen = List.empty<ReserveringTypes.Reservering>();
  let gebruikers = List.empty<CommonTypes.UserProfile>();

  let volgendeProductId : CommonTypes.Counter = { var value = 0 };
  let volgendeVerhuurId : CommonTypes.Counter = { var value = 0 };
  let volgendeReserveringId : CommonTypes.Counter = { var value = 0 };

  include GebruikersAPI(gebruikers);
  include ProductenAPI(producten, volgendeProductId);
  include VerhuurAPI(verhuringen, producten, volgendeVerhuurId);
  include ReserveringenAPI(reserveringen, producten, volgendeReserveringId);
};
