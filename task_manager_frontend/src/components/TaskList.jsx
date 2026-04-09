import { useState } from "react";
import API from "../api";

export default function TaskList({ tasks, refresh }) {
  const [editId, setEditId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    refresh();
  };

  const startEdit = (task) => {
    setEditId(task._id);
    setNewTitle(task.title);
  };

  const updateTask = async (id) => {
    await API.put(`/tasks/${id}`, { title: newTitle });
    setEditId(null);
    setNewTitle("");
    refresh();
  };

  return (
    <>
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-white p-4 rounded-xl shadow flex justify-between items-center hover:shadow-lg transition"
        >
          {editId === task._id ? (
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border p-2 rounded-lg flex-1 mr-3"
            />
          ) : (
            <span className="text-gray-700 font-medium">
              {task.title}
            </span>
          )}

          <div className="flex gap-2">
            {editId === task._id ? (
              <button
                onClick={() => updateTask(task._id)}
                className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => startEdit(task)}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
              >
                Edit
              </button>
            )}

            <button
              onClick={() => deleteTask(task._id)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}