Damage.FriendlyFire = GameMode.Parameters.GetBool("FriendlyFire");

var RedFlagCarried = false;
var RedFlagCarrier = ":D";

var BlueFlagCarried = false;
var BlueFragCarrier = ":)";

Damage.OnDeath.Add(function(ply) {
    if (ply.IdInRoom == RedFlagCarrier)
    {
        RedFlagCarried = false;
    }
    else if (ply.IdInRoom == BlueFlagCarrier)
    {
        BlueFlagCarried = false;
    }
});
