/** @jsxImportSource @emotion/react */
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { chatInputSelector } from '../../../../recoil-states/chat/chatInput';
import { chatSelector } from '../../../../recoil-states/chat/chatroom';
import { useLiveInfo } from '../../../hooks/useLiveInfo';
import { useSocketListener, useSocketEmitter } from '../../../hooks/useSocket';
import { ChatResponse, ChattingRoom, NewUserResponse } from '../../../types/chat';
import { Input } from '../../common/Input';
import { RoundButton } from '../../common/RoundButton';
import { Spacing } from '../../common/Spacing';
import { View } from '../../common/View';
import { ChatMessage } from './ChatMessage';
import { BASE, INPUT_AREA, ROOM } from './ChatRoom.css';

export function ChatRoom() {
  const { roomInfo } = useLiveInfo();
  const IS_SELLER = roomInfo?.seller || false;

  const [chats, setChats] = useRecoilState(chatSelector);
  const [input, setInput] = useRecoilState(chatInputSelector);

  const chatRef = useRef<HTMLDivElement>(null);

  useSocketListener<ChatResponse>('chat', data => setChats([...chats, data]));
  useSocketListener<NewUserResponse>('newUser', ({ newUser }) => {
    setChats([...chats, { nickname: newUser, msg: '님이 입장했어요.' }]);
  });

  useEffect(() => {
    (function scrollToBottom() {
      chatRef.current?.scrollIntoView();
    })();
  }, [chats]);

  const { EMIT: chatTrigger } = useSocketEmitter('chat', {
    nickname: roomInfo?.nickname,
    roomId: roomInfo?.auctionRoomId,
    msg: input.trim(),
  });

  const handleChat = () => {
    input.trim().length > 0 && chatTrigger();
    setInput('');
  };

  return (
    <View css={BASE(IS_SELLER)}>
      <View css={ROOM(IS_SELLER)}>
        <View>
          {chats.map((chat, idx) => (
            <ChatMessage key={idx} nickname={chat.nickname} msg={chat.msg} />
          ))}
          <Spacing rem="1" />
          <div ref={chatRef} />
        </View>
      </View>
      <View css={INPUT_AREA}>
        {IS_SELLER || (
          <View css={{ width: '100%' }}>
            <form
              autoComplete="off"
              onSubmit={e => {
                e.preventDefault();
                handleChat();
              }}
            >
              <View css={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                <Input
                  id="chat"
                  placeholder=""
                  shape="round"
                  size="small"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'enter' && handleChat()}
                />
                <Spacing rem="0.5" dir="h" />
                <RoundButton label="보내기" type="submit" color="confirm" size="small" />
              </View>
            </form>
          </View>
        )}
      </View>
    </View>
  );
}
