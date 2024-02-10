# Mavs Sports Scehdeule Internal Tool

## Description

This project is a web application designed to provide the mavs front office with detailed information on games including schedules, game details, and scouting reports. It utilizes React for the frontend to offer a responsive user experience, and uses JSON data to provde the stats and various other pices of key information. The application allows users to view games scheduled for the current week or day, access detailed game reports, and read scouting reports on players.

## Features

- **Weekly and Daily Schedule Views:** Users can toggle between viewing the entire week's games or just today's games.
- **Game Details:** Clicking on a game takes the user to a detailed page for that game, including box scores, play-by-play data, matchup details, and scouting reports.
- **Scouting Reports:** Users can view and add scouting reports for players, providing insights and details about player performances.
- **Responsive Design:** The application is mobile-friendly, ensuring a seamless experience .
- **Dynamic Data Loading:** Game and player data is dynamically loaded from a JSON file, simulating a backend API.

## Technology Stack

- **Frontend:** React, Material-UI for React components and icons, date-fns for date manipulation
- **Data Storage:** Local JSON file (`gameData.json`) simulating backend data

## Getting Started

### Prerequisites

- Node.js
- Web browser

### Installation

1. **Clone the repository**

   ```
   git https://github.com/loknara/mavs-demo.git
   cd client
   npm i
   npm start
   ```
