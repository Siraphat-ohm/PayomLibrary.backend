import { Router } from "express";
import verifyRoles from "../middleware/verifyRole";
import roles from "../config/roles.json"
import { Book } from "../entity/Book";

const router = Router()

router.post('/', verifyRoles( roles.libralian ), async ( req , res , next ) => {
    try {
        res.json( await Book.create( req.body ).save() )
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async ( req , res , next ) => {
    try {
        res.json(
            await Book.findOneOrFail({
                where : {
                    id : req.params.id
                }
            })
        )
    } catch (err) {
        next(err)
    }
})

router.get('/', async ( req , res , next ) => {
    try {
        res.json(
            await Book.find()
        )
    } catch (err) {
        next(err)
    }
})

export default router