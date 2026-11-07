export type Recording_new_row = {start_time: number, end_time?: number, talkgroup?: string, transcript?: string, broadcast?: string, audio: Uint8Array};
export type Recording_modify_row = {talkgroup?: string, transcript?: string, broadcast?: string}

/**
 * @description Converts an key-val object to two arrays
 * @example unmap({"test": "test2", "test3": "test4"}) == [ ["test", "test3"], ["test2", "test4"] ]
 * @param obj object to unmap
 * @returns an 2-item array containing arrays. the first array are the keys of the object, the second array are the values
 */
export function unmap_obj(obj: object): {keys: any[], values: any[]} {
    return {keys: Object.keys(obj), values: Object.values(obj)}
}
