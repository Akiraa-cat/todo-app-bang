import { useState } from 'react';
import { Check, Edit2, Trash2, X, Save } from 'lucide-react';

export default function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const handleToggleComplete = () => {
    onUpdate(todo._id, { ...todo, completed: !todo.completed });
  };

  const handleSaveEdit = () => {
    onUpdate(todo._id, {
      ...todo,
      title: editTitle.trim(),
      description: editDescription.trim(),
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  return (
    <div className={`bg-dark-800 border-l-4 ${getPriorityColor(todo.priority)} p-4 rounded-r-lg border border-dark-600 mb-3 transition-all hover:bg-dark-750`}>
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full p-2 bg-dark-700 border border-dark-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            rows={2}
            className="w-full p-2 bg-dark-700 border border-dark-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSaveEdit}
              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm flex items-center gap-1"
            >
              <Save size={16} /> Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm flex items-center gap-1"
            >
              <X size={16} /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={handleToggleComplete}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  todo.completed
                    ? 'bg-green-600 border-green-600'
                    : 'border-dark-400 hover:border-green-500'
                }`}
              >
                {todo.completed && <Check size={16} className="text-white" />}
              </button>
              
              <h3 className={`font-medium ${todo.completed ? 'line-through text-dark-400' : 'text-white'}`}>
                {todo.title}
              </h3>
              
              <span className={`px-2 py-1 text-xs rounded-full ${
                todo.priority === 'high' ? 'bg-red-900 text-red-200' :
                todo.priority === 'medium' ? 'bg-yellow-900 text-yellow-200' :
                'bg-green-900 text-green-200'
              }`}>
                {todo.priority}
              </span>
            </div>
            
            {todo.description && (
              <p className={`text-sm ml-9 ${todo.completed ? 'text-dark-500' : 'text-dark-300'}`}>
                {todo.description}
              </p>
            )}
          </div>
          
          <div className="flex gap-2 ml-4">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-dark-400 hover:text-blue-400 hover:bg-dark-700 rounded transition-colors"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(todo._id)}
              className="p-2 text-dark-400 hover:text-red-400 hover:bg-dark-700 rounded transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}