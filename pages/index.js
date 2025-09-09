import { useState, useEffect } from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { CheckSquare } from 'lucide-react';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const res = await fetch('/api/todos');
      const data = await res.json();
      if (data.success) {
        setTodos(data.data);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add todo
  const addTodo = async (todoData) => {
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData),
      });
      const data = await res.json();
      if (data.success) {
        setTodos([data.data, ...todos]);
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Update todo
  const updateTodo = async (id, updatedData) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      if (data.success) {
        setTodos(todos.map(todo => todo._id === id ? data.data : todo));
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setTodos(todos.filter(todo => todo._id !== id));
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const completedTodos = todos.filter(todo => todo.completed).length;
  const totalTodos = todos.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckSquare size={32} className="text-blue-500" />
            <h1 className="text-4xl font-bold text-white">Task Manager</h1>
          </div>
          <p className="text-dark-300">Stay organized and productive</p>
          
          {/* Stats */}
          <div className="flex justify-center gap-6 mt-6">
            <div className="bg-dark-800 px-4 py-2 rounded-lg border border-dark-600">
              <div className="text-2xl font-bold text-white">{totalTodos}</div>
              <div className="text-sm text-dark-400">Total Tasks</div>
            </div>
            <div className="bg-dark-800 px-4 py-2 rounded-lg border border-dark-600">
              <div className="text-2xl font-bold text-green-400">{completedTodos}</div>
              <div className="text-sm text-dark-400">Completed</div>
            </div>
            <div className="bg-dark-800 px-4 py-2 rounded-lg border border-dark-600">
              <div className="text-2xl font-bold text-yellow-400">{totalTodos - completedTodos}</div>
              <div className="text-sm text-dark-400">Pending</div>
            </div>
          </div>
        </div>

        {/* Add Todo Form */}
        <TodoForm onAdd={addTodo} />

        {/* Todo List */}
        <TodoList 
          todos={todos} 
          onUpdate={updateTodo} 
          onDelete={deleteTodo} 
        />
      </div>
    </div>
  );
}