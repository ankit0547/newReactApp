/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { getAction } from "../../redux/util/util";
import { useEffect } from "react";
import Sidebar from "./sidebar";
// import DashHeader from "./dashHeader";
// import { Outlet } from "react-router-dom";
import { fetchUserPermissions } from "../../redux/actions";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.AuthState);

  console.log("userDetails", userDetails);
  useEffect(() => {
    dispatch(getAction("GET_USER_DETAILS"));
    dispatch(fetchUserPermissions());
  }, []);

  // Sample groups and DM data

  const messages = [
    { fromMe: true, content: "Hey there!" },
    { fromMe: false, content: "Hello!" },
  ];

  const handleLogout = () => {
    dispatch(getAction("USER_LOGOUT"));
  };
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between p-4 bg-white border-b">
            <h3 className="text-lg font-semibold">{"Select a chat"}</h3>
            <button
              className="text-red-600 hover:text-red-800"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {/* Messages */}
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
{
  /* <div>
<button onClick={handleLogout}>Logout</button>
</div> */
}
