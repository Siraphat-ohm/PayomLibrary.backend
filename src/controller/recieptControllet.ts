import { Request, Response } from "express";
import { Loan } from "../entity/Loan";
import { Order } from "../entity/Order";


const getRecieptAll = async( req: Request, res: Response, next: Function) => {
    try {
        
        let data:any = await Loan.find( {
                select: {
                    expectDate: true,
                    loanDate: true,
                    order: {
                        books: {
                            title: true
                        },
                        user: {
                            email: true
                        }
                    }
                },
                where: {
                    order: {
                        approve: true
                    }
                },
            })
        data = data.map( (item) => {
            return {
                id: item.order.id,
                expectDate: item.expectDate,
                loanDate: item.loanDate,
                title: item.order.books.map((item) => item.title),
                user: item.order.user.email
            }
        })
        res.json(data)
    } catch (error) {
        res.sendStatus(404);
    }
}

const handleReciept = async(req: Request, res: Response, next: Function) => {
    console.log(req.params.id);
    
    try {
        const order = await Order.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(
            await order.DoDiscard()
        );
    } catch (error) {
        console.log(error);
        res.status(404);
    }
}

export default { getRecieptAll, handleReciept }