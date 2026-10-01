import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import "./floating.css";

interface Msg {
  from: "bot" | "me";
  text: string;
}

const quickReplies = [
  "Como começo a investir?",
  "Qual o valor mínimo?",
  "Como funciona o resgate?",
  "Falar com um humano",
];

const botAnswers: Record<string, string> = {
  "Como começo a investir?":
    "É simples! Complete seu cadastro de investidor no Perfil, escolha uma oferta no Mercado e conclua o pagamento via Pix. 🚀",
  "Qual o valor mínimo?":
    "O ticket mínimo varia por oferta — a partir de R$ 500. Você vê o mínimo em cada card na vitrine.",
  "Como funciona o resgate?":
    "O resgate ocorre no vencimento do título ou conforme a modalidade da oferta. Acompanhe tudo pela Carteira.",
  "Falar com um humano":
    "Claro! Vou te transferir para nosso time no WhatsApp. É só clicar no botão verde ao lado. 💬",
};

const WPP_NUMBER = "5511999999999";

export default function FloatingWidgets() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: "Olá! 👋 Sou a Angie, assistente da Angel Invest. Como posso te ajudar hoje?" },
  ]);
  const [input, setInput] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, chatOpen]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: "me", text }]);
    setInput("");
    setTimeout(() => {
      const answer =
        botAnswers[text] ??
        "Ótima pergunta! Um consultor pode te ajudar melhor com isso. Toque em 'Falar com um humano' ou no botão do WhatsApp. 😉";
      setMessages((m) => [...m, { from: "bot", text: answer }]);
    }, 650);
  };

  return (
    <>
      {chatOpen && (
        <div className="chat-panel" role="dialog" aria-label="Chat de atendimento">
          <div className="chat-head">
            <span className="avatar" style={{ background: "#ffffff22", width: 40, height: 40 }}>
              <Bot size={20} />
            </span>
            <div className="stack grow">
              <strong style={{ fontSize: "0.95rem" }}>Angie · Assistente</strong>
              <span className="status">Online agora</span>
            </div>
            <button className="icon-btn" style={{ background: "#ffffff22", border: "none", color: "#fff" }} onClick={() => setChatOpen(false)} aria-label="Fechar chat">
              <X size={18} />
            </button>
          </div>

          <div className="chat-body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.from}`}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="chat-quick">
            {quickReplies.map((q) => (
              <button key={q} className="chat-chip" onClick={() => send(q)}>
                {q}
              </button>
            ))}
          </div>

          <form
            className="chat-input"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escreva sua mensagem..."
              aria-label="Mensagem"
            />
            <button className="chat-send" type="submit" aria-label="Enviar">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      <div className="fab-stack">
        <a
          className="fab fab-wpp"
          href={`https://wa.me/${WPP_NUMBER}?text=Ol%C3%A1!%20Tenho%20d%C3%BAvidas%20sobre%20investimentos%20na%20Angel.`}
          target="_blank"
          rel="noreferrer"
          aria-label="Falar no WhatsApp"
        >
          <span className="fab-ping" />
          <span className="fab-label">Fale no WhatsApp</span>
          <WppIcon />
        </a>

        <button
          className="fab fab-chat"
          onClick={() => setChatOpen((o) => !o)}
          aria-label="Abrir chat de dúvidas"
        >
          <span className="fab-label">Tire suas dúvidas</span>
          {chatOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>
    </>
  );
}

function WppIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
