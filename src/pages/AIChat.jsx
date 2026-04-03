import { useState, useRef, useEffect } from "react";

export default function AIChat() {
  const [messages, setMessages] = useState([
    { id: 1, role: "ai", text: "Hello! I'm MindFlow AI 🧠 How are you feeling today?" }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), role: "user", text: msg }]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          max_tokens: 200,
          messages: [
            { role: "system", content: "You are MindFlow AI, a mental wellness companion. Respond specifically to what the user says in 2-3 sentences. Use 1 emoji." },
            { role: "user", content: msg }
          ]
        })
      });
      const data = await res.json();
      console.log("GROQ:", data);
      const reply = data.choices?.[0]?.message?.content || "I'm here for you 💜";
      setMessages(prev => [...prev, { id: Date.now(), role: "ai", text: reply }]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { id: Date.now(), role: "ai", text: "Error connecting. Try again 💜" }]);
    }
    setTyping(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">AI Chat</h1>
      <p className="text-muted-foreground text-sm mb-4">Your wellness companion</p>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm ${
              m.role === "user"
                ? "bg-primary text-primary-foreground rounded-br-sm"
                : "bg-card border border-border rounded-bl-sm"
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="bg-card border border-border px-4 py-2 rounded-2xl text-muted-foreground text-sm">
              Thinking...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Type your message..."
          className="flex-1 bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
        />
        <button onClick={() => send()}
          className="bg-primary text-primary-foreground px-5 py-3 rounded-xl text-sm font-medium">
          Send
        </button>
      </div>
    </div>
  );
}