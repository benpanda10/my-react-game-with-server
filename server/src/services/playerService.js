// server/src/services/playerService.js
import { v4 as uuidv4 } from "uuid";
import db from "../config/database.js";

export function createPlayer(name, lastName) {
    const playerId = uuidv4();
    const createdAt = Date.now();

    try {
        db.prepare(
            `
            INSERT INTO players (id, name, last_name, created_at)
            VALUES (?, ?, ?, ?)
            `
        ).run(playerId, name, lastName, createdAt);
        return {
            id: playerId,
            name: name,
            lastName: lastName,
            createdAt: createdAt
        }
    }
    catch (error) {
        if (error.message.includes("UNIQUE constraint failed")) {
            return {error: "Player name exists", status: 409}
        }
        throw error;
    }
}

export function getPlayers() {
    return db.prepare(`SELECT * FROM players`).all();
}

export function getPlayer(id) {
    const player = db.prepare(`SELECT * FROM players WHERE id = ?`).get(id);
    if (!player) {
        return {error: "Player not found", status: 404}
    }
    return player;
}