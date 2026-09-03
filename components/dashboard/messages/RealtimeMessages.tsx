"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Search,
  SendHorizontal,
} from "lucide-react";
import { io, type Socket } from "socket.io-client";
import { useSearchParams } from "next/navigation";
import { ENV } from "@/core/constants/env";
import { mediaUrl } from "@/core/lib/media-url";
import { useSession } from "@/core/hooks/auth/use-session";
import {
  createConversation,
  getConversations,
  getSocketToken,
  markConversationRead,
  sendMessage,
} from "@/core/services/messages/messages.service";
import type { ChatMessage, Conversation } from "@/core/types/message";

function socketOrigin() {
  const configured = ENV.SOCKET_URL.replace(/\/api\/v1\/?$/, "");
  return (
    configured || (typeof window !== "undefined" ? window.location.origin : "")
  );
}

export default function RealtimeMessages({
  role,
}: {
  role: "candidate" | "company";
}) {
  const session = useSession();
  const params = useSearchParams();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const socketRef = useRef<Socket | null>(null);
  const selected = conversations.find((item) => item.id === selectedId);

  useEffect(() => {
    let active = true;
    async function start() {
      try {
        const candidateId = params.get("candidateId");
        const jobId = params.get("jobId") || undefined;
        if (role === "company" && candidateId)
          await createConversation(
            candidateId,
            jobId,
            jobId ? "Nous souhaitons vous proposer cette offre." : undefined,
          );
        const list = await getConversations();
        if (!active) return;
        setConversations(list);
        setSelectedId(list[0]?.id || "");
        const token = await getSocketToken();
        const socket = io(`${socketOrigin()}/messages`, {
          auth: { token },
          withCredentials: true,
          transports: ["websocket", "polling"],
        });
        socket.on(
          "message:new",
          ({
            conversationId,
            message,
          }: {
            conversationId: string;
            message: ChatMessage;
          }) =>
            setConversations((current) =>
              current.map((conversation) =>
                conversation.id === conversationId &&
                !conversation.messages.some((item) => item.id === message.id)
                  ? {
                      ...conversation,
                      messages: [...conversation.messages, message],
                      updatedAt: message.createdAt,
                    }
                  : conversation,
              ),
            ),
        );
        socketRef.current = socket;
      } catch (cause) {
        if (active) setError(cause instanceof Error ? cause.message : "Messagerie indisponible.");
      } finally {
        if (active) setLoading(false);
      }
    }
    void start();
    return () => {
      active = false;
      socketRef.current?.disconnect();
    };
  }, [params, role]);

  useEffect(() => {
    if (!selectedId) return;
    socketRef.current?.emit("conversation:join", {
      conversationId: selectedId,
    });
    void markConversationRead(selectedId);
    setConversations((current) => current.map((conversation) => conversation.id === selectedId ? { ...conversation, messages: conversation.messages.map((message) => message.senderId === session.data?.id ? message : { ...message, readAt: message.readAt || new Date().toISOString() }) } : conversation));
    const remaining = conversations.flatMap((conversation) => conversation.id === selectedId ? [] : conversation.messages).filter((message) => !message.readAt && message.senderId !== session.data?.id).length;
    localStorage.setItem("messages:unread", String(remaining));
    window.dispatchEvent(new CustomEvent("messages:unread", { detail: remaining }));
  }, [selectedId, session.data?.id]);
  const filtered = useMemo(
    () =>
      conversations.filter((conversation) =>
        participant(conversation, role)
          .name.toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [conversations, query, role],
  );

  async function submit(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || !selected) return;
    setInput("");
    const socket = socketRef.current;
    if (socket?.connected)
      socket.emit("message:send", { conversationId: selected.id, text });
    else {
      const message = await sendMessage(selected.id, text);
      setConversations((current) =>
        current.map((conversation) =>
          conversation.id === selected.id
            ? { ...conversation, messages: [...conversation.messages, message] }
            : conversation,
        ),
      );
    }
  }

  if (loading)
    return (
      <div className="grid h-full place-items-center text-sm text-neutral-60">
      Chargement des messages…
    </div>
  );
  if (error) return <div className="grid h-full place-items-center p-8 text-center"><div><h2 className="font-bold text-neutral-100">Messagerie indisponible</h2><p className="mt-2 max-w-md text-sm text-neutral-60">{error}</p><p className="mt-2 text-xs text-neutral-60">Déployez l’API contenant le module Messages et exécutez sa migration.</p></div></div>;
  return (
    <div className="flex h-full min-h-0 overflow-hidden bg-white">
      <aside
        className={`${selected ? "hidden md:flex" : "flex"} w-full shrink-0 flex-col border-r border-brand-light-neutral md:w-80 lg:w-[350px]`}
      >
        <div className="p-4">
          <label className="flex h-11 items-center gap-2 border border-brand-light-neutral px-3">
            <Search size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher un message"
              className="min-w-0 flex-1 outline-none"
            />
          </label>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          {filtered.map((conversation) => {
            const person = participant(conversation, role);
            const last = conversation.messages.at(-1);
            return (
              <button
                key={conversation.id}
                onClick={() => setSelectedId(conversation.id)}
                className={`flex w-full gap-3 border-b border-brand-light-neutral p-4 text-left ${selectedId === conversation.id ? "bg-accent-light-brand" : "hover:bg-[#fafaff]"}`}
              >
                <Avatar src={person.avatar} name={person.name} />
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-2">
                    <b className="truncate text-sm">{person.name}</b>
                    <span className="shrink-0 text-[10px] text-neutral-60">
                      {last
                        ? new Date(last.createdAt).toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-xs text-neutral-60">
                    {last?.text || "Nouvelle conversation"}
                  </p>
                </div>
              </button>
            );
          })}
          {filtered.length === 0 && (
            <p className="p-8 text-center text-sm text-neutral-60">
              Aucune conversation.
            </p>
          )}
        </div>
      </aside>
      <main
        className={`${selected ? "flex" : "hidden md:flex"} min-w-0 flex-1 flex-col`}
      >
        {selected ? (
          <>
            <ChatHeader
              conversation={selected}
              role={role}
              onBack={() => setSelectedId("")}
            />
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-[#fafaff] p-4 lg:p-6">
              {selected.messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  own={message.senderId === session.data?.id}
                />
              ))}
            </div>
            <form
              onSubmit={submit}
              className="flex gap-2 border-t border-brand-light-neutral p-4"
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Écrire un message"
                className="h-11 min-w-0 flex-1 border border-brand-light-neutral px-3 outline-none focus:border-brand"
              />
              <button
                disabled={!input.trim()}
                className="grid size-11 place-items-center bg-brand text-white disabled:opacity-40"
              >
                <SendHorizontal size={18} />
              </button>
            </form>
          </>
        ) : (
          <div className="grid flex-1 place-items-center text-sm text-neutral-60">
            Sélectionnez une conversation
          </div>
        )}
      </main>
    </div>
  );
}

