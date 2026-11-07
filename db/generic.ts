/* Holds generic variables and functions accessed by everything in `db`. */

import {DatabaseSync} from "node:sqlite"
import { DB_PATH } from "../config.ts"

export const db = new DatabaseSync(DB_PATH);