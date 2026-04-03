import { useState, useRef, useEffect } from "react";

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "ai",
      text: "Hello! I'm MindFlow AI 🧠 How are you feeling today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = async (text) => {
    const msg = text || input;
    if (!msg.trim()) return;

    setMessages((prev) => [...prev, { id: Date.now(), role: "user", text: msg }]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          max_tokens: 200,
          messages: [
            {
              role: "system",
              content:
                "You are MindFlow AI, a compassionate mental wellness companion. Respond warmly in 2-3 sentences. Use 1 emoji.",
            },
            { role: "user", content: msg },
          ],
        }),
      });
      const data = await res.json();
      const reply =
        data.choices?.[0]?.message?.content || "I'm here for you 💜";
      setMessages((prev) => [...prev, { id: Date.now(), role: "ai", text: reply }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), role: "ai", text: "Error connecting. Please try again 💜" },
      ]);
    }

    setTyping(false);
  };

  const handleKeyDown = (e) => {
    // Send on Enter, allow Shift+Enter for newline
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    /*
      FIX: Instead of a fixed calc(100vh - 80px) height that breaks on mobile,
      use a flex column that fills the available space given by Layout's <main>.
      The outer div stretches to fill, messages area grows, input stays at bottom.
    */
    <div className="flex flex-col w-full max-w-4xl mx-auto" style={{ height: "calc(100dvh - 96px)" }}>
      {/* Header */}
      <div className="flex-shrink-0 mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">AI Chat</h1>
        <p className="text-muted-foreground text-xs sm:text-sm mt-1">Your wellness companion</p>
      </div>

      {/* Messages — scrollable, fills available space */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 pb-2">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] md:max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-card border border-border text-foreground rounded-bl-sm"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <div className="flex justify-start">
            <div className="bg-card border border-border px-4 py-3 rounded-2xl text-muted-foreground text-sm rounded-bl-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input bar — always pinned at bottom */}
      <div className="flex-shrink-0 flex gap-2 pt-3 border-t border-border">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
        />
        <button
          onClick={() => send()}
          disabled={!input.trim() || typing}
          className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 shadow-lg shadow-primary/25"
        >
          Send
        </button>
      </div>
    </div>
  );
}