function participant(
  conversation: Conversation,
  role: "candidate" | "company",
) {
  return role === "company"
    ? {
        name: conversation.candidate.fullName,
        avatar: conversation.candidate.avatar,
      }
    : { name: conversation.company.name, avatar: conversation.company.logo };
}
function Avatar({ src, name }: { src?: string | null; name: string }) {
  const image = src ? mediaUrl(src) : null;
  return image ? (
    <Image
      src={image}
      alt=""
      width={42}
      height={42}
      className="size-10 rounded-full object-cover"
    />
  ) : (
    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand font-bold text-white">
      {name.slice(0, 1)}
    </span>
  );
}
function ChatHeader({
  conversation,
  role,
  onBack,
}: {
  conversation: Conversation;
  role: "candidate" | "company";
  onBack: () => void;
}) {
  const person = participant(conversation, role);
  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-brand-light-neutral px-4">
      <button onClick={onBack} className="md:hidden">
        <ArrowLeft size={19} />
      </button>
      <Avatar src={person.avatar} name={person.name} />
      <div>
        <h2 className="font-bold">{person.name}</h2>
        <p className="text-xs text-neutral-60">
          {role === "candidate" ? "Entreprise" : "Candidat"}
        </p>
      </div>
    </header>
  );
}
function MessageBubble({
  message,
  own,
}: {
  message: ChatMessage;
  own: boolean;
}) {
  return (
    <div className={`flex ${own ? "justify-end" : "justify-start"}`}>
      <article
        className={`max-w-[78%] rounded-2xl p-3 text-sm shadow-sm ${own ? "rounded-br-md bg-brand text-white" : "rounded-bl-md border border-brand-light-neutral bg-white text-neutral-100"}`}
      >
        {message.type === "JOB_PROPOSAL" && message.job && (
          <div
            className={`mb-2 rounded-xl border p-3 ${own ? "border-white/30" : "border-brand-light-neutral"}`}
          >
            <p className="flex items-center gap-2 text-xs font-bold uppercase">
              <BriefcaseBusiness size={15} />
              Offre proposée
            </p>
            <h3 className="mt-2 font-bold">{message.job.title}</h3>
            <p className="mt-1 text-xs">{message.job.location}</p>
            <Link
              href={`/jobs/${message.job.id}`}
              className={`mt-3 inline-block text-xs font-bold underline ${own ? "text-white" : "text-brand"}`}
            >
              Voir l’offre
            </Link>
          </div>
        )}
        <p className="whitespace-pre-wrap">{message.text}</p>
        <time
          className={`mt-1 block text-[10px] ${own ? "text-white/70" : "text-neutral-60"}`}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </time>
      </article>
    </div>
  );
}
