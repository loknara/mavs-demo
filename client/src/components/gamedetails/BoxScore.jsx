// Displays the box score for the respective teams, and any players with 0 mins will
// be counted as DNP and added to the top of the table

import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import gameData from "../../gameData.json";

const BoxScore = ({ game, gameId }) => {
  const findTeamDetails = (teamAbbreviation) => {
    const team = gameData.teamData.find((t) => t.team === teamAbbreviation);
    return team ? `${team.teamCity} ${team.teamName}` : teamAbbreviation;
  };

  const getDNPPlayersList = (team, gameId) => {
    return gameData.playerBoxScores
      .filter(
        (score) =>
          score.team === team && score.nbaGameId === gameId && score.min === 0
      )
      .map((player) => player.name);
  };

  const renderBoxScore = (team) => {
    const dnpPlayersList = getDNPPlayersList(team, gameId).join(", ");

    return (
      <>
        {dnpPlayersList && (
          <Typography variant="body2" className="mt-2">
            DNP: {dnpPlayersList}
          </Typography>
        )}
        <TableContainer component={Paper} className="mb-5">
          <Table aria-label="box score" className="min-w-lg">
            <TableHead>
              <TableRow>
                {[
                  "Name",
                  "MIN",
                  "FG",
                  "3PT",
                  "FT",
                  "OREB",
                  "DREB",
                  "REB",
                  "AST",
                  "STL",
                  "BLK",
                  "TO",
                  "PF",
                  "+/-",
                  "PTS",
                ].map((header, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    className="font-bold bg-gray-200"
                    sx={{ fontWeight: "bold" }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {gameData.playerBoxScores
                .filter(
                  (score) =>
                    score.team === team &&
                    score.nbaGameId === gameId &&
                    score.min !== 0
                )
                .map((playerScore, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{playerScore.name}</TableCell>
                    <TableCell align="center">{playerScore.min}</TableCell>
                    <TableCell align="center">{`${playerScore.fgm}-${playerScore.fga}`}</TableCell>
                    <TableCell align="center">{`${playerScore.tpm}-${playerScore.tpa}`}</TableCell>
                    <TableCell align="center">{`${playerScore.ftm}-${playerScore.fta}`}</TableCell>
                    <TableCell align="center">{playerScore.oreb}</TableCell>
                    <TableCell align="center">{playerScore.dreb}</TableCell>
                    <TableCell align="center">{playerScore.reb}</TableCell>
                    <TableCell align="center">{playerScore.ast}</TableCell>
                    <TableCell align="center">{playerScore.stl}</TableCell>
                    <TableCell align="center">{playerScore.blk}</TableCell>
                    <TableCell align="center">{playerScore.tov}</TableCell>
                    <TableCell align="center">{playerScore.pf}</TableCell>
                    <TableCell align="center">
                      {playerScore.plusMinus}
                    </TableCell>
                    <TableCell align="center">{playerScore.pts}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  const homeTeamDetails = findTeamDetails(game.homeTeam);
  const awayTeamDetails = findTeamDetails(game.awayTeam);

  return (
    <div className="flex flex-col items-center">
      <Typography
        variant="h6"
        gutterBottom
        className="text-center"
        sx={{ fontWeight: "bold" }}
      >
        {homeTeamDetails}
      </Typography>
      {renderBoxScore(game.homeTeam)}

      <Typography
        variant="h6"
        gutterBottom
        className="text-center mt-5"
        sx={{ fontWeight: "bold" }}
      >
        {awayTeamDetails}
      </Typography>
      {renderBoxScore(game.awayTeam)}
    </div>
  );
};

export default BoxScore;
