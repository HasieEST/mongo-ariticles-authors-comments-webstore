import { Request, Response, Router } from "express";
import Product from "../models/product"

const router: Router = Router()

router.post('/product', async (req: Request, res: Response) => {
    try {

        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            active: req.body.active,
            stock: req.body.stock,
            created: new Date(),
            category: req.body.category
        })
        const ProductToSave = await product.save();
        res.status(200).json(ProductToSave);

    }
    catch (error) {
        res.status(400).json({ message: error })
    }
})

router.get('/product', async (req: Request, res: Response) => {
    try {
        const data = await Product.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
})

router.get('/product/:id', async (req: Request, res: Response) => {
    try {
        const data = await Product.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
})

router.delete('/product/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await Product.findByIdAndDelete(id);
        const data = await Product.find();
        res.send(data);
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
})

router.put('/product/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Product.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
})

export default router;