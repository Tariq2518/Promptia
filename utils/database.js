import mongoose from "mongoose";

let isConnected = false; //track the connection of database

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);
    if(isConnected){
        return;
    }

    try{

        await mongoose.connect(process.env.MONGODB_URI, {
           dbName: "promptiadb",
           useNewUrlParser: true,
        });
        console.log("Connected to database");
        isConnected = true;

    }catch(error){
        console.log(error);
    }

}