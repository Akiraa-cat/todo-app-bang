import TodoItem from './TodoItem';

export default function TodoList({ todos, onUpdate, onDelete }) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-dark-400 text-lg mb-2">No tasks yet</div>
        <div className="text-dark-500 text-sm">Add a task above to get started!</div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}