import { db } from "./generic.ts";

const init_str = 
`CREATE TABLE IF NOT EXISTS Scans(
    id INTEGER PRIMARY KEY,
    start_time INTEGER NOT NULL,
    end_time INTEGER,
    talkgroup TEXT,
    transcript TEXT,
    broadcast TEXT,
    audio BLOB NOT NULL
);`;

export function init_db() {
    db.exec(init_str)
}