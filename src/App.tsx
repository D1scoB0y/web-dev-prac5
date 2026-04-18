import { useState, useEffect } from "react";

type Status = 'To Do' | 'In Progress' | 'Done';

interface Task {
  id: string;
  title: string;
  deadline: string;
  status: Status;
}

const App = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!title.trim() || !deadline) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      deadline,
      status: 'To Do',
    };

    setTasks([...tasks, newTask]);
    setTitle('');
    setDeadline('');
  };

  return (
      <div className="min-h-screen p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800">Менеджер задач</h1>

          <form onSubmit={addTask} className="bg-white p-4 rounded-lg mb-6">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Название задачи"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Добавить
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default App
