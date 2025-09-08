
import reactLogo from "./assets/react.svg";
import "./App.css";
const API_URL = "http://localhost:5000/notes"; 

import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [count, setCount] = useState(0);
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editId, setEditId] = useState(null);

  // Fetch notes
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await axios.get(API_URL);
    setNotes(res.data);
  };

  // Add or Update Note
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return;

    if (editId) {
      await axios.put(`${API_URL}/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({ title: "", content: "" });
    fetchNotes();
  };

  // Delete note
  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchNotes();
  };

  // Edit note
  const handleEdit = (note) => {
    setForm({ title: note.title, content: note.content });
    setEditId(note._id);
  };

  return (
    <div>
 <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">📝 Notes App</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-2xl shadow w-full max-w-md mb-6"
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 mb-3 border rounded"
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full p-2 mb-3 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          {editId ? "Update Note" : "Add Note"}
        </button>
      </form>

      {/* Notes List */}
      <div className="grid gap-4 w-full max-w-md">
        {notes.map((note) => (
          <div
            key={note._id}
            className="bg-white p-4 rounded-2xl shadow flex flex-col"
          >
            <h2 className="text-lg font-semibold">{note.title}</h2>
            <p className="text-gray-600">{note.content}</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(note)}
                className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(note._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default App;