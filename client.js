Damage.FriendlyFire = GameMode.Parameters.GetBool("FriendlyFire");

Teams.Add("Red", "Teams/Red", {r: 1});
var red = Teams.Get("Red");
red.Spawns.SpawnPointsGroups.Add(2);

Teams.Add("Blue", "Teams/Blue", {b: 1});
var blue = Teams.Get("Blue");
blue.Spawns.SpawnPointsGroups.Add(1);

Teams.OnRequestJoinTeam.Add(function(player, team) {
    team.Add(player);
});

Teams.OnPlayerChangeTeam.Add(function(player) {
    player.Spawns.Spawn();
});
