import { NextRequest, NextResponse } from 'next/server';
import connectDb from '@/lib/mongodb';
import Expense from '@/models/expenseSchema';

export async function DELETE(req: NextRequest) {
    await connectDb(); // Ensure database connection is awaited
    const search=req.nextUrl.searchParams;
    const id= search.get("id");
    console.log(id); 
    
    try {
        const result = await Expense.findByIdAndDelete(id);
        
        if (!result) {
            return NextResponse.json({ message: 'Expense record not found' }, { status: 404 });
        }
        
        return NextResponse.json({ message: 'Record deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error deleting the record' }, { status: 500 });
    }
}
