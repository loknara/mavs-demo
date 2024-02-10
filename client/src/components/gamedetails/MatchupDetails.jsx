// MatchupDetails serves to show some quick stats about the teams we a are playing against
// It has the season series, and some compartive stats of both the rankings and the ratings

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import {
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { format } from "date-fns";
import gameData from "../../gameData.json";

const MatchupDetails = ({ game, gameId }) => {
  const radarChartRef = useRef(null);
  const columnChartRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const seasonSeries = gameData.seasonSeries.filter(
    (g) =>
      (g.homeTeam === game.homeTeam && g.awayTeam === game.awayTeam) ||
      (g.homeTeam === game.awayTeam && g.awayTeam === game.homeTeam)
  );

  const homeTeamRanks = gameData.teamRanks.find(
    (team) => team.team === game.homeTeam
  );
  const awayTeamRanks = gameData.teamRanks.find(
    (team) => team.team === game.awayTeam
  );

  const findTeamDetails = (teamAbbreviation) => {
    const team = gameData.teamData.find((t) => t.team === teamAbbreviation);
    return team ? `${team.teamCity} ${team.teamName}` : teamAbbreviation;
  };
  const homeTeamDetails = findTeamDetails(game.homeTeam);
  const awayTeamDetails = findTeamDetails(game.awayTeam);

  useEffect(() => {
    Chart.defaults.font.size = 14;
    if (radarChartRef.current) {
      const radarCtx = radarChartRef.current.getContext("2d");
      const radarChart = new Chart(radarCtx, {
        type: "radar",
        data: {
          labels: [
            "Offensive Ranking",
            "Defensive Ranking",
            "Efficiency Ranking",
            "Opp Efficiency Ranking",
            "Turnover Ranking",
            "Forced Turnovers Ranking",
            "FT Att. Ranking",
            "FT Allowed Ranking",
          ],
          datasets: [
            {
              label: homeTeamDetails,
              data: [
                homeTeamRanks["OFF RTG_rank"],
                homeTeamRanks["DEF RTG_rank"],
                homeTeamRanks["EFG%_rank"],
                homeTeamRanks["OPP. EFG_rank"],
                homeTeamRanks["TURNOVERS_rank"],
                homeTeamRanks["TURNOVERS FORCED_rank"],
                homeTeamRanks["FTA_rank"],
                homeTeamRanks["FTA ALLOWED_rank"],
              ],
              backgroundColor: "rgba(128, 128, 128, 0.2)",
              borderColor: "rgba(128, 128, 128, 1)",
              borderWidth: 1.5,
            },
            {
              label: awayTeamDetails,
              data: [
                awayTeamRanks["OFF RTG_rank"],
                awayTeamRanks["DEF RTG_rank"],
                awayTeamRanks["EFG%_rank"],
                awayTeamRanks["OPP. EFG_rank"],
                awayTeamRanks["TURNOVERS_rank"],
                awayTeamRanks["TURNOVERS FORCED_rank"],
                awayTeamRanks["FTA_rank"],
                awayTeamRanks["FTA ALLOWED_rank"],
              ],
              backgroundColor: "rgba(0, 123, 255, 0.2)",
              borderColor: "rgba(0, 123, 255, 1)",
              borderWidth: 1.5,
            },
          ],
        },
        options: {
          scales: {
            r: {
              beginAtZero: true,
              pointLabels: {
                font: {
                  size: 14,
                },
              },
            },
          },
          elements: {
            line: {
              borderWidth: 8,
            },
          },
        },
      });

      if (columnChartRef.current) {
        const columnCtx = columnChartRef.current.getContext("2d");
        const columnChart = new Chart(columnCtx, {
          type: "bar",
          data: {
            labels: [
              "Offensive Rating",
              "Defensive Rating",
              "Efficiency Rating",
              "Opp Efficiency Rating",
              "Turnover Rating",
              "Forced Turnovers Rating",
              "FT Att. Rating",
              "FT Allowed Rating",
            ],
            datasets: [
              {
                label: homeTeamDetails,
                data: [
                  homeTeamRanks["OFF RTG"],
                  homeTeamRanks["DEF RTG"],
                  homeTeamRanks["EFG%"],
                  homeTeamRanks["OPP. EFG%"],
                  homeTeamRanks["TURNOVERS"],
                  homeTeamRanks["TURNOVERS FORCED"],
                  homeTeamRanks["FTA"],
                  homeTeamRanks["FTA ALLOWED"],
                ],
                backgroundColor: "rgba(128, 128, 128, 0.2)",
                borderColor: "rgba(128, 128, 128, 1)",
                borderWidth: 1,
              },
              {
                label: awayTeamDetails,
                data: [
                  awayTeamRanks["OFF RTG"],
                  awayTeamRanks["DEF RTG"],
                  awayTeamRanks["EFG%"],
                  awayTeamRanks["OPP. EFG%"],
                  awayTeamRanks["TURNOVERS"],
                  awayTeamRanks["TURNOVERS FORCED"],
                  awayTeamRanks["FTA"],
                  awayTeamRanks["FTA ALLOWED"],
                ],
                backgroundColor: "rgba(0, 123, 255, 0.2)",
                borderColor: "rgba(0, 123, 255, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            maintainAspectRatio: false,
          },
        });
        return () => {
          radarChart.destroy();
          columnChart.destroy();
        };
      }
    }
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Team Comparison
          </Typography>
          <div
            style={{
              height: isMobile ? "250px" : "500px",
              width: "100%",
            }}
          >
            <canvas ref={radarChartRef}></canvas>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Team Stats (Column)
          </Typography>
          <div
            style={{
              height: isMobile ? "250px" : "500px",
              width: "100%",
              fontSize: "",
            }}
          >
            <canvas ref={columnChartRef}></canvas>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Season Series
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="season series table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Home Team</TableCell>
                  <TableCell>Away Team</TableCell>
                  <TableCell>Home Points</TableCell>
                  <TableCell>Away Points</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {seasonSeries.map((match, index) => (
                  <TableRow key={index}>
                    <TableCell>{format(new Date(match.date), "PPP")}</TableCell>
                    <TableCell>{match.homeTeam}</TableCell>
                    <TableCell>{match.awayTeam}</TableCell>
                    <TableCell>{match.homePts}</TableCell>
                    <TableCell>{match.awayPts}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default MatchupDetails;
