import { NextRequest, NextResponse } from 'next/server';
import connectDb from '@/lib/mongodb';
import IncomeSchema from '@/models/incomeSchema';
export async function GET() {
    await connectDb();
try{
    const res= await IncomeSchema.find().sort({createdAt:-1});
    return NextResponse.json(res,{status:202});
}    catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server Error' },{status:500});
}
}