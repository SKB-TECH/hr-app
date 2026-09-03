"use client";

import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { ENV } from '@/core/constants/env';
import { useSession } from '@/core/hooks/auth/use-session';
import { getConversations, getSocketToken } from '@/core/services/messages/messages.service';
import type { ChatMessage } from '@/core/types/message';

function publish(count: number) { localStorage.setItem('messages:unread', String(count)); window.dispatchEvent(new CustomEvent('messages:unread', { detail: count })); }
function sound() { try { const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext; if (!AudioContextClass) return; const context = new AudioContextClass(); const oscillator = context.createOscillator(); const gain = context.createGain(); oscillator.frequency.setValueAtTime(740, context.currentTime); oscillator.frequency.exponentialRampToValueAtTime(980, context.currentTime + 0.12); gain.gain.setValueAtTime(0.08, context.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.22); oscillator.connect(gain); gain.connect(context.destination); oscillator.start(); oscillator.stop(context.currentTime + 0.22); } catch {} }

export default function MessageNotifications() {
  const session = useSession();
  const userId = session.data?.id;
  const unread = useRef(0);
  useEffect(() => {
    if (!userId) return;
    let disposed = false;
    let socket: ReturnType<typeof io> | undefined;
    void (async () => {
      try {
        const conversations = await getConversations();
        unread.current = conversations.flatMap((item) => item.messages).filter((message) => !message.readAt && message.senderId !== userId).length;
        publish(unread.current);
        const token = await getSocketToken();
        if (disposed) return;
        const origin = (ENV.SOCKET_URL.replace(/\/api\/v1\/?$/, '') || window.location.origin);
        socket = io(`${origin}/messages`, { auth: { token }, withCredentials: true, transports: ['websocket', 'polling'] });
        socket.on('message:new', ({ message }: { message: ChatMessage }) => { if (message.senderId === userId) return; unread.current = Number(localStorage.getItem('messages:unread')) || 0; unread.current += 1; publish(unread.current); sound(); });
      } catch { publish(0); }
    })();
    return () => { disposed = true; socket?.disconnect(); };
  }, [userId]);
  return null;
}
