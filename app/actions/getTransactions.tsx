'use server'

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Transaction } from "@/types/Transaction";

async function getTransactions(): Promise<{
    transactions?: Transaction[];
    error?: string;
}>{
    const {userId} = auth();

    if(!userId){
        return {error:'User Not found'}
    }

    try{
        const transactions = await db.transaction.findMany({
            where:{userId},
            orderBy:{
                createdAt:'desc'
            }
        })
        
        
        return {transactions}
    }catch(e){
        return {
            error:'Database error'
        }
    }
}

export default getTransactions