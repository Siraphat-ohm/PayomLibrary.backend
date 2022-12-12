import { Request, Response } from "express";
import { Book } from "../entity/Book";
import fs from 'fs';


const handleUpload = async(req:Request, res:Response, next:Function) => {

    const { title, category_id, copies_owned, publication_year, edition } = req.body;
    
    const file = fs.readFileSync("./uploads/" + req.file.filename);
    try {
        await Book.insert({
            title : title,
            category_id : category_id,
            copies_owned : copies_owned,
            publication_year : publication_year,
            edition : edition,
            graphic : file
        })
        fs.unlinkSync("./uploads/" + req.file.filename)
        res.json({"message": "create success"});
    } catch (error) {
        console.error(error.message);
        res.sendStatus(400);
    }
}

export default { handleUpload }