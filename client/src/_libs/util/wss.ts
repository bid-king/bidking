import { io } from 'socket.io-client';

const ROOT = process.env.REACT_APP_WS_ROOT || '';

const socket = io(ROOT);

export const ws = {
  emit: async (eventName: string, data: string) => socket.emit(eventName, { data }),
  chat: async (data: string) => socket.emit('chat', { data }),
};

export const wss = {
  emit: async (eventName: string, data: string) => socket.emit(eventName, { data }),
  chat: async (data: string) => socket.emit('chat', { data }),
};
