import express from 'express';
import Todo from '../models/todoModel.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await Todo.find();
    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Failed to retrieve todos' });
  }
});

router.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    const newTodo = new Todo({ name });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, { name }, { new: true });   
    
    if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found'});
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).json({ error: 'Failed to update todo' });    
  }

});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

export default router;
