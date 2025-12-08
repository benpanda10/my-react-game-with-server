// src/server.js
import express from "express";
import "dotenv/config";
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
