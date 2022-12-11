import { Request, Response } from "express";
import { Book } from "../entity/Book";
import fs from 'fs';


const handleUpload = async(req:Request, res:Response, next:Function) => {

    let obj = {
        id : req.body.id,
        title : req.body.title,
        category_id : req.body.category_id,
        publication_date : req.body.publication_date,
        copies_own : req.body.copies_own,
        graphic : req.files || req.file
    }

    const file = fs.readFileSync("./uploads/" + req.file.filename);
    
     try {
         await Book.insert({
            title: req.body.title,
            category_id : req.body.category_id,
            publication_date : req.body.publication_date,
            copies_owned : req.body.copies_owned,
            graphic : file
         });
         res.send(req.file.filename);
     } catch (error) {
         console.error(error);
         res.sendStatus(400);
         next(error);
     }

}

export default { handleUpload }