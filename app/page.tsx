"use client";

import { useEffect, useRef } from "react";

import { useChat } from "@ai-sdk/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, status } =
    useChat();

  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col gap-2 w-full max-w-xl py-24 mx-auto">
      {messages.map((m) => (
        <div
          key={m.id}
          ref={
            m.id === messages[messages.length - 1].id ? lastMessageRef : null
          }
          className={`p-4 rounded-xl border dark:border-zinc-800 w-fit ${
            m.role === "assistant" ? "bg-zinc-50 dark:bg-zinc-900" : "ml-auto"
          }`}
        >
          <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
            {formatRole(m.role)}
          </p>
          <p>{m.content}</p>
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-xl px-4 py-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded-xl shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          value={input}
          disabled={status === "streaming"}
          placeholder="Digite algo..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}

function formatRole(role: string) {
  return role === "user" ? "Você" : "Assistente";
}
