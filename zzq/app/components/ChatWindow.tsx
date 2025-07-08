"use client";

import React, { useRef, useState, useEffect } from "react";

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [messageId, setMessageId] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: messageId,
      role: "user",
      text: trimmed,
    };
    const botMsg: Message = {
      id: messageId + 1,
      role: "bot",
      text: `(placeholder response) ${trimmed}`,
    };

    setMessages((msgs) => [...msgs, userMsg, botMsg]);
    setMessageId((id) => id + 2);
    setInput("");
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <aside className="chat-window">
      <div className="chat-header">ZZQ Chat</div>
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="chat-placeholder">No messages yet.</div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={
                msg.role === "user"
                  ? "chat-message chat-message-user"
                  : "chat-message chat-message-bot"
              }
            >
              {msg.text}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <form
        className="chat-input-area"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <textarea
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Type your message…"
          rows={1}
          autoComplete="off"
          aria-label="Type a message and hit Enter"
        />
        <button className="chat-send" type="submit" disabled={!input.trim()}>
          Send
        </button>
      </form>
    </aside>
  );
}