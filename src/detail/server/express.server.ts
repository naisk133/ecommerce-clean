import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { ProductService } from "../../policy/product/product.service";

const productService = new ProductService();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/products", (req: Request, res: Response) => {
  res.json(productService.listProducts());
});

app.post("/products", bodyParser.json(), (req: Request, res: Response) => {
  const product = productService.createProduct(req.body);
  res.json(product);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
