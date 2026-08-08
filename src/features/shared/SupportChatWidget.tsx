import { useRef, useState } from "react";
import type { FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { MessageCircle, Send, X, MapPin, ExternalLink } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "system";
  text: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome",
    role: "system",
    text: "Hi! Have a question about the calculator or found a bug? Send a message below — I reply by email, usually within 2–3 days.",
  },
];

export default function SupportChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    const formData = new FormData(form.current);
    const messageText = String(formData.get("message") ?? "").trim();
    if (!messageText) return;

    setStatus("sending");

    emailjs
      .sendForm("service_638tkkh", "template_75qb1he", form.current, {
        publicKey: "7WDvLgcRJ6PFV4dsO",
      })
      .then(
        () => {
          setMessages((prev) => [
            ...prev,
            { id: crypto.randomUUID(), role: "user", text: messageText },
            {
              id: crypto.randomUUID(),
              role: "system",
              text: "Thanks — your message is sent. You'll get a reply by email within 2–3 days.",
            },
          ]);
          setStatus("sent");
          form.current?.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
          setStatus("error");
        }
      );
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close support chat" : "Open support chat"}
        aria-expanded={isOpen}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 hover:scale-105 active:scale-95"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex max-h-[70vh] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/50 animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/80 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                <MessageCircle size={16} />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-100">Support Chat</h2>
                <p className="text-[11px] text-slate-500">Replies by email · 2–3 days</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close support chat"
              className="rounded-md p-1 text-slate-500 hover:bg-slate-800 hover:text-slate-300"
            >
              <X size={16} />
            </button>
          </div>

          {/* Message log */}
          <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto px-4 py-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-sm bg-emerald-500 text-slate-950"
                      : "rounded-bl-sm bg-slate-800 text-slate-200"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {status === "error" && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-rose-500/10 px-3.5 py-2 text-[13px] text-rose-400">
                  Something went wrong sending that — please try again.
                </div>
              </div>
            )}

            {/* Contact info, shown inline in the log so the panel stays single-purpose */}
            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 border-t border-slate-800 pt-3 text-[11px] text-slate-600">
              <span className="flex items-center gap-1">
                <MapPin size={11} /> Tokyo, Japan
              </span>
              <a
                href="https://hibiki-shibata.github.io/ride.driver.frontend/home"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-emerald-400"
              >
                <ExternalLink size={11} /> Developer Profile
              </a>
            </div>
          </div>

          {/* Composer */}
          <form ref={form} onSubmit={sendEmail} className="border-t border-slate-800 px-4 py-3">
            <div className="mb-2 grid grid-cols-2 gap-2">
              <input
                className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-emerald-500"
                type="text"
                name="name"
                placeholder="Name"
                required
              />
              <input
                className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-emerald-500"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="flex items-end gap-2">
              <textarea
                className="min-h-[38px] flex-1 resize-none rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-emerald-500"
                name="message"
                rows={2}
                placeholder="Write your message..."
                required
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    form.current?.requestSubmit();
                  }
                }}
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}