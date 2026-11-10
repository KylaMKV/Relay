import express, {type Express, type Request, type Response} from "express";
import { get_url } from "./common.ts";
import { get_recording_from_id, get_recordings_from_time } from "../db/gets.ts";
import Recording from "../recording.ts";
import MockResponse from "../tests/web/MockResponse.ts";

/**
 * @description Fetches row data using either an `id` searchParam, or `start` and end` searchParams to search via time.
*/
export function web_get(req: Request, res: Response | MockResponse) {
    const url = get_url(req)

    const id_str: string | null = url.searchParams.get("id")

    const start_str: string | null = url.searchParams.get("start")
    const end_str: string | null = url.searchParams.get("end")

    // if neither the ID or start/end times are defined...
    if(id_str == null && (start_str == null && end_str == null)) {
        return res.status(400).send("Needs either an id search parameter or start and end parameter.")
    }
    // If all parameters are defined
    else if(id_str != null && (start_str != null && end_str != null)) {
        return res.status(400).send("Too many arguments. only use `id` or `start` and `end`. not both.")
    }
    // if either `start` is defined and `end_str` isn't or vice versa.
    else if( (start_str == null && end_str != null) || (end_str == null && start_str != null) ) {
        return res.status(400).send("Both `start` and `end` need to be defined to search by time.")
    }
    
    // just an abstracted `Recording` object.
    let ret: Array<object> | object | null

    if(id_str != null) {
        const id = Number.parseInt(id_str!)

        if( isNaN(id) ) {
            return res.status(400).send();
        }

         ret = get_recording_from_id({id: id, objectify: false}) as object | null

    } else {
        const start = Number.parseInt(start_str!)
        const end = Number.parseInt(end_str!)

        if([start, end].includes(NaN)) {
            return res.status(400).send("start or end is NaN.")
        }

        ret = get_recordings_from_time({start: start, end: end, objectify: false})
    }


    if(ret == null) {
        return res.status(404).send()
    }

    return res.status(200)
        .setHeader("Content-Type", "Application/JSON")
        .send(JSON.stringify(ret));
}