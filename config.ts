
export const DEV_MODE = true;
// if in developer mode, it will put the database in the same directory as the main file.
// if not, it will place it in $HOME
export const DB_PATH = DEV_MODE ? import.meta.dirname + "/scans.db" : process.env["HOME"] + "/.relay_scans.db";