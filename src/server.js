import express from "express"
import routeProducts  from "./routes/products.route.js"
import routeCart  from "./routes/cart.route.js"
const app = express();

const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(PORT, () => {
    console.log(`Server listening port http://localhost:${PORT}`)
});

app.use("/products", routeProducts);

app.use("/cart", routeCart);

