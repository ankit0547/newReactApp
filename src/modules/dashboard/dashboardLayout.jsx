/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { getAction } from "../../redux/util/util";
import { useEffect } from "react";
import Sidebar from "./sidebar";
// import DashHeader from "./dashHeader";
// import { Outlet } from "react-router-dom";
// import { fetchUserPermissions } from "../../redux/actions";
import DashHeader from "./dashHeader";
import ChatArea from "./chatArea";
import { io } from "socket.io-client";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const socket = io("http://localhost:7800");
  const { allUser } = useSelector((state) => state.DashboardStates);

  // Join the server
  socket.emit("join", { userId: allUser?._id });
  console.log("userDetails", allUser);
  useEffect(() => {
    dispatch(getAction("GET_ALL_USERS"));
  }, []);

  // Sample groups and DM data

  const messages = [
    { fromMe: true, content: "Hey there!" },
    { fromMe: false, content: "Hello!" },
  ];

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          <DashHeader />
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {/* Messages */}
            <ChatArea messages={messages} />
          </div>
          <div className="p-4 bg-white border-t">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
