const mongoose =  require("mongoose")

async function Connect (){
    try{
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Database Sucessfully Connected ")
    }

    catch(err){
        console.log(err)
        throw err
    }   
}

module.exports = Connect;