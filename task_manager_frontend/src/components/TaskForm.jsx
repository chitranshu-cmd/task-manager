import { useState } from "react";
import API from "../api";

export default function TaskForm({ refresh }) {
  const [title, setTitle] = useState("");

  const addTask = async () => {
    if (!title) return;
    await API.post("/tasks", { title });
    setTitle("");
    refresh();
  };

  return (
    <div className="flex gap-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter new task..."
        className="flex-1 border p-2 rounded-lg outline-none focus:ring-2 focus:ring-purple-400"
      />

      <button
        onClick={addTask}
        className="bg-purple-600 text-white px-4 rounded-lg hover:bg-purple-700 transition"
      >
        Add
      </button>
    </div>
  );
}