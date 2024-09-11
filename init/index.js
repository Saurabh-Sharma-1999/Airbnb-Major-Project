if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const dbUrl = process.env.ATLASDB_URL;
// const dbUrl = "mongodb://127.0.0.1:27017/wanderlust1"


main().then(() => {
    console.log("Connection establish successfully.");
}).catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect(dbUrl);
}
 
let categoryAll = [
    "Beachfront",
    "Cabins",
    "Omg",
    "Lake",
    "Design",
    "Amazing Pools",
    "Farms",
    "Amazing Views",
    "Rooms",
    "Lakefront",
    "Tiny Homes",
    "Countryside",
    "Treehouse",
    "Trending",
    "Tropical",
    "National Parks",
    "Casties",
    "Camping",
    "Top Of The World",
    "Luxe",
    "Iconic Cities",
    "Earth Homes",
];



const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "65e9d2d42a2c480572a227b8",
        price: obj.price * 25,
        category: [
            `${categoryAll[Math.floor(Math.random() * 22)]}`,
            `${categoryAll[Math.floor(Math.random() * 22)]}`,
        ],



    }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
}
initDB();