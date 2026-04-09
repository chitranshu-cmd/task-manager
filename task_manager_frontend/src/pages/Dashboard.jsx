import { useEffect, useState } from "react";
import API from "../api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <h2 className="text-3xl font-bold text-gray-700 mb-6">
        📋 Your Tasks
      </h2>

      {/* Add Task */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-6">
        <TaskForm refresh={fetchTasks} />
      </div>

      {/* Task List */}
      <div className="grid gap-4">
        <TaskList tasks={tasks} refresh={fetchTasks} />
      </div>

    </div>
  );
}