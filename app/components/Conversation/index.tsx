"use client";

import ChatMessage from "../ChatMessage";
import { useChat } from "../../hooks";

import styles from "./Conversation.module.css";

const Conversation = () => {
  const { messages } = useChat();

  return (
    <div className={styles.conversation}>
      {messages.map((message, index) => {
        if (message.from === "user") {
          return (
            <ChatMessage
              side={"user"}
              message={message.text}
              key={`user-${message.text}-${index}`}
            />
          );
        }
        return (
          <ChatMessage
            side={"ai"}
            avatar={"ollama.png"}
            message={message.text}
            key={`ai-${message.text}-${index}`}
          />
        );
      })}
    </div>
  );
};

export default Conversation;
