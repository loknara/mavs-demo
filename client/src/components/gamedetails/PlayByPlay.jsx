import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import gameData from "../../gameData.json";

const PlayByPlay = ({ gameId }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(0);

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
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
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        <Table aria-label="play-by-play" stickyHeader>
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
    <div>
      <FormControl fullWidth style={{ marginBottom: "20px" }}>
        <InputLabel id="period-select-label">Period</InputLabel>
        <Select
          labelId="period-select-label"
          id="period-select"
          value={selectedPeriod}
          label="Period"
          onChange={handlePeriodChange}
        >
          <MenuItem value={0}>All Periods</MenuItem>
          {[1, 2, 3, 4].map((period) => (
            <MenuItem key={period} value={period}>
              Period {period}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {renderPlayByPlay()}
    </div>
  );
};

export default PlayByPlay;
