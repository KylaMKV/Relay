import express, {type Express, type Request, type Response} from "express";

const site = express()

site.get("/", (req: Request, res: Response) => {
})

site.listen(8080, () => {
    console.log("Ready at http://127.0.0.1:8080")
})