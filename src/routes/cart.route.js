import fs from "fs"
import { Router } from "express";

const routeCart = Router();

//MAIN POST

const products = JSON.parse(fs.readFileSync("./db/products.json", "utf-8"));
const cart = JSON.parse(fs.readFileSync("./db/cart.json", "utf-8"));

routeCart.post("/", (req, res) => {
    const cartId = cart[cart.length - 1].id + 1;
    const cartCreated = { id: cartId, products: []
    };
    cart.push(cartCreated);
    fs.writeFileSync("./db/cart.json", JSON.stringify(cart, null, "\t"));
    res.json(cart);
});

//POST

routeCart.post("/:cartId/products/:prodId", (req, res) =>{
    const { prodId, cartId } = req.params;
    const cartCreated = cart.find(cartCreated => cartCreated.id === cartId);
    const product = products.find(product => product.id === prodId);
    const currentlyAdded = cartCreated.products.find(product => product.product === prodId);

    if (cartId > cart[cartCreated.length - 1].id || cartId < 1 || !cartCreated) {
        res.send(`The product linked to id: ${prodId} could not be found.`)
    } else if (!product) {
        res.send(`The product linked to id: ${prodId} does not exist.`)
    } else {
        try {
            if (currentlyAdded) {
                currentlyAdded.quantity += 1;
            } else {
                cartCreated.products.push({ product: product.id, quantity: 1});
            }

            fs.writeFileSync("./db/cart.json", JSON.stringify(cart, null, "\t"));
            res.json(cartCreated);
        } catch {
            res.send(`The cart content could not be updated`)
        }
    }
});

//GET

routeCart.get("/cartId", (req, res) =>{
    const { cartId } = req.params;

    const carts = cart.find(carts => carts.id === cartId);

    if ( cartId > cart[cart.length - 1].id || cartId < 1 || !cart) {
        res.send(`The product linked to id: ${cartId} is not currently added to the cart.`)
    } else {
        res.json(carts);
    }
});

export default routeCart



