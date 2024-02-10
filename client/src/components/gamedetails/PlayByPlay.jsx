// Play by play shows all the games action, and allows for you to even view the plays by just the quarter

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import gameData from "../../gameData.json";

const PlayByPlay = ({ gameId }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(0);

  const handlePeriodChange = (event, newValue) => {
    setSelectedPeriod(newValue);
  };

  const renderPlayByPlay = () => {
    const filteredPlays = gameData.gamePlayByPlay.filter(
      (play) =>
        play.nbaGameId === gameId &&
        (selectedPeriod === 0 || play.period === selectedPeriod)
    );

    return (
      <TableContainer
        component={Paper}
        style={{ marginTop: "20px", marginBottom: "20px", maxHeight: "620px" }}
      >
        <Table aria-label="play-by-play">
          <TableHead>
            <TableRow>
              <TableCell>Period</TableCell>
              <TableCell>Game Clock</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPlays.map((play, index) => (
              <TableRow key={index}>
                <TableCell>{play.period}</TableCell>
                <TableCell>{play.gameClock}</TableCell>
                <TableCell>{play.team}</TableCell>
                <TableCell>{play.description}</TableCell>
                <TableCell>
                  {play.homeScore} - {play.awayScore}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <TableContainer
      component={Paper}
      style={{
        marginTop: "20px",
        marginBottom: "20px",
        maxHeight: "620px",
      }}
    >
      <Tabs value={selectedPeriod} onChange={handlePeriodChange} centered>
        <Tab label="All Periods" value={0} />
        {[1, 2, 3, 4].map((period) => (
          <Tab key={period} label={`Period ${period}`} value={period} />
        ))}
      </Tabs>
      {renderPlayByPlay()}
    </TableContainer>
  );
};

export default PlayByPlay;
