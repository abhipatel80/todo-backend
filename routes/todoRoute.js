import express from 'express';
const router = express();
import todoModel from '../models/todoModel.js';

router.post("/add", async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json("Please fill all data");
        }
        const data = await todoModel.create({ title, description });
        res.status(201).json(data);
    } catch (e) {
        res.status(401).json(e);
    }
});

router.get("/get", async (req, res) => {
    try {
        const data = await todoModel.find();
        res.status(201).json(data);
    } catch (e) {
        res.status(401).json(e);
    }
});

router.get("/get/:id", async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json("Id not found");
        } else {
            const data = await todoModel.findById(req.params.id);
            return res.status(201).json(data);
        }
    } catch (e) {
        res.status(401).json(e);
    }
});

router.put("/edit/:id", async (req, res) => {
    try {
        const data = await todoModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(201).json(data);
    } catch (e) {
        res.status(401).json(e);
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        await todoModel.findByIdAndDelete(req.params.id);
        res.status(201).json("todo deleted");
    } catch (e) {
        res.status(401).json(e);
    }
});

export default router;
