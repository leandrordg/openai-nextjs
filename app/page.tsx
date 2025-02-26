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
    <div className="relative p-4 min-h-dvh max-w-xl mx-auto flex flex-col h-full gap-2">
      {messages.map((m) => (
        <div
          key={m.id}
          ref={
            m.id === messages[messages.length - 1].id ? lastMessageRef : null
          }
          className={`p-4 rounded-xl border dark:border-zinc-800 w-fit h-full ${
            m.role === "assistant" ? "bg-zinc-50 dark:bg-zinc-900" : "ml-auto"
          }`}
        >
          <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
            {formatRole(m.role)}
          </p>
          <p>{m.content}</p>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="mt-auto">
        <input
          className="dark:bg-zinc-900 w-full max-w-xl mx-auto px-4 py-2 border border-zinc-300 dark:border-zinc-800 rounded-xl shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
