// server/src/config/database.js
import { DatabaseSync } from "node:sqlite";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const dbPath = path.join(__dirname, "../../database/tictactoe.db");
/* optional error handling for database path */
// Database directory and path
const dbDir = path.join(__dirname, '../../database');
const dbPath = path.join(dbDir, 'tictactoe.db');

// Create database directory if it doesn't exist
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log(`📁 Created database directory: ${dbDir}`);
}
console.log(`Database location: ${dbPath}`);