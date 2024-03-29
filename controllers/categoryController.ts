import { Request, Response, Router } from "express";
import Category from "../models/category"

const router: Router = Router()

router.post('/category', async (req: Request, res: Response) => {

    try {

        const category = new Category({
            name: req.body.name
        })
        const CategoryToSave = await category.save();
        res.status(200).json(CategoryToSave);

    }
    catch (error) {
        res.status(400).json({ message: error })
    }
})

router.get('/category', async (req: Request, res: Response) => {
    try {
        const data = await Category.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
})

router.get('/category/:id', async (req: Request, res: Response) => {
    try {
        const data = await Category.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
})

router.delete('/category/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await Category.findByIdAndDelete(id);
        const data = await Category.find();
        res.send(data);
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
})

router.put('/category/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Category.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
})


export default router;