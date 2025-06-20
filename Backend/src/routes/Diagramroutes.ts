// routes/diagramRoute.ts (or inside your main route handler)
import express from 'express';
import Diagram from '../models/daigram';
import connectDB from '../server';
import { Request, Response } from 'express';

const router = express.Router();

router.post('/save-diagram', async (req : Request, res: Response) : Promise<void> => {
  const { userId, prompt, diagramCode } = req.body;

  if (!userId || !prompt || !diagramCode) {
    res.status(400).json({ error: 'Missing fields' });
    return
  }

  await connectDB();

  try {
    const newDiagram = await Diagram.create({ userId, prompt, diagramCode });
    res.status(201).json(newDiagram);
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({ error: 'Failed to save diagram' });
  }
});

router.get('/get-diagrams/:userId', async (req, res)  : Promise<void> => {
    const { userId } = req.params;
  
    if (!userId) {
        res.status(400).json({ error: "Missing userId" });
        return
    } 
  
    await connectDB();
  
    try {
      const diagrams = await Diagram.find({ userId }).sort({ createdAt: -1 });
      res.status(200).json(diagrams);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch diagrams" });
    }
  });
  

export default router;
