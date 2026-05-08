const BASE_URL = "http://127.0.0.1:5000/api/tic-tac-toe";

export async function getGameState() {
  const response = await fetch(`${BASE_URL}/state`);
  return response.json();
}

export async function makeMove(index) {
  const response = await fetch(`${BASE_URL}/move`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ index }),
  });

  return response.json();
}

export async function resetGame() {
  const response = await fetch(`${BASE_URL}/reset`, {
    method: "POST",
  });

  return response.json();
}

export async function updatePlayer(symbol, name) {
  const response = await fetch(`${BASE_URL}/player`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      symbol,
      name,
    }),
  });

  return response.json();
}
