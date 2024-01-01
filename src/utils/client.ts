import { PrismaClient } from "@prisma/client";
import { ApiError } from "./common/ApiError";
import { HttpStatus } from "./common/HttpStatusCode";

const handleDatabaseError = async( model:any, query:any, args:any ) => {
    try {
        return await query(args);
    } catch (error: any) {
        if ( error.code == 'P2025' || error.code == 'P2003' ) {
            throw new ApiError( 'Not Found.', HttpStatus.NOT_FOUND, `${model} Not Found.` );
        };
        if ( error.code == 'P2002' ) {
            throw new ApiError( 'Not Found.', HttpStatus.BAD_REQUEST, `${model} Already Exists.` );
        }
        throw error;
    }
}

const prisma = (new PrismaClient()).$extends({
    query: {
        $allModels: {
            async findFirstOrThrow({ model, query, args }){
                return await handleDatabaseError( model, query, args );
            },
            async findUniqueOrThrow({ model, query, args }){
                args = { ...args }
                return await handleDatabaseError( model, query, args );
            },
            async createMany( { model, query, args }) {
                return await handleDatabaseError( model, query, args );
            },
            async create( { model, query, args }) {
                return await handleDatabaseError( model, query, args );
            },
        },
    }
});

export default prisma;