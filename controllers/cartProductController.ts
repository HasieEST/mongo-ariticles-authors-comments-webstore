import { Request, Response, Router } from "express";
import CartProduct from "../models/cartProduct"

const router: Router = Router()

router.post('/cartProduct', async (req: Request, res: Response) => {

    try {

        const cartProduct = new CartProduct({
            product: req.body.product,
            quantity: req. body.quantity
        })
        const CartProductToSave = await cartProduct.save();
        res.status(200).json(CartProductToSave);

    }
    catch (error) {
        res.status(400).json({ message: error })
    }
})

router.get('/cartProduct', async (req: Request, res: Response) => {
    try {
        const data = await CartProduct.find().populate('product');
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
})

router.get('/cartProduct/:id', async (req: Request, res: Response) => {
    try {
        const data = await CartProduct.findById(req.params.id).populate('product');
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
})

router.delete('/cartProduct/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await CartProduct.findByIdAndDelete(id);
        const data = await CartProduct.find();
        res.send(data);
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
})

router.put('/cartProduct/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await CartProduct.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
})


export default router;