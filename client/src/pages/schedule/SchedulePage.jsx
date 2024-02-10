// This page displays the schedule, and any games for the current week
// It is color coded based on the 3 game states, and based on game click will pass
// that info on to gameDetails

import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import {
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  isToday,
  format,
} from "date-fns";
import { useNavigate } from "react-router-dom";
import gameData from "../../gameData.json";
import CurrentWeekView from "../../components/schedule/CurrentWeekView";

const SchedulePage = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [showWeek, setShowWeek] = useState(true);
  const [games, setGames] = useState(gameData.games);
  const navigate = useNavigate();

  const filteredGames = games.filter((game) =>
    showWeek
      ? isWithinInterval(new Date(game.date + "T00:00:00"), {
          start: currentWeekStart,
          end: endOfWeek(currentWeekStart, { weekStartsOn: 1 }),
        })
      : isToday(new Date(game.date + "T00:00:00"))
  );

  const navigateToGameDetail = (gameId) => {
    navigate("/game-details", { state: { gameId } });
  };

  const handleViewChange = (event, nextView) => {
    if (nextView !== null) {
      setShowWeek(nextView === "week");
    }
  };

  return (
    <div className="bg-gray-100 container mx-auto p-4 rounded-lg shadow">
      {" "}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <Typography variant="h4" className="text-primary mb-4 sm:mb-0">
          {showWeek ? "This Week" : "Today"}
        </Typography>
        <ToggleButtonGroup
          value={showWeek ? "week" : "day"}
          exclusive
          onChange={handleViewChange}
          className="flex-wrap"
        >
          <ToggleButton value="week" aria-label="week" className="mb-2 sm:mb-0">
            <ViewWeekIcon />
            &nbsp;Week
          </ToggleButton>
          <ToggleButton value="day" aria-label="day">
            <TodayIcon />
            &nbsp;Today
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      {showWeek && (
        <CurrentWeekView
          games={games}
          currentWeekStart={currentWeekStart}
          setCurrentWeekStart={setCurrentWeekStart}
        />
      )}
      <List>
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <Paper
              elevation={2}
              key={game.nbaGameId}
              className="mb-2 p-2 hover:bg-gray-200 transition duration-300 cursor-pointer"
            >
              {" "}
              <ListItem onClick={() => navigateToGameDetail(game.nbaGameId)}>
                <ListItemText
                  primary={
                    <Typography
                      variant="h6"
                      className={`${getGameStatusColor(game)} text-lg`}
                    >
                      {game.homeTeam} vs {game.awayTeam}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Chip
                        label={getGameStatusText(game.gameStatus)}
                        size="small"
                        className={`${getGameStatusColor(game)} mb-2`}
                      />
                      <Typography variant="body2" className="text-gray-600">
                        Date: {format(new Date(game.date), "PPP")}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            </Paper>
          ))
        ) : (
          <Typography variant="h6" className="text-secondary text-center">
            No games available {showWeek ? "this week" : "today"}.
          </Typography>
        )}
      </List>
    </div>
  );
};

export default SchedulePage;

// Utility functions to get the game status text based on the game's current status, and assign colors to them
function getGameStatusText(gameStatus) {
  switch (gameStatus) {
    case 1:
      return "Not Started";
    case 2:
      return "In Progress";
    case 3:
      return "Completed";
    default:
      return "Unknown";
  }
}
function getGameStatusColor(game) {
  switch (game.gameStatus) {
    case 1:
      return "text-gray-500";
    case 2:
      return "text-orange-500";
    case 3:
      return "text-green-500";
    default:
      return "text-gray-500";
  }
}
