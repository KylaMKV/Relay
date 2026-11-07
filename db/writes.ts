import { db } from "./generic.ts"
import type { Recording_new_row, Recording_modify_row } from "../common.ts"
import {unmap_obj} from "../common.ts"


/**
 * @param len length of placeholders
 * @returns returns a string with the `len` characters of '?' seperated by ','
 */
function _generate_placeholders(len: number): string {
    let placeholders = []
    for(let i = 0; i < len; i++) {
        placeholders.push("?")
    }
    return placeholders.join(",")

}

/**
 * 
 * @param obj The data to insert into the new row
 * @returns `true` if successful, `false` if not.
 */
export default function insert(obj: Recording_new_row): boolean {
    const {keys, values} = unmap_obj(obj)
    

    const placeholders = _generate_placeholders(keys.length)
    
    try {
        db.prepare(`INSERT INTO Scans(${keys.join(",")}) VALUES (${placeholders})`).run(...values)
    } catch(err) {
        console.log(err)
        return false
    }
    return true
}

export function update(id: number, new_data: Recording_modify_row) {
    const {keys, values} = unmap_obj(new_data)
    
    const placeholders = _generate_placeholders(keys.length)

    const sets_array = []
    for(const key of keys) {
        sets_array.push(`${key} = ?`)
    }
    const sets = sets_array.join(",")

    try {
        db.prepare(`UPDATE Scans SET ${sets} WHERE id = ${id}`).run(...values)
    } catch {
        return false
    }
    return true
}