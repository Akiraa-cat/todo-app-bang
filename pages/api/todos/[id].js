import dbConnect from '../../../lib/mongodb';
import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  createdAt: { type: Date, default: Date.now },
});

const Todo = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);

export default async function handler(req, res) {
  await dbConnect();
  
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'PUT':
      try {
        const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
        if (!todo) {
          return res.status(404).json({ success: false, message: 'Todo not found' });
        }
        res.status(200).json({ success: true, data: todo });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
          return res.status(404).json({ success: false, message: 'Todo not found' });
        }
        res.status(200).json({ success: true, message: 'Todo deleted' });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}