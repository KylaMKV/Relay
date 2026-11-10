import {Assert, strict as assert} from "node:assert";
import { get_url } from "../../web/common.ts";
import {request, type Request, type Response} from "express";
import {COLORS, expressify_url, has_DB_for_tests} from "../_common.ts"
import { web_get } from "../../web/gets.ts";
import MockResponse from "./MockResponse.ts";

const tests: {[key: string]: {function: () => void, requires_db: boolean}} = {
    "Valid full Domain URL": {function: valid_full_domain_url, requires_db: false},
    "Valid full IP URL": {function: valid_full_ip_url, requires_db: false},
    "`web_get` With ID and not time parameters": {function: web_get_id, requires_db: true}
}

const required_keys = ["id", "start_time", "end_time", "talkgroup", "transcript", "audio", "broadcast"]
const test_url = {protocol: "http", host: "127.0.0.1:8080", url: "/get?start=1&end=2#ThisIsntUsed"}

export async function run_all_tests() {
    let success = 0
    const keys = Object.keys(tests)
    for(let i = 0; i < keys.length; i++) {
        const test_name = keys[i]
        const test = tests[test_name]
        console.log(`===== Test ${i+1}/${keys.length}: ${test_name} =====`)
        try {
            if( test.requires_db && !(has_DB_for_tests)) {
                console.log("===== Test requires Database, which none have been found. Skipping... =====")
                continue
            }
            await test.function()
            console.log(`===== Test ${i+1}/${keys.length} ${COLORS.GREEN}PASSED${COLORS.RESET} =====`)
            success++;
        } catch(err) {
            console.log(`===== TEST ${COLORS.RED}FAILED${COLORS.RESET}!!!! =====`);
            console.log(err);
        }
    }
    console.log(`===== All tests finished!! ${success}/${keys.length} successfully passed. =====`)
}

function valid_full_domain_url() {
    const out = get_url({protocol: "https", host: "kylamkv.dev:8080", url: "/get?start=1&end=2#ThisIsntUsed"} as Request)
    // I made a URL object that's just instantly converted back to a string to make it 100% accurate.
    assert(out.toString() == new URL("https://kylamkv.dev:8080/get?start=1&end=2#ThisIsntUsed").toString(), "URL's don't match!!!")
}

function valid_full_ip_url() {
    const out = get_url(test_url as Request)
    // I made a URL object that's just instantly converted back to a string to make it 100% accurate.
    assert(out.toString() == new URL("http://127.0.0.1:8080/get?start=1&end=2#ThisIsntUsed").toString(), "URL's don't match!!!")
}

async function web_get_id() {
    const id = 1;
    const gets = await import("../../web/gets.ts");
    const res = new MockResponse()
    gets.web_get(expressify_url(new URL("https://kylamkv.dev/get?id=1")), res)
    assert(res.statusCode == 200, `Failed to fetch row, server returned status code '${res.statusCode}'`)
    const recording_data = JSON.parse(res._body)
    assert(recording_data.id == 1, "Wrong row retrieved")
    const keys = Object.keys(recording_data)
    console.log(keys)
    for(const key of required_keys) {
        console.log(required_keys, keys, key)
        if(!keys.includes(key)) {
            throw Error("Missing key: " + key);
        }
    }
}
run_all_tests()