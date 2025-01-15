const express = require('express');
const app = express();

// ------------------Question 1-------------------
app.get('/greeting/:username', (req, res) => {
    const username = req.params.username;
    res.send(`Hello there, ${username}!`);
});

// ------------------Question 2-------------------
app.get('/roll/:number', (req, res) => {
    const number = Number(req.params.number);

    // Validate that the parameter using a number
    if (number > 0) {
        const roll = Math.floor(Math.random() * (number + 1));
        res.send(`You rolled a ${roll}.`);
    }
    else {
        return res.send('You must specify a number.');
    }
});

// ------------------Question 3-------------------
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:number', (req, res) => {
    const number = Number(req.params.number);
    if (number <= collectibles.length) {
        const name = collectibles[number].name;
        const price = collectibles[number].price
        res.send(`So, you want the <b> ${name} </b>? For <b> ${price} </b>, it can be yours!`);
    }
    else {
        res.send("This item is not yet in stock. Check back soon!")
    }
});
// ------------------Question 4-------------------
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    const minPrice = Number(req.query.minPrice);
    const maxPrice = Number(req.query.maxPrice);
    const type = req.query.type;

    let filterShoes = shoes;
    if (minPrice) {
        filterShoes = filterShoes.filter(shoe => shoe.price >= minPrice);
    }
    if (maxPrice) {
        filterShoes = filterShoes.filter(shoe => shoe.price <= maxPrice);
    }
    if (type) {
        filterShoes = filterShoes.filter(shoe => shoe.type === type);
    }


    if (filterShoes.length > 0) {
        let text = "";
        for (let i = 0; i < filterShoes.length; i++) {
            const shoe = filterShoes[i];
            text +=` <p>Shoe Name: ${shoe.name} <br> Price: $${shoe.price} <br> Type: ${shoe.type}</p>` ;
        }
        res.send(text);
    } else {
        res.send('No shoes found based on the provided filters');
    }
})
app.listen(3010);