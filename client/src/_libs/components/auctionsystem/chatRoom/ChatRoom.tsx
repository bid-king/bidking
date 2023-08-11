/** @jsxImportSource @emotion/react */
import React, { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { live, SocketAPI } from '../../../../api/live';
import colors from '../../../design/colors';
import { IconButton } from '../../common/IconButton';
import { Input } from '../../common/Input';
import { Spacing } from '../../common/Spacing';
import { ChatMessage } from './ChatMessage';

export function ChatRoom({ roomId, nickname, theme = 'light', userType = 'order', socket }: Props) {
  const [chats, setChats] = useState<Chatting[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.current?.on('chat', data => {
      setChats([...chats, data]);
    });
  }, [socket.current, chats]);

  useEffect(() => {
    scroll();
    function scroll() {
      chatRef.current?.scrollIntoView();
    }
  }, [chats]);

  useEffect(() => {
    return () => {
      live(socket.current).req.leave(roomId, nickname);
    };
  }, []);
  return (
    <div
      css={{
        width: '100%',
        minHeight: '60vh',
        borderRadius: '1.85rem',
        padding: '1rem',
        position: 'relative',
        ...THEME_VARIANT[theme],
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div css={{ overflowY: 'auto', height: '35vh' }}>
        <div css={{ paddingBottom: '1rem' }}>
          {chats.map((chat, idx) => (
            <ChatMessage key={idx} nickname={chat.nickname} msg={chat.msg} />
          ))}
          <div ref={chatRef} />
        </div>
      </div>
      <div
        className="inputArea"
        css={{
          width: 'calc(100% - 2rem)',
          left: '1rem',
          bottom: '1rem',
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {userType === 'order' && (
          <div css={{ width: '100%' }}>
            <form
              onSubmit={e => {
                e.preventDefault();
                setIsLoading(true);
                if (isLoading && input.length > 0) live(socket.current).req.chat(roomId, nickname, input);
                setIsLoading(false);
              }}
            >
              <div css={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                <Input
                  id="chat"
                  placeholder=""
                  shape="round"
                  size="small"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                />
                <Spacing rem="0.5" dir="h" />
                <IconButton
                  type="arrowRight"
                  color="black"
                  background="confirm"
                  size="small"
                  onClick={e => {
                    live(socket.current).req.chat(roomId, nickname, input);
                    setInput('');
                  }}
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

const THEME_VARIANT = {
  light: {
    backgroundColor: colors.backgroundLight2,
  },
  dark: {
    backgroundColor: colors.backgroundDark2,
    color: colors.white,
  },
};

interface Props {
  roomId: number;
  nickname: string;
  theme?: 'light' | 'dark';
  userType: 'order' | 'seller';
  socket: MutableRefObject<Socket | null>;
}

interface Chatting {
  nickname: string;
  msg: string;
}
