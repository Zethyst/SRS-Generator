const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://zethyst:akshat2002@cluster0.wdelwkx.mongodb.net/SRS";

const connectToMongo = async () => {
    try {
       await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
     });
        console.log("[+] Connected to MongoDB Successfully");
    }
    catch (error) {
        console.error(error);
    }
}
module.exports = connectToMongo;