// Standigs tab displays the confrence and division standings

import React, { useState } from "react";
import {
  Typography,
  Tabs,
  Tab,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import gameData from "../../gameData.json";

const StandingsTabs = () => {
  const divisions = [
    "Atlantic",
    "Central",
    "Southeast",
    "Northwest",
    "Pacific",
    "Southwest",
  ];
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const byConference = gameData.standings.reduce((acc, team) => {
    acc[team.conference] = acc[team.conference] || [];
    acc[team.conference].push(team);
    return acc;
  }, {});

  const byDivision = divisions.reduce((acc, division) => {
    acc[division] = gameData.standings.filter(
      (team) => team.division === division
    );
    acc[division].sort((a, b) => b.winPct - a.winPct);
    return acc;
  }, {});

  Object.keys(byConference).forEach((conference) => {
    byConference[conference].sort((a, b) => b.winPct - a.winPct);
  });

  const renderTable = (conferenceTeams) => (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Team</TableCell>
          <TableCell align="right">W</TableCell>
          <TableCell align="right">L</TableCell>
          <TableCell align="right">Win%</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {conferenceTeams.map((team) => (
          <TableRow key={team.teamAbbreviation}>
            <TableCell>{team.teamAbbreviation}</TableCell>
            <TableCell align="right">{team.wins}</TableCell>
            <TableCell align="right">{team.losses}</TableCell>
            <TableCell align="right">{team.winPct.toFixed(3)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderDivisionStandings = () => {
    return divisions.map((division) => (
      <Box key={division} mb={2}>
        <Typography variant="h6" fontWeight="bold">
          {division} Division
        </Typography>
        {renderTable(byDivision[division])}
      </Box>
    ));
  };

  return (
    <Paper square style={{ borderRadius: "15px", maxHeight: "6200px" }}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
      >
        <Tab label="Conference" />
        <Tab label="Division" />
      </Tabs>
      <Box p={3} style={{ maxHeight: "570px", overflow: "auto" }}>
        {" "}
        {value === 0 &&
          Object.entries(byConference).map(([conference, teams]) => (
            <Box key={conference} mb={2}>
              <Box mb={1}>
                <Typography variant="h6" fontWeight="bold">
                  {conference} Conference
                </Typography>
              </Box>
              {renderTable(teams)}
            </Box>
          ))}
        {value === 1 && renderDivisionStandings()}
      </Box>
    </Paper>
  );
};

export default StandingsTabs;
