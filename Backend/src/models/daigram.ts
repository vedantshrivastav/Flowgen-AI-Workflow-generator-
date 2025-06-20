// models/Diagram.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IDiagram extends Document {
  userId: string;
  prompt: string;
  diagramCode: string;
  createdAt: Date;
}

const DiagramSchema = new Schema<IDiagram>({
  userId: { type: String, required: true },
  prompt: { type: String, required: true },
  diagramCode: { type: String, required: true }, // This is the Mermaid.js code
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Diagram || mongoose.model<IDiagram>('Diagram', DiagramSchema);
