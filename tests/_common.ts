import type { Request } from "express";
import {existsSync} from "node:fs";
import {DB_PATH} from "../config.ts"

export const COLORS = {
    GREEN: "\x1b[32m",
    RED: "\x1b[31m",
    RESET: "\x1b[0m"
}

export const has_DB_for_tests = existsSync(DB_PATH)

export function expressify_url(url: URL) {
    return {protocol: url.protocol.replace(":", ""), host: url.host, url: url.pathname + url.search + url.hash} as Request
}