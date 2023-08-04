import { io } from 'socket.io-client';

const API_URL = 'http://localhost:8005';
const socket = io(API_URL);

export const wss = {
  emit: async (eventName: string, data: string) => socket.emit(eventName, { data }),
  chat: async (data: string) => socket.emit('chat', { data }),
};
