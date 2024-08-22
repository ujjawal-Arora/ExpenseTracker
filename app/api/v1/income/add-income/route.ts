import { NextRequest, NextResponse } from 'next/server';
import connectDb from '@/lib/mongodb';
import Income from '@/models/incomeSchema'; // Adjusted import

export async function POST(req: NextRequest) {
    await connectDb(); // Ensure database connection is awaited
    try {
        const body = await req.json();
        const result = await Income.create(body); // Use create method directly on the model
        if(body.title==""||body.category==""||body.description==""||body.amount==""){
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
        }
        if(body.amount<=0){
            NextResponse.json({ message: 'Amount cant be null or in Negative' }, { status: 400 });
        }
        return NextResponse.json({ message: 'Income record created successfully', income: result }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error in saving the data' }, { status: 400 });
    }
}
