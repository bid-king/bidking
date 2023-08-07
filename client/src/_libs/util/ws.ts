import { io } from 'socket.io-client';

const ROOT = process.env.REACT_APP_WS_ROOT || '';

export const ws = io(ROOT, { autoConnect: false });
