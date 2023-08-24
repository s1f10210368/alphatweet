import React, { useEffect, useRef, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import styles from './index.module.css';
interface ChatWindowProps {
  messages: string[];
  // messages: TrendModel;
  name: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, name }) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className={styles.chatWindow}>
      <div className={styles.header}>{name}</div>
      <div className={styles.messages}>
        {messages.map((message, index) => (
          <div key={index} className={styles.message}>
            {message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.footer}>
        <input className={styles.inputField} placeholder="Type a message..." />
      </div>
    </div>
  );
};
const LangChain = () => {
  // 3つの異なるメッセージリスト
  // const messagesList1 = ['FXを買いました。', 'FXを売りました。', 'FXを買いました。'];

  const [messagesList1, setMessagesList1] = useState<string[]>([]);

  const fetchGPT = async () => {
    // setMessagesList1(undefined);

    const res = await apiClient.GPT.$get().catch(returnNull);

    // if (res !== null) setMessagesList1(res);
    if (res !== null) {
      setMessagesList1((prevMessages) => [...prevMessages, ...res]);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchGPT();
    }, 50000);

    return () => clearInterval(interval);
  }, []);

  const messagesList2 = ['FXを売りました。', 'FXを買いました。'];
  const messagesList3 = [
    'FXを買いました。',
    'FXを売りました。',
    'FXを売りました。',
    'FXを買いました。',
    'FXを買いました。',
    'FXを売りました。',
    'FXを売りました。',
    'FXを買いました。',
    'FXを買いました。',
    'FXを売りました。',
    'FXを売りました。',
    'FXを買いました。',
  ];
  // 将来このListをuseStateにしてバックエンドから情報を持ってきてListに入れる。
  // オセロのLINE画面と同じ仕組み

  return (
    <div className={styles.container}>
      {/* <ChatWindow name="A" messages={messagesList1 || []} /> */}
      <ChatWindow name="A" messages={messagesList1} />
      {/* <ChatWindow name='A' {setTimeout(function (){
        await fetchGPT()
      }) messages = {messagesList1}}/> */}
      <ChatWindow name="B" messages={messagesList2} />
      <ChatWindow name="C" messages={messagesList3} />
    </div>
  );
};
export default LangChain;
