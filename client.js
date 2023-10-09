Damage.FriendlyFire = GameMode.Parameters.GetBool("FriendlyFire");

Teams.Add("Red", "Teams/Red", {r: 1});
var red = Teams.Get("Red");
red.Spawns.SpawnPointsGroups.Add(2);
red.Properties.Get("Score").Value = 0;
red.Spawns.RespawnTime.Value = 0;

Teams.Add("Blue", "Teams/Blue", {b: 1});
var blue = Teams.Get("Blue");
blue.Spawns.SpawnPointsGroups.Add(1);
blue.Properties.Get("Score").Value = 0;
blue.Spawns.RespawnTime.Value = 0;

Inventory.GetContext().Main.Value = true;
Inventory.GetContext().Secondary.Value = true;
Inventory.GetContext().Melee.Value = true;
Inventory.GetContext().Explosive.Value = true;
if (GameMode.Parameters.GetBool("BuildAllowed") == true) Inventory.GetContext().Build.Value = true;

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

Properties.OnTeamProperty.Add(function(context, value) {
    if (value.Name != "Score") return;
    if (GameMode.Parameters.GetBool("InfFlags") == true) return;
    if ((GameMode.Parameters.GetBool("IncreasedFlags") == true) && (value.Value <= 10)) WinTeam(context.Team);
    else if ((GameMode.Parameters.GetBool("IncreasedFlags") == false) && (value.Value <= 3)) WinTeam(context.Team);
});

Teams.OnRequestJoinTeam.Add(function(player, team) {
    team.Add(player);
});

Teams.OnPlayerChangeTeam.Add(function(player) {
    player.Spawns.Spawn();
});

Damage.OnDeath.Add(function (player) {
    player.Properties.Deaths.Value += 1;
    if (player.Properties.Get("FlagCarrier").Value == true)
    {
        player.Properties.Get("FlagCarrier").Value = false;
        Ui.GetContext().Hint.Value = player.NickName + " потерял флаг";
        if (player.Team == red)
        {
            defTrigger.Enable = true;
            defView.Enable = true;
        }
        else if (player.Team == blue)
        {
            defiTrigger.Enable = true;
            defiView.Enable = true;
        }
    }
});

Damage.OnKill.Add(function (player} {
    player.Properties.Kills.Value += 1;
});

var defView = AreaViewService.GetContext().Get("BlueFlagView");
defView.color={b:1};
defView.Enable = true;

var defTrigger = AreaPlayerTriggerService.Get("BlueFlagTrigger");
defTrigger.OnEnter.Add(function(player) {
    if (player.Team == red)
    {
        player.Properties.Get("FlagCarrier").Value = true;
        defTrigger.Enable = false;
        defView.Enable = false;
        Ui.GetContext().Hint.Value = "Синий флаг захватили! Носитель: " + player.NickName;
    }
    else if (player.Team == blue && player.Properties.Get("FlagCarrier").Value == true)
    {
        player.Properties.Get("FlagCarrier").Value = false;
        defiTrigger.Enable = true;
        defiView.Enable = true;
    }
});
defTrigger.Enable = true;

var defiView = AreaViewService.GetContext().Get("BlueFlagView");
defiView.color={r:1};
defiView.Enable = true;

var defiTrigger = AreaPlayerTriggerService.Get("BlueFlagTrigger");
defiTrigger.OnEnter.Add(function(player) {
    if (player.Team == blue)
    {
        player.Properties.Get("FlagCarrier").Value = true;
        defiTrigger.Enable = false;
        defiView.Enable = false;
        Ui.GetContext().Hint.Value = "Красный флаг захватили! Носитель: " + player.NickName;
    }
    else if (player.Team == red && player.Properties.Get("FlagCarrier").Value == true)
    {
        player.Properties.Get("FlagCarrier").Value = false;
        defTrigger.Enable = true;
        defView.Enable = true;
    }
});
defiTrigger.Enable = true;

function WinTeam(team)
{

}
