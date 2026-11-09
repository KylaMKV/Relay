import express, {type Express, type Request, type Response} from "express";

export function get_url(req: Request): URL {
    const url_str = req.protocol + "://" + req.host + req.url
    return new URL(url_str)
}