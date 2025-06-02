import express from "express";
import db from "../firebaseService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const docRef = await db.collection("products").add(data);
    res.status(201).json({ id: docRef.id, ...data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("products").get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
