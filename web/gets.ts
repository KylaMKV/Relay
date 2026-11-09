import express, {type Express, type Request, type Response} from "express";
import { get_url } from "./common.ts";
import { get_recording_from_id, get_recordings_from_time } from "../db/gets.ts";
import Recording from "../recording.ts";

export function web_get_from_id(req: Request, res: Response) {
    const url = get_url(req)

    const id_str: string | null = url.searchParams.get("id")
    
    if( id_str == null )  {
        return res.status(400).send();
    }

    const id = Number.parseInt(id_str!)

    if( isNaN(id) ) {
        return res.status(400).send();
    }

    const recording = get_recording_from_id(id) as Recording | null

    if(recording == null) {
        return res.status(404).send()
    }

    return res.status(200)
        .setHeader("Content-Type", "Application/JSON")
        .send(JSON.stringify(recording.json()));
}

export function web_get_from_time(req: Request, res: Response) {
    const url = get_url(req)

    const start_str: string | null = url.searchParams.get("start")
    const end_str: string | null = url.searchParams.get("end")
    
    // if either `start` or `end` isn't defined in the search params...
    if( [start_str, end_str].includes(null) )  {
        return res.status(400).send();
    }

    const start = Number.parseInt(start_str!)
    const end = Number.parseInt(end_str!)

    // Yes, this works but not `start == NaN`. screw JS/TS...
    if( [start, end].includes(NaN) ) {
        return res.status(400).send();
    }
    const recordings = get_recordings_from_time({start: start!, end: end!, objectify: false}) as Array<object> | null
    if(recordings == null) {
        return res.status(201).send()
    }
    return res.status(200)
        .setHeader("Content-Type", "Application/JSON")
        .send(JSON.stringify(recordings));
}