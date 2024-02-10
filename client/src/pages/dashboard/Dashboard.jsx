// The dashbaord serves to provde a simple place to view the upcoming game, the current standings
//  as well as some team leaders.

import React from "react";
import { Card, CardContent, Typography, Grid, Avatar } from "@mui/material";
import { format, parseISO } from "date-fns";
import gameData from "../../gameData.json";
import StandingsTabs from "../../components/dashboard/StandingsTabs";

const findLeader = (stat) => {
  return gameData.playerStats
    .filter((player) => player.team === "DAL")
    .reduce(
      (prev, current) => (prev[stat] > current[stat] ? prev : current),
      {}
    );
};

const LeaderStat = ({ category, leader, statKey }) => (
  <Grid container alignItems="center" spacing={2}>
    <Grid item>
      <Avatar
        alt={leader.name}
        src={leader.photoUrl}
        sx={{ width: 56, height: 56 }}
      />
    </Grid>
    <Grid item xs>
      <Typography variant="subtitle1">
        <strong>{category}:</strong> {leader.name} - {leader[statKey]}
      </Typography>
    </Grid>
  </Grid>
);
const DashboardPage = () => {
  const pointsLeader = findLeader("pts");
  const assistsLeader = findLeader("ast");
  const reboundsLeader = findLeader("reb");
  const stealsLeader = findLeader("stl");
  const blocksLeader = findLeader("blk");
  const efficiencyLeader = findLeader("fgp");
  const findNextUpcomingGame = () => {
    const upcomingGames = gameData.games
      .filter((game) => game.gameStatus === 1)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return upcomingGames[0];
  };

  const renderNextUpcomingGame = () => {
    const nextGame = findNextUpcomingGame();
    if (!nextGame) {
      return <Typography>No upcoming games found.</Typography>;
    }
    const findTeamDetails = (teamAbbreviation) => {
      const team = gameData.teamData.find((t) => t.team === teamAbbreviation);
      return team ? `${team.teamCity} ${team.teamName}` : teamAbbreviation;
    };

    const homeTeamDetails = findTeamDetails(nextGame.homeTeam);
    const awayTeamDetails = findTeamDetails(nextGame.awayTeam);
    return (
      <>
        <Typography variant="h6">
          {homeTeamDetails} vs {awayTeamDetails}
        </Typography>
        <Typography>Date: {format(parseISO(nextGame.date), "PPP")}</Typography>
        <Typography>Time: {nextGame.timeEst}</Typography>
        <Typography>Location: {nextGame.arena}</Typography>
      </>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4 space-y-6 min-h-[37.5rem]">
            <Card style={{ borderRadius: "15px" }}>
              <CardContent>
                <Typography variant="h5" component="h2" fontWeight="bold">
                  Upcoming Game
                </Typography>
                {renderNextUpcomingGame()}
              </CardContent>
            </Card>
            <Card style={{ borderRadius: "15px" }}>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  fontWeight="bold"
                  borderRadius={10}
                >
                  Team Leaders
                </Typography>
                <LeaderStat
                  category="Points"
                  leader={pointsLeader}
                  statKey="pts"
                />
                <LeaderStat
                  category="Assists"
                  leader={assistsLeader}
                  statKey="ast"
                />
                <LeaderStat
                  category="Rebounds"
                  leader={reboundsLeader}
                  statKey="reb"
                />
                <LeaderStat
                  category="Steals"
                  leader={stealsLeader}
                  statKey="stl"
                />
                <LeaderStat
                  category="Blocks"
                  leader={blocksLeader}
                  statKey="blk"
                />
                <LeaderStat
                  category="Efficiency"
                  leader={efficiencyLeader}
                  statKey="fgp"
                />
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-8 min-h-[37.5rem]">
            <StandingsTabs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
