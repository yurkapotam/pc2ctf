Damage.FriendlyFire = GameMode.Parameters.GetBool("FriendlyFire");

Teams.Add("Red", "Teams/Red", {r: 1});
var red = Teams.Get("Red");
red.Spawns.SpawnPointsGroups.Add(2);

Teams.Add("Blue", "Teams/Blue", {b: 1});
var blue = Teams.Get("Blue");
blue.Spawns.SpawnPointsGroups.Add(1);

LeaderBoard.PlayerLeaderBoardValues = [
    {
        Value: "Kills",
        DisplayName: "Фраги",
        ShortDisplayName: "Фраги"
    },
    {
        Value: "Deaths",
        DisplayName: "Смерти",
        ShortDisplayName: "Смерти"
    },
    {
        Value: "FlagCarrier",
        DisplayName: "Носитель флага",
        ShortDisplayName: "Носитель флага"
    }
];

Teams.OnRequestJoinTeam.Add(function(player, team) {
    team.Add(player);
});

Teams.OnPlayerChangeTeam.Add(function(player) {
    player.Spawns.Spawn();
});

Damage.OnDeath.Add(function (player) {
    ++player.Properties.Deaths.Value;
});

Damage.OnKill.Add(function (player} {
    ++player.Properties.Kills.Value;
});

var defView = AreaViewService.GetContext().Get("BlueFlagView");
defView.color={b:1};
defView.Enable = true;

// создаем триггер зон защиты
var defTrigger = AreaPlayerTriggerService.Get("BlueFlagTrigger");
defTrigger.OnEnter.Add(function(player) {
    player.Properties.Get("FlagCarrier").Value = true;
});
defTrigger.Enable = true;
