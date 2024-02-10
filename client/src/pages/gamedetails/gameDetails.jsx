// This page serves the main schedule portion of the code, displaying the right game and its respectuve details
//The game it is meanth to show is recvived by the schedule page through a passed in state
// where it will then grab relevent data to show in the various components.
// The top half of the page is rendered through the gameheader component, while the bottom half
// of the page is rendered based on the tab chosen by the user, defaulting to some quick stats

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, Button } from "@mui/material";
import GameHeader from "../../components/gamedetails/gameHeader";
import gameData from "../../gameData.json";
import BoxScore from "../../components/gamedetails/BoxScore";
import PlayByPlay from "../../components/gamedetails/PlayByPlay";
import MatchupDetails from "../../components/gamedetails/MatchupDetails";
import ScoutingReports from "../../components/gamedetails/ScoutingReports";

const GameDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // The next line of code allows us to grab gameId from the state passed through the location object, which is sent from the ScedhulePage
  const gameId = location.state?.gameId;
  const [game, setGame] = useState(null);
  const [quarterScores, setQuarterScores] = useState([]);
  const [activeTab, setActiveTab] = useState("matchup-details");

  useEffect(() => {
    if (gameId) {
      const gameInfo = gameData.games.find((g) => g.nbaGameId === gameId);
      setGame(gameInfo);

      const filteredQuarterScores = gameData.quarterPoints.filter(
        (qp) => qp.nbaGameId === gameId
      );
      setQuarterScores(filteredQuarterScores);
    }
  }, [gameId]);

  if (!game) {
    return <div>Loading game details...</div>;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case "box-score":
        return <BoxScore game={game} gameId={gameId} />;
      case "play-by-play":
        return <PlayByPlay game={game} gameId={gameId} />;
      case "matchup-details":
        return <MatchupDetails game={game} gameId={gameId} />;
      case "scouting-reports":
        return <ScoutingReports game={game} gameId={gameId} />;
      default:
        return <MatchupDetails game={game} gameId={gameId} />;
    }
  };

  const isActiveTab = (tabName) =>
    activeTab === tabName
      ? "text-blue-500 font-bold"
      : "text-black hover:text-blue-500 transition duration-300";

  return (
    <div className="bg-gray-200 rounded-xl">
      <Card className="bg-gray-200 rounded-xl">
        <CardContent>
          <GameHeader game={game} quarterScores={quarterScores} />
          <div className="bg-gray-100 rounded-3xl">
            <div className="flex flex-wrap justify-around items-center bg-gray-100 h-auto py-2 rounded-3xl font-bold text-xl">
              {[
                "matchup-details",
                "box-score",
                "play-by-play",
                "scouting-reports",
              ].map((tab) => (
                <button
                  key={tab}
                  className={`py-2 px-4 focus:outline-none text-xs md:text-sm ${isActiveTab(
                    tab
                  )}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab
                    .replace("-", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">{renderActiveTab()}</div>

          <Button onClick={() => navigate(-1)}>Back to Schedule</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameDetails;
