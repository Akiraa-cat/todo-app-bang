import dbConnect from '../../lib/mongodb';
import mongoose from 'mongoose';

// Schema untuk Todo
const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);

export default async function handler(req, res) {
  await dbConnect();
  
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const todos = await Todo.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: todos });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const todo = await Todo.create(req.body);
        res.status(201).json({ success: true, data: todo });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'PUT':
      try {
        const { id } = req.query;
        const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ success: true, data: todo });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        await Todo.findByIdAndDelete(id);
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: 'Method not allowed' });
      break;
  }
}