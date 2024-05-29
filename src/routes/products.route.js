import fs from "fs"
import { Router } from "express";

const routeProducts = Router()

const products = JSON.parse(fs.readFileSync('./db/products.json', 'utf-8'));

//MAIN GET

routeProducts.get("/", (res, req) =>{
    res.json(products);
});

//ID GET

routeProducts.get("/:prodId", async (req, res) => {
    const { prodId } = req.params;
    const product = await products.find(product => product.id === prodId);

    if(!product) {
        res.send(`The product associated to id:${prodId} could not be found.`)
    } else {
        res.json(product)
    }
})

//POST - NEW PRODUCT

routeProducts.post("/", (res, req) =>{
    const { title, description, price, thumbnail, code, stock, status, category } = req.body;

    if( !title || !description || !price || !thumbnail || !code || !stock || !status || !category) {
        return res.send("An error occured while trying to add a new product.")
    } else {
        const addProduct = {
            id: 0,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            status: status,
            category: category,
        }
        products.push(addProduct);
        fs.writeFileSync("./db/products.json", JSON.stringify(products, null, "\t"));
    }
    res.json(products);
});

//PUT

routeProducts.put("/:prodId", (req, res) => {
    const {prodId} = req.params;
    const { title, description, price, thumbnail, code, stock, status, category } = req.body;

    if(!title || !description || !price || !thumbnail || !code || !stock || !status || !category) {
        return res.send(`The product associated to id:${prodId} could not be found.`)
    } else {
        const product = products.find(product => product.id === prodId);

        if(!product) {
            res.send(`The product associated to id:${prodId} could not be found.`)
        } else {
            product.title = title;
            product.description = description;
            product.code = code;
            product.price = price;
            product.stock = stock;
            product.category = category;
            fs.writeFileSync('./data/products.json', JSON.stringify(products, null, '\t'));
            res.json(product);
        }
    }
});

//DELETE

routeProducts.delete("/:prodId", async (res, req) => {
    const { prodId } = req.params;
    const delProd = products
    const productIndex = products.findIndex(product => product.id === prodId);

    if(productIndex === -1){
        delProd.splice(productIndex, 1)
        fs.writeFileSync('./data/products.json', JSON.stringify(products, null, '\t'));
    } else {
        res.send("The product could not be found.")
    }
})


export default routeProducts