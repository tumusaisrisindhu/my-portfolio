import { useEffect, useState } from "react";

import Board from "./components/Board";
import PlayerCard from "./components/PlayerCard";
import WinnerModal from "./components/WinnerModal";

import { getGameState, makeMove, resetGame, updatePlayer } from "./api";

function TicTacToePage() {
  const [game, setGame] = useState(null);

  async function loadGame() {
    const data = await getGameState();
    setGame(data);
  }

  useEffect(() => {
    loadGame();
  }, []);

  async function handleSquareClick(index) {
    const data = await makeMove(index);
    setGame(data);
  }

  async function handleReset() {
    const data = await resetGame();
    setGame(data);
  }

  async function handlePlayerUpdate(symbol, name) {
    const data = await updatePlayer(symbol, name);
    setGame(data);
  }

  if (!game) {
    return null;
  }

  return (
    <div
      className="
        min-h-screen
        bg-white
        px-6 py-10
        text-black
        transition-colors
        dark:bg-[#0a0a0a]
        dark:text-white
      "
    >
      <div className="mx-auto max-w-4xl">
        <h1
          className="
            mb-10 text-center
            text-5xl font-bold
            text-green-400
          "
        >
          Tic Tac Toe
        </h1>

        <div className="mb-10 grid gap-4 md:grid-cols-2">
          <PlayerCard
            symbol="X"
            playerName={game.players.X}
            active={game.current_player === "X"}
            onSave={handlePlayerUpdate}
          />

          <PlayerCard
            symbol="O"
            playerName={game.players.O}
            active={game.current_player === "O"}
            onSave={handlePlayerUpdate}
          />
        </div>

        <div className="flex justify-center">
          <Board board={game.board} onSquareClick={handleSquareClick} />
        </div>

        <div className="mt-10 text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Current Turn:
            <span className="ml-2 text-green-400">
              {game.players[game.current_player]}
            </span>
          </p>

          <button
            onClick={handleReset}
            className="
              h-20
              w-30
              rounded-2xl
              border
              border-black/10
              bg-black/5
              text-2xl
              font-bold
              text-green-400
              backdrop-blur-lg
              transition-all
              hover:bg-black/10
              dark:border-white/10
              dark:bg-white/5
              dark:hover:bg-white/10
            "
          >
            Reset Game
          </button>
        </div>
      </div>

      {(game.winner || game.is_tie) && (
        <WinnerModal
          winner={game.winner}
          isTie={game.is_tie}
          playerName={game.players[game.winner]}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

export default TicTacToePage;
