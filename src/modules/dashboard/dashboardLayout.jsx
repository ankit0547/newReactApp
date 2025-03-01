/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { getAction } from "../../redux/util/util";
import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import DashHeader from "./dashHeader";
import ChatArea from "./chatArea";
import {
  connectSocket,
  disconnectSocket,
  // clearSocketAction,
  getAllDms,
  getCurrentUser,
} from "./redux/actions";

const DashboardLayout = () => {
  const dispatch = useDispatch();

  // const authToken = useSelector((state) => state.AuthStates.token);
  const authToken = localStorage.getItem("accessToken");

  // const { allUser } = useSelector((state) => state.DashboardStates);

  // console.log("userDetails", allUser);
  useEffect(() => {
    if (authToken) {
      dispatch(connectSocket(authToken));
    }

    dispatch(getAction("GET_ALL_USERS"));

    dispatch(getAllDms());
    dispatch(getCurrentUser());

    // Cleanup on unmount
    return () => {
      dispatch(disconnectSocket()); // Disconnect when the app is unmounted
    };
  }, [authToken, dispatch]);

  // Sample groups and DM data

  const [message, setMessage] = useState(null);

  useEffect(() => {
    console.log("message", message);
  }, [message]);
  const handleMessages = (message) => {
    dispatch(getAction("SEND_MESSAGE", { message }));
    console.log("send>>>>", message);
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          <DashHeader />
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {/* Messages */}
            <ChatArea messages={[]} />
          </div>
          <div className="p-4 bg-white border-t">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                name="message"
                placeholder="Type your message..."
                className="flex-1 border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={() => handleMessages(message)}
              >
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
