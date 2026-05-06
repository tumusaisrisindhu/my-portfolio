import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Plus, MoreVertical, Check, Pencil, Trash } from "lucide-react";

function TodoPage() {
  const API = "http://localhost:5000/todos";

  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create"); // create | edit | preview
  const [activeTodo, setActiveTodo] = useState(null);

  const [title, setTitle] = useState("");
  const [items, setItems] = useState([]);

  const [menuOpen, setMenuOpen] = useState(null);
  const dropdownRef = useRef(null);

  // 🔄 FETCH
  const fetchTodos = async () => {
    const res = await axios.get(API);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 🧠 OPEN MODAL
  const openModal = (type, todo = null) => {
    setMode(type);
    setActiveTodo(todo);

    if (todo) {
      setTitle(todo.title);
      setItems(todo.items);
    } else {
      setTitle("");
      setItems([{ text: "", completed: false }]);
    }

    setOpen(true);
  };

  // ➕ ADD ITEM
  const addItem = () => {
    setItems([...items, { text: "", completed: false }]);
  };

  // ✏️ UPDATE TEXT
  const updateItem = (i, val) => {
    const updated = [...items];
    updated[i].text = val;
    setItems(updated);
  };

  // ✅ TOGGLE CHECK
  const toggleCheck = (i) => {
    const updated = [...items];
    updated[i].completed = !updated[i].completed;
    setItems(updated);
  };

  // ❌ DELETE ITEM
  const deleteItem = (i) => {
    setItems(items.filter((_, index) => index !== i));
  };

  // 💾 SAVE (CREATE / UPDATE)
  const handleSave = async () => {
    if (mode === "create") {
      await axios.post(API, { title, items });
    } else {
      await axios.put(`${API}/${activeTodo.id}`, { title, items });
    }

    setOpen(false);
    fetchTodos();
  };

  // ❌ DELETE TODO
  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTodos();
  };

  // ✅ MARK ALL COMPLETE
  const markAllComplete = async (todo) => {
    const updatedItems = todo.items.map((i) => ({
      ...i,
      completed: true,
    }));

    await axios.put(`${API}/${todo.id}`, {
      title: todo.title,
      items: updatedItems,
    });

    fetchTodos();
  };

  return (
    <div className="p-10 bg-white dark:bg-black min-h-screen text-black dark:text-white">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-400">Todo List</h1>

        <button
          onClick={() => openModal("create")}
          className="flex items-center gap-2 px-4 py-2 border border-green-400 text-green-400 rounded-md hover:bg-green-400 hover:text-black transition"
        >
          <Plus size={18} /> Add
        </button>
      </div>

      {/* GRID */}
      {todos.length === 0 ? (
        <div className="h-[60vh] flex items-center justify-center">
          <p className="text-gray-500 text-xl">Add your first todo list</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {todos.map((todo) => {
            const allDone = todo.items.every((i) => i.completed);

            return (
              <div
                key={todo.id}
                className={`p-5 rounded-xl border border-gray-300 dark:border-gray-700 shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.08)] relative bg-white dark:bg-black
                ${allDone ? "opacity-60" : ""}`}
              >
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-lg">{todo.title}</h2>
                  <div className="relative">
                    <button onClick={() => setMenuOpen(todo.id)}>
                      <MoreVertical />
                    </button>

                    {menuOpen === todo.id && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-0 mt-2 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md shadow-md z-50 min-w-[180px]"
                      >
                        <button
                          onClick={() => {
                            openModal("edit", todo);
                            setMenuOpen(null);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            openModal("preview", todo);
                            setMenuOpen(null);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          Preview
                        </button>

                        <button
                          onClick={() => {
                            handleDelete(todo.id);
                            setMenuOpen(null);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          Delete
                        </button>

                        <button
                          onClick={() => {
                            markAllComplete(todo);
                            setMenuOpen(null);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          Mark all complete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <hr className="my-2 border-gray-300 dark:border-gray-700" />

                <ul className="mt-3 text-sm">
                  {todo.items.slice(0, 3).map((item, i) => (
                    <li
                      key={i}
                      className={item.completed ? "line-through" : ""}
                    >
                      • {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white dark:bg-black p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl mb-4 font-semibold capitalize">
              {mode} Todo
            </h2>

            <input
              placeholder="Title"
              value={title}
              disabled={mode === "preview"}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-4 p-2 border rounded-md bg-transparent"
            />

            <hr className="mb-4 border-gray-300 dark:border-gray-700" />

            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-2 mb-3">
                {/* CHECKBOX */}
                <input
                  type="checkbox"
                  checked={item.completed}
                  disabled={mode === "preview"}
                  onChange={() => toggleCheck(i)}
                />

                {/* PREVIEW */}
                {mode === "preview" ? (
                  <p
                    className={`flex-1 ${
                      item.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {item.text}
                  </p>
                ) : (
                  <input
                    value={item.text}
                    placeholder="Add a item"
                    onChange={(e) => updateItem(i, e.target.value)}
                    className="flex-1 p-2 border rounded-md bg-transparent"
                  />
                )}

                {/* DELETE */}
                {mode !== "preview" && (
                  <button onClick={() => deleteItem(i)}>
                    <Trash size={16} />
                  </button>
                )}
              </div>
            ))}

            {mode !== "preview" && (
              <button onClick={addItem} className="text-green-400 text-sm mb-4">
                + Add item
              </button>
            )}

            <div className="flex justify-end gap-3">
              <button onClick={() => setOpen(false)}>Close</button>

              {mode === "preview" && (
                <button
                  onClick={() => setMode("edit")}
                  className="px-4 py-2 border rounded-md"
                >
                  Edit
                </button>
              )}

              {mode !== "preview" && (
                <button
                  onClick={handleSave}
                  className="px-4 py-2 border rounded-md hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoPage;
