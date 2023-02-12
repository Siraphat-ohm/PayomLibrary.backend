import { Request, Response } from "express";
import { MoreThanOrEqual } from "typeorm";
import { Book } from "../entity/Book";
import { Order } from "../entity/Order";
import { User } from "../entity/User";


const getAllOrder = async( req:Request , res:Response , next ) => {
    try {
        let data:any = await Order.find({ select:
                                    {
                                        id: true,
                                        books: {
                                            title: true,
                                            ISBN: true
                                        },
                                        user: {
                                            email: true
                                        }
                                    },
                                relations: {
                                    books: true,
                                    user: true
                                },
                                            where: {
                                                approve: false
                                            }
                            },)
        data = data.map(item => {
            return { 
                id: item.id,
                title: item.books.map( book => book.title),
                ISBN: item.books.map( book => book.ISBN),
                amount: item.books.length,
                user: item.user.email
            }
        })
        res.json(data);
    } catch (err) {
        console.log(err);
        next(err)
    }
}

const getOrder = async( req: Request, res: Response, next: Function ) => {
    try {
        const order = await Order.find({
            where : {
                user : {
                    id : req.userId 
                }
            }
        })

        res.json(
            order
        )

    } catch (err) {
        next(err)
    }
} 

const getOrderById = async( req: Request, res: Response, next: Function ) => {
    try {
        const order = Order.findOne({
            where : {
                user : {
                    id : req.userId
                } ,
                id : req.params.id
            }
        })
        if (!order) {
            return res.status(404).json({
                "message" : "Not Found"
            })
        }

        res.json(
            order
        )

    } catch (err) {
        next(err)
    }
}

const handleOrder = async( req: Request, res: Response, next:Function) => {
    try {

    const books = []
    
    try {
    for (let order of req.body){
            const book = await Book.findOneOrFail({ where : { id:order.id, copies: MoreThanOrEqual(order.quantity) }})
            books.push([book, order.quantity]);
    }
    } catch (error) {
        console.log(error);
    }

    for (let book of books){
        book[0].copies -= book[1];
        await Book.save(book[0]);
    }

    const user = await User.findOne({ where : {id:req.userId} })

    const order = new Order();
    order.books = books.map( item => item[0]);
    order.user = user;
    await Order.save(order)

    res.json(order);

    } catch (err) {
        console.log(err);
        next(err);
    }
}

const handleApprove = async( req: Request, res: Response, next: Function ) => {
    try {

        const order = await Order.findOne({ where: { id: req.params.id } });

        if (!order) {
            res.status(404).json({
                message : "notfound"
            })
        }

        res.json(
            await order.DoApprove(req.userId)
        ) 

    } catch (err) {
        next(err)
    }

}

export default { getAllOrder, getOrder, getOrderById, handleApprove, handleOrder };