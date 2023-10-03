Damage.FriendlyFire = GameMode.Parameters.GetBool("FriendlyFire");

var RedFlagCarried = false;
var RedFlagCarrier = ":D";
Teams.Add("Red", "Teams/Red", {r: 1});
var red = Teams.Get("Red");
red.Spawns.SpawnPointsGroups.Add(2);

var BlueFlagCarried = false;
var BlueFragCarrier = ":)";
Teams.Add("Blue", "Teams/Blue", {b: 1});
var blue = Teams.Get("Blue");
blue.Spawns.SpawnPointsGroups.Add(1);

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

Teams.OnRequestJoinTeam.Add(function(player, team) {
    team.Add(player);
});

Teams.OnPlayerChangeTeam.Add(function(player) {
    player.Spawns.Spawn();
});
