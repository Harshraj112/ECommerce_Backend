import mongoose from 'mongoose';

const dbConnect = async ()=> {              //async makes the function return a promise, even if you return a value directly.
    try {
        mongoose.set("strictQuery", true);      //Allow searching using fields that are not in the schema.
        const connected = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongodb connected ${connected.connection.host}`);  //Pauses execution until a Promise is resolved.
    } catch (error) {                       //if there was an error (e.g., dividing by zero, file not found, database issue), the app won’t crash
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default dbConnect;
