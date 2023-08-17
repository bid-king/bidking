/** @jsxImportSource @emotion/react */
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { live } from '../../../../api/live';
import colors from '../../../design/colors';
import { Input } from '../../common/Input';
import { RoundButton } from '../../common/RoundButton';
import { Spacing } from '../../common/Spacing';
import { Text } from '../../common/Text';
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
    socket.current?.on('newUser', ({ newUser }) => {
      setChats([...chats, { nickname: newUser, msg: '님이 입장했어요.' }]);
    });
    socket.current?.on('leaveRoom', () => {});
  }, [socket.current, chats]);

  useEffect(() => {
    scroll();
    function scroll() {
      chatRef.current?.scrollIntoView();
    }
  }, [chats]);

  useEffect(() => {
    return () => {
      // live(socket.current).send.leave(roomId);
    };
  }, []);
  return (
    <div
      css={{
        width: '100%',
        height: 'calc(60vh - 3rem)',
        borderRadius: '1.85rem',
        padding: '1rem',
        position: 'relative',
        ...THEME_VARIANT[theme],
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div css={{ overflowY: 'auto', height: 'calc(55vh - 3rem)' }}>
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
              autoComplete="off"
              onSubmit={e => {
                e.preventDefault();
                if (input.trim().length > 0) {
                  live(socket.current).send.chat(roomId, nickname, input.trim());
                  setInput('');
                }
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
                  onKeyDown={e => {
                    if (e.key === 'enter' && input.trim().length > 0) {
                      live(socket.current).send.chat(roomId, nickname, input.trim());
                      setInput('');
                    }
                  }}
                />
                <Spacing rem="0.5" dir="h" />
                <RoundButton
                  label="보내기"
                  type="button"
                  color="confirm"
                  size="small"
                  onClick={e => {
                    if (input.length > 0) {
                      live(socket.current).send.chat(roomId, nickname, input.trim());
                      setInput('');
                    }
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
