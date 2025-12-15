// src/server.js
import express from "express";
import "dotenv/config";
import { createPlayer, getPlayers, getPlayer } from "./services/playerService.js"
const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome Home!");
});
app.get("/about", (req, res) => {
  res.status(200).send("My name is Ryan");
});

app.get("/error", (req, res) => {
  throw new Error("error from /error route");
});

app.get("/api/players/:id", (req, res) => {
  const id = req.params.id;
  const player = getPlayer(id);
  if (player.error) {
    return res.status(player.status).json({ error: player.error });
  }
  res.json({ success: true, player: player });
});

app.get("/api/players", (req, res) => {
  const players = getPlayers();
  res.json({ success: true, players: players })
});

// POST ROUTES

app.post("/api/players", (req, res) => {
  try {
    // take name prop from req body and cache to var with right declaration
    const { name, lastName } = req.body;
    const trimmedName = name?.trim();
    const trimmedLastName = lastName?.trim();
    if (!name || !lastName) {
      return res.status(400).json({
        error: 'Name was not found or entered incorrectly.'
      })
    }
    const player = createPlayer(trimmedName, trimmedLastName);

    if (player.error) {
      return res.status(player.status).json({ error: player.error });
    }

    res.status(201).json({success: true, player: player})
  }
  catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})


app.use((req, res) => {
  res.status(404).send("The page you're looking for does not exist");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Internal Server Error! ERror!",
    msg: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
