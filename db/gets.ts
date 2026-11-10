import { DB_PATH } from "../config.ts";
import Recording from "../recording.ts";
import { db } from "./generic.ts";

/**
 * @param id the specific ID of the recording to look for.
 * @param args Any additional arguments, placed after `WHERE id = {id}`. if continuing the `WHERE` statement, make sure to prepend with "AND" or "OR".
 */
export function get_recording_from_id(args: {id: number, objectify?: boolean, args?: string}): Recording | object | null {
    if (args.objectify == undefined) args.objectify = true;
    if (args.args == undefined) args.args = ""

    const cmd = `SELECT * FROM Scans WHERE id = ? ${args.args};`

    const out = db.prepare(cmd).get(args.id);

    if( out == undefined) {
        return null;
    }

    if(args.objectify)
        return Object.assign(new Recording(), out)
    return out

}

/**
 * @param start the beginning of the range.
 * @param end the end of the range.
 * @param objectify Whether or not to map the output to a `Recording` Object. `false` returns the raw SQL output(JSON). defaults true.
 * @param args Any additional arguments, placed after `WHERE id = {id}`. if continuing the `WHERE` statement, make sure to prepend with "AND" or "OR".
 */
export function get_recordings_from_time(args: {start: number, end: number, objectify?: boolean, args?: string}): Array<Recording> | Array<object> | null {
    if (args.objectify == null) {args.objectify = true}
    if (args.args == null) {args.args = ""}

    const cmd = `SELECT * FROM Scans WHERE start_time >= ? AND end_time <= ? ${args.args};`

    const out = db.prepare(cmd).all(args.start, args.end);

    if( out == undefined) {
        return null;
    }
    const ret = []
    if(args.objectify) {
        for(const row of out) {
            ret.push(Object.assign(new Recording(), row))
        }
    } else {
        return out;
    }

    return ret;

}