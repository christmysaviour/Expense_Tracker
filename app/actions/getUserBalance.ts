'use server'

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

async function getUserBalance(): Promise<{
    balance?:number;
    error?: string;
}>{
    const {userId} = auth();

    if(!userId){
        return {error:'User Not found'}
    }

    try{
        const transaction = await db.transaction.findMany({
            where:{userId}
        })
        const balance =transaction.reduce(
            (sum,transaction) => sum+transaction.amount,0
        )
        return {balance}
    }catch(e){
        return {
            error:'Database error'
        }
    }
}

export default getUserBalance