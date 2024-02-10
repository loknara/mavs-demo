import React, { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  TextareaAutosize,
  MenuItem,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import gameData from "../../gameData.json";

const ScoutingReports = ({ game, gameId }) => {
  const [scoutingReports, setScoutingReports] = useState([]);

  useEffect(() => {
    const existingReports = gameData.scoutingReports.filter(
      (report) => report.nbaGameId === gameId
    );
    setScoutingReports(existingReports);
  }, [gameId]);

  const [newScoutReport, setNewScoutReport] = useState({
    nbaGameId: gameId,
    scout: "",
    nbaId: "",
    name: "",
    report: "",
  });

  const renderScoutingReports = () => {
    return scoutingReports.map((report, index) => (
      <Card key={index} style={{ marginBottom: "10px" }}>
        <CardContent>
          <Typography variant="h6">{report.name}</Typography>
          <Typography variant="body1">{report.report}</Typography>
          <Typography variant="body2">Scout: {report.scout}</Typography>
          <IconButton
            aria-label="delete"
            onClick={() => handleRemoveScoutingReport(index)}
          >
            <DeleteIcon />
          </IconButton>
        </CardContent>
      </Card>
    ));
  };

  const handleAddScoutingReport = () => {
    if (
      !newScoutReport.scout ||
      !newScoutReport.name ||
      !newScoutReport.report
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const updatedReports = [...scoutingReports, newScoutReport];
    setScoutingReports(updatedReports);

    setNewScoutReport({
      nbaGameId: gameId,
      scout: "",
      nbaId: "",
      name: "",
      report: "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewScoutReport({ ...newScoutReport, [name]: value });
  };

  const handleRemoveScoutingReport = (index) => {
    const updatedReports = [...scoutingReports];
    updatedReports.splice(index, 1);
    setScoutingReports(updatedReports);
  };

  const players = gameData.playerStats.filter(
    (player) =>
      player.team !== "DAL" &&
      (player.team === game.awayTeam || player.team === game.homeTeam)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddScoutingReport();
  };

  return (
    <Grid item xs={12}>
      {renderScoutingReports()}

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="player-select-label">Player</InputLabel>
          <Select
            labelId="player-select-label"
            id="player-select"
            value={newScoutReport.name}
            label="Player"
            name="name"
            onChange={handleFormChange}
          >
            {players.map((player) => (
              <MenuItem key={player.name} value={player.name}>
                {player.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          required
          fullWidth
          id="scout"
          label="Scout's Name"
          name="scout"
          value={newScoutReport.scout}
          onChange={handleFormChange}
          autoComplete="scout-name"
        />
        <InputLabel id="report-label" sx={{ mt: 2 }}>
          Scouting Report
        </InputLabel>
        <TextareaAutosize
          minRows={3}
          style={{ width: "100%" }}
          id="report"
          name="report"
          value={newScoutReport.report}
          onChange={handleFormChange}
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Add Scouting Report
        </Button>
      </Box>
    </Grid>
  );
};

export default ScoutingReports;
