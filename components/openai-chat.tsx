"use client";

import { useState } from "react";
import { getCompletion } from "@/app/actions";

export function OpenAIChat() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const response = await getCompletion(input);
    setOutput(response);
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border px-4 py-2 w-full text-black"
          placeholder="Digite algo..."
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Enviar
        </button>
      </form>
      {output && <p className="mt-4 p-2 bg-gray-100 text-black">{output}</p>}
    </div>
  );
}
