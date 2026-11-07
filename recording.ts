/**
 * @description How recordings should be handled outside of raw database interactions
 * @var _id SQL row ID.
 * @var start_time The time in seconds which the recording began
 * @var end_time The time in seconds which the recording ended
 * @var broadcast Which specific broadcast this recording is from(e.g LAPD Dispatch - Pacific Division)
 * @var talkgroup Talkgroup of the recording
 * @var transcript Transcript of the recording
 * @var audio Actual audio recording. by default a 12Kbps ogg file.
 */
export default class Recording {
    readonly id: number;
    talkgroup: string | null;
    transcript: string | null;
    broadcast: string | null;
    readonly start_time: number;
    readonly end_time: number | null;
    readonly audio: Uint8Array;

    constructor() {
        this.id = -1;
        this.talkgroup = null;
        this.transcript = null;
        this.broadcast = null;
        this.start_time = -1;
        this.end_time = -1;
        this.audio = new Uint8Array(0);
    }
    json() {
        return Object.assign({}, this);
    }
    row(): [any[], any[]] {
        return [ Object.keys(this), [Object.values(this)] ]
    }
}