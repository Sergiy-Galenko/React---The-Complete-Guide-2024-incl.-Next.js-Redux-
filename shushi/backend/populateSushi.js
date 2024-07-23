const mongoose = require("mongoose");
const Sushi = require("./models/Sushi");

mongoose.connect(
    "mongodb+srv://sgalenko783:Pass123@shushi.s3smedv.mongodb.net/shushi?retryWrites=true&w=majority&appName=shushi",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const sushiData = [
    {
        id: "1",
        title: "Classic Sushi",
        describe: "Traditional sushi with fresh fish and rice.",
        price: 12.99,
        img: "https://allolosos.com.ua/i/products/6329741d73578.jpg",
        type: "regular",
    },
    {
        id: "2",
        title: "Sushi Set A",
        describe: "A set of different sushi pieces.",
        price: 24.99,
        img: "https://via.placeholder.com/150?text=Sushi+Set+A",
        type: "set",
    },
    {
        id: "3",
        title: "Vegetarian Sushi",
        describe: "Sushi with fresh vegetables.",
        price: 10.99,
        img: "https://via.placeholder.com/150?text=Vegetarian+Sushi",
        type: "regular",
    },
    {
        id: "4",
        title: "Deluxe Sushi Set",
        describe: "A deluxe set with premium sushi pieces.",
        price: 34.99,
        img: "https://via.placeholder.com/150?text=Deluxe+Sushi+Set",
        type: "set",
    },
];

Sushi.insertMany(sushiData)
    .then(() => {
        console.log("Sushi data inserted successfully");
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error("Error inserting sushi data:", error);
        mongoose.connection.close();
    });
