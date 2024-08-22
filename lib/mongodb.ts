import mongoose from 'mongoose';
import 'dotenv/config'
type ConnectionObject={
    isConnected?:number;
}
const connection : ConnectionObject={};//This object will store the connection state to avoid multiple connections

 async function connectDb(): Promise<void> {
    if(connection.isConnected){
        console.log("Already Connected to tue dataBase");
        return;
    }
    try{
       const db= await mongoose.connect("mongodb+srv://ujjawalarora2004:ujjawal123@expense.kzzvfit.mongodb.net/?retryWrites=true&w=majority&appName=expense");
        connection.isConnected=db.connections[0].readyState
        console.log('MongoDB connected...');
    }catch(err){
        console.error('Failed to connect to MongoDB',err);
        
    }
}
// connectDb();
export default connectDb;