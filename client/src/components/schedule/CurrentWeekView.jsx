// CurrentWeekView displays the week by week calander and shows when we have games
// and on what date

import React from "react";
import {
  endOfWeek,
  eachDayOfInterval,
  format,
  addWeeks,
  subWeeks,
  isSameDay,
} from "date-fns";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Button } from "@mui/material";

const CurrentWeekView = ({ games, currentWeekStart, setCurrentWeekStart }) => {
  const today = new Date();
  const daysOfCurrentWeek = eachDayOfInterval({
    start: currentWeekStart,
    end: endOfWeek(currentWeekStart, { weekStartsOn: 1 }),
  });

  const getGameStatusColor = (game) => {
    switch (game.gameStatus) {
      case 1:
        return "text-gray-500"; // Not Started
      case 2:
        return "text-orange-500"; // In Progress
      case 3:
        return "text-green-500"; // Completed
      default:
        return "text-gray-500";
    }
  };

  const isGameDay = (date, game) => {
    const gameDate = new Date(game.date + "T00:00:00");
    return isSameDay(gameDate, date);
  };

  const goToNextWeek = () => setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  const goToPreviousWeek = () =>
    setCurrentWeekStart(subWeeks(currentWeekStart, 1));

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start overflow-x-auto">
      <Button
        size="small"
        onClick={goToPreviousWeek}
        variant="contained"
        startIcon={<ArrowCircleLeftIcon />}
        className="mb-2 sm:mb-0 sm:mr-2"
      >
        Prev
      </Button>
      <div className=" inline-flex overflow-x-auto w-full">
        {daysOfCurrentWeek.map((day) => (
          <div
            key={day.toString()}
            className={`flex-none bg-white shadow rounded-lg p-4 m-2 w-40 ${
              isSameDay(day, today) ? "border-2 border-blue-500" : ""
            }`}
          >
            <h3
              className={`font-semibold text-lg ${
                isSameDay(day, today) ? "text-blue-600" : "text-gray-600"
              } mb-2`}
            >
              {format(day, "EEE, MMM d")}
            </h3>
            <div>
              {games
                .filter((game) => isGameDay(day, game))
                .map((filteredGame) => (
                  <p
                    key={filteredGame.nbaGameId}
                    className={`${getGameStatusColor(filteredGame)} text-sm`}
                  >
                    {filteredGame.homeTeam} vs {filteredGame.awayTeam}
                  </p>
                ))}
            </div>
          </div>
        ))}
      </div>
      <Button
        size="small"
        onClick={goToNextWeek}
        variant="contained"
        startIcon={<ArrowCircleRightIcon />}
        className="mt-2 sm:mt-0 sm:ml-2"
      >
        Next
      </Button>
    </div>
  );
};

export default CurrentWeekView;
