import mongoose, { Schema, Document } from 'mongoose';

interface IIncome extends Document {
    title: string;
    amount: number;
    type: string;
    date: Date;
    category: string;
    description?: string;
}

const IncomeSchema:Schema = new Schema({
       title:{
        type: String,
        required: true,
        trim:true,
       },
       amount:{
        type: Number,
         required: true,
         maxLength:20,
         trim:true,
       },
       type:{
        type: String,
        default:"income",
        trim:true,
       },
       date:{
        type: Date,
        default:Date.now(),
        trim:true,
       },
       category:{
        type:String,
        required: true,
        trim:true,
       },
       description:{
        type: String,
        maxLength: 200,
        trim:true,
       }
},{timestamps:true})
const Income = mongoose.models.Income || mongoose.model<IIncome>('Income', IncomeSchema);

export default Income;