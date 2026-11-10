import express, {type Express, type Request, type Response} from "express";
import { init_db } from "./db/init.ts";
import insert from "./db/writes.ts";
import type { Recording_new_row } from "./common.ts";
import { get_recording_from_id, get_recordings_from_time } from "./db/gets.ts";
import Recording from "./recording.ts";
import { web_get } from "./web/gets.ts";

const site = express()

// Safe to always run because of `IF NOT EXISTS` in SQL statement.
init_db()

site.get("/get", web_get)




site.listen(8080, () => {
    console.log("Ready at http://127.0.0.1:8080")
})