// Serves the top half of gameDetails, diplays the team logos, scores, and quarter score

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from "@mui/material";
import gameData from "../../gameData.json";

const GameHeader = ({ game, quarterScores }) => {
  const theme = useTheme();

  const calculateTotalScore = (team) => {
    return quarterScores
      .filter((score) => score.team === team)
      .reduce((total, current) => total + current.pts, 0);
  };

  const renderGameStatus = (status) => {
    switch (status) {
      case 1:
        return "Not Started";
      case 2:
        return "In Progress";
      case 3:
        return "Completed";
      default:
        return "Unknown";
    }
  };

  const homeLogo = gameData.teamData.find(
    (team) => team.team === game.homeTeam
  )?.logo;
  const awayLogo = gameData.teamData.find(
    (team) => team.team === game.awayTeam
  )?.logo;

  const findTeamDetails = (teamAbbreviation) => {
    const team = gameData.teamData.find((t) => t.team === teamAbbreviation);
    return team ? `${team.teamCity} ${team.teamName}` : teamAbbreviation;
  };

  const homeTeamDetails = findTeamDetails(game.homeTeam);
  const awayTeamDetails = findTeamDetails(game.awayTeam);

  return (
    <Card
      variant="outlined"
      sx={{ borderRadius: "15px", width: "100%", marginBottom: "20px" }}
    >
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-around">
          <Grid
            item
            xs={12}
            sm={4}
            container
            direction="column"
            alignItems="center"
            sx={{ display: { md: "flex", sm: "none", xs: "none" } }}
          >
            <CardMedia
              component="img"
              sx={{ height: { sm: "300px", xs: "200px" } }}
              image={homeLogo}
              alt={`${game.homeTeam} logo`}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={4}
            container
            direction="column"
            alignItems="center"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                marginTop: "16px",
                marginBottom: "16px",
              }}
            >
              <Typography
                variant="h6"
                component="span"
                sx={{ fontWeight: "bold" }}
              >
                {homeTeamDetails}
              </Typography>
              <Typography variant="h6" component="span">
                {game.homePts} - {game.awayPts}
              </Typography>
              <Typography
                variant="h6"
                component="span"
                sx={{ fontWeight: "bold" }}
              >
                {awayTeamDetails}
              </Typography>
            </div>

            <Chip
              label={`Status: ${renderGameStatus(game.gameStatus)}`}
              color="default"
              sx={{ mb: 2 }}
            />
            <TableContainer
              component={Paper}
              sx={{
                my: 1,
                "& .MuiTable-root": {
                  minWidth: "450px",
                  [theme.breakpoints.down("md")]: {
                    minWidth: "auto",
                    width: "90%",
                  },
                },
              }}
            >
              <Table aria-label="quarter scores" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Team</TableCell>
                    {[1, 2, 3, 4].map((period) => (
                      <TableCell key={period} align="center">
                        {period}
                      </TableCell>
                    ))}
                    <TableCell align="center">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[game.homeTeam, game.awayTeam].map((team, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {team}
                      </TableCell>
                      {[1, 2, 3, 4].map((period) => {
                        const score = quarterScores.find(
                          (qs) => qs.team === team && qs.period === period
                        );
                        return (
                          <TableCell key={period} align="center">
                            {score ? score.pts : "-"}
                          </TableCell>
                        );
                      })}
                      <TableCell align="center">
                        {calculateTotalScore(team)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid
            item
            xs={12}
            sm={4}
            container
            direction="column"
            alignItems="center"
            sx={{ display: { md: "flex", sm: "none", xs: "none" } }}
          >
            <CardMedia
              component="img"
              sx={{ height: { sm: "300px", xs: "200px" } }}
              image={awayLogo}
              alt={`${game.awayTeam} logo`}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default GameHeader;
