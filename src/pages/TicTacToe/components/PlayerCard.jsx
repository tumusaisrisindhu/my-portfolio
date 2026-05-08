import { useState } from "react";
import { FaEdit } from "react-icons/fa";

function PlayerCard({ symbol, playerName, onSave, active }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(playerName);

  const handleSave = async () => {
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

    await onSave(symbol, formattedName);

    setEditing(false);
  };

  return (
    <div
      className={`
        flex items-center justify-between
        rounded-2xl border p-4
        backdrop-blur-lg
        ${
          active
            ? "border-green-400 bg-green-400/10"
            : "border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5"
        }
      `}
    >
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Player {symbol}
        </p>

        {editing ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="
              mt-1 rounded-lg
              bg-black/30 px-2 py-1
              outline-none
            "
          />
        ) : (
          <h2 className="text-xl font-bold">{playerName}</h2>
        )}
      </div>

      {editing ? (
        <button
          onClick={handleSave}
          className="
            rounded-lg bg-green-400
            px-3 py-1 text-black
          "
        >
          Save
        </button>
      ) : (
        <button onClick={() => setEditing(true)} className="text-green-400">
          <FaEdit />
        </button>
      )}
    </div>
  );
}

export default PlayerCard;
