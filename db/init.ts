import { db } from "./generic.ts";

const cols = {"id": "INTEGER", "start_time": "INTEGER NOT NULL", "end_time": "INTEGER", "talkgroup": "TEXT", "transcript": "TEXT", "broadcast": "TEXT", "audio": "BLOB NOT NULL"}

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

/**
 * Checks all columns of the `Scans` table exist and are of the right type
 */
export function fix_db() {
    const columns = db.prepare("PRAGMA table_info(Scans)").all()
    const dict = {}
    for(const col of columns) {
        //@ts-ignore
        dict[col.name] = col
    }

    // Find missing keys
    const missing = []
    for(const col of Object.keys(cols)) {
        if(!Object.keys(dict).includes(col)) {
            missing.push(col)
        }
    }
    if(missing.length > 0) {
        console.log("Error: Missing columns:", missing, ". Creating columns...")
        for(const col of missing) {
            //@ts-ignore
            db.prepare(`ALTER TABLE Scans ADD COLUMN ${col} ${cols[col]};`).run()
        }
    }
    // TODO: Check if columns are the right type(?)
}