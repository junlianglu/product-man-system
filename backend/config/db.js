import mongoose from "mongoose";
const mogoDB = async () => {
    try{
        const connObj = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`OK, mogoDB connect successfully: ${connObj.connection.host}`);
    }
    catch(err){
        console.error(`Error, connect to mogoDB fail: ${err.message}`)
        process.exit(1);
    }
};
export default mogoDB;