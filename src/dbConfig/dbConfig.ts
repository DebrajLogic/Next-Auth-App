import mongoose from "mongoose"

export async function connect(){
    try {
        mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection
        connection.on('connected', ()=>{
            console.log('mongoDB connected!');
            
        })

        connection.on('error', (error)=>{
            console.log('mongoDB connection error!!', error);
            process.exit()
        })
        
    } catch (error) {
        console.log('Error connecting to Database', error);
        
    }
}