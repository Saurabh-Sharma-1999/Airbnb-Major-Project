const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main().then(() => {
    console.log("Connection establish successfully.");
}).catch((err) => {
    console.log(err);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust1");
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data =  initData.data.map((obj) => ({...obj, owner: "65e9d2d42a2c480572a227b8"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
}
initDB();