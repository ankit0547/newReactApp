/* eslint-disable react/prop-types */
const ChatArea = ({ messages }) => {
  return (
    <>
      <div className="space-y-4">
        {messages.map((message, index) => (
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
              {message.content}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChatArea;
