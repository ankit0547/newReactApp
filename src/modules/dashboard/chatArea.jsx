// import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

/* eslint-disable react/prop-types */
const ChatArea = () => {
  // const [currentChat, setCurrentChat] = useState(null);
  const { messages, selectedChat } = useSelector((state) => state.ChatStates);
  // useEffect(() => {
  //   if (messages.length === 0) {
  //     setCurrentChat(false);
  //   }
  // }, [messages]);
  return (
    <>
      <div className="space-y-4">
        {selectedChat &&
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.fromMe ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`${
                  message.fromMe ? "bg-blue-500" : "bg-gray-300"
                } text-white p-3 rounded-lg max-w-xs`}
              >
                test
                {/* {message.content} */}
              </div>
            </div>
          ))}
        {/* 
        {selectedChat && (
          <div>
            new message
            {messages.map((msg, index) => (
              <div key={index}>
                <strong>{msg.sender}</strong>: {msg.content}
              </div>
            ))}
          </div>
        )} */}

        {selectedChat && <div>Start Conversation</div>}
        {!selectedChat && <div>Start a new chat !!</div>}
      </div>
    </>
  );
};

export default ChatArea;
