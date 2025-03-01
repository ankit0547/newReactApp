/* eslint-disable react/prop-types */
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../components/common/Modal/Modal";
// import { getAction } from "../../redux/util/util";
import { newDm } from "../chat/redux/actions";
import PlusIcon from "../../components/Icons/PlusIcon";
import DownArrowIcon from "../../components/Icons/DownArrowIcon";
import RightArrowIcon from "../../components/Icons/RightArrowIcon";
// import { getAction } from "../../redux/util/util";

const GetDmMoal = (toggleNewDmModal, isNewDmModalOpen) => {
  const [selectChat, setSelectChat] = useState([]);
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.DashboardStates);
  const { onlineUsers } = useSelector((state) => state.AuthStates);
  const handleSelectChat = (user) => {
    if (selectChat.length > 1) return;
    setSelectChat([user]);
  };

  const handleNewDm = () => {
    // Start a new chat with the receiver
    dispatch(newDm(selectChat[0].userId));
    setSelectChat([]);
    toggleNewDmModal();
  };

  return (
    <Modal
      onClose={toggleNewDmModal}
      isOpen={isNewDmModalOpen}
      title="Start a new DM"
      actions={[
        {
          label: "Cancel",
          onClick: toggleNewDmModal,
        },
        {
          label: "Chat",
          onClick: handleNewDm,
        },
      ]}
    >
      <ul className="space-y-2">
        {allUsers.map((dm) => (
          <li
            key={dm._id}
            className={dm._id === selectChat[0]?.userId ? "bg-gray-200" : ""}
          >
            <button
              onClick={() =>
                handleSelectChat({
                  userId: dm._id,
                  name: `${dm.firstName} ${dm.lastName}`,
                  type: "dm",
                })
              }
              className="w-full block p-2 rounded hover:bg-gray-200"
            >
              <div className="flex items-center space-x-3">
                <div className="relative w-10 h-10 bg-gray-300 rounded-full">
                  <img
                    src={dm?.avatar.url}
                    alt={`${dm?.firstName} ${dm?.lastName}`}
                    className="w-10 h-10 rounded-full"
                  />

                  <span
                    className={`absolute bottom-0 right-0 w-4 h-4 rounded-full ${
                      onlineUsers?.some(
                        (onlineUser) => onlineUser.userId === dm._id
                      )
                        ? "bg-green-500"
                        : "bg-gray-400"
                    } border-2 border-white`}
                    title={dm.isOnline ? "Online" : "Offline"}
                  />
                </div>
                <span className="font-medium">
                  {dm.firstName} {dm.lastName}
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  );
};

const Sidebar = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState(false);
  const [isNewDmModalOpen, setIsNewDmModalOpen] = useState(false);
  const [isGroupsCollapsed, setIsGroupsCollapsed] = useState(false);
  const [isDmsCollapsed, setIsDmsCollapsed] = useState(false);

  const groups = [
    { id: 1, name: "Developers Group", members: ["John", "Alice", "Bob"] },
    { id: 2, name: "Designers Group", members: ["Paul", "Lily"] },
  ];
  console.log("#>>", isNewGroupModalOpen);
  const { allChats } = useSelector((state) => state.ChatStates);
  const { onlineUsers } = useSelector((state) => state.AuthStates);
  const { userDetails } = useSelector((state) => state.DashboardStates);
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleNewGroupModal = () => {
    setIsNewGroupModalOpen((prev) => !prev);
  };

  const toggleNewDmModal = () => {
    setIsNewDmModalOpen((prev) => !prev);
  };

  const toggleGroups = () => {
    setIsGroupsCollapsed(!isGroupsCollapsed);
  };

  const toggleDms = () => {
    setIsDmsCollapsed(!isDmsCollapsed);
  };

  return (
    <>
      <div
        className={`${
          isSidebarCollapsed ? "w-20" : "w-1/4"
        } bg-white border-r transition-all duration-300 ease-in-out hidden md:block sidebar`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2
            className={`text-lg font-semibold ${
              isSidebarCollapsed && "hidden"
            }`}
          >
            {userDetails?.firstName} {userDetails?.lastName}
          </h2>
          <button onClick={toggleSidebar} className="text-gray-600">
            {isSidebarCollapsed ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            )}
          </button>
        </div>
        <div className="p-4 space-y-4">
          {/* Groups */}
          <div>
            <div
              className={`flex justify-between items-center mb-4 ${
                isSidebarCollapsed && "hidden"
              }`}
            >
              <div className="flex items-center">
                <button onClick={toggleGroups} className="text-gray-600">
                  {isGroupsCollapsed ? <DownArrowIcon /> : <RightArrowIcon />}
                </button>
                <h3
                  className={`font-semibold ${isSidebarCollapsed && "hidden"}`}
                >
                  Groups
                </h3>
              </div>
              <button onClick={toggleNewGroupModal} className="text-gray-600">
                <PlusIcon />
              </button>
            </div>
            {!isGroupsCollapsed && (
              <ul className="space-y-2">
                {groups.map((group) => (
                  <li key={group.id}>
                    <a
                      href="#"
                      // onClick={() =>
                      //   selectChat({
                      //     id: group.id,
                      //     name: group.name,
                      //     type: "group",
                      //   })
                      // }
                      className="block p-2 rounded hover:bg-gray-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                        <span
                          className={`font-medium ${
                            isSidebarCollapsed && "hidden"
                          }`}
                        >
                          {group.name}
                        </span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* allChats */}
          <div>
            <div
              className={`flex justify-between items-center mb-4 ${
                isSidebarCollapsed && "hidden"
              }`}
            >
              <div className="flex items-center">
                {allChats?.length > 0 && (
                  <button onClick={toggleDms} className="text-gray-600">
                    {isDmsCollapsed ? <DownArrowIcon /> : <RightArrowIcon />}
                  </button>
                )}
                <h3
                  className={`font-semibold ${isSidebarCollapsed && "hidden"}`}
                >
                  Direct Messages
                </h3>
              </div>
              <button onClick={toggleNewDmModal} className="text-gray-600">
                <PlusIcon />
              </button>
            </div>
            {!isDmsCollapsed && (
              <ul className="space-y-2">
                {allChats?.map(({ participants, _id }) => {
                  const chatDetails = participants.find(
                    (p) => p._id !== userDetails?._id
                  );
                  const isOnline = onlineUsers?.some(
                    (user) => user.userId === chatDetails?._id
                  );

                  return (
                    <li
                      key={_id}
                      onClick={() => {
                        dispatch(newDm(chatDetails?._id));
                      }}
                    >
                      <a className="block p-2 rounded hover:bg-gray-200">
                        <div className="flex items-center space-x-3">
                          <div className="relative w-10 h-10 bg-gray-300 rounded-full">
                            <img
                              src={chatDetails?.avatar.url}
                              alt={`${chatDetails?.firstName} ${chatDetails?.lastName} `}
                              className="w-10 h-10 rounded-full"
                            />
                            <span
                              className={`absolute bottom-0 right-0 w-4 h-4 rounded-full ${
                                isOnline ? "bg-green-500" : "bg-gray-400"
                              } border-2 border-white`}
                              title={isOnline ? "Online" : "Offline"}
                            />
                          </div>
                          <span
                            className={`font-medium ${
                              isSidebarCollapsed && "hidden"
                            }`}
                          >
                            {`${chatDetails?.firstName} ${chatDetails?.lastName} `}
                          </span>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>

      {GetDmMoal(toggleNewDmModal, isNewDmModalOpen)}

      {/* Modals */}
      {/* <NewGroupModal
        onClose={toggleNewGroupModal}
        isOpen={isNewGroupModalOpen}
      /> */}
      {/* {isNewDmModalOpen && <NewDmModal onClose={toggleNewDmModal} />} */}
    </>
  );
};

// const NewGroupModal = ({ onClose, isOpen }) => {
//   return (
//     <Modal title="Group message" onClose={onClose} isOpen={isOpen}>
//       <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
//         <div className="bg-white p-6 rounded-lg w-96">
//           <h2 className="text-2xl font-semibold mb-4">Create New Group</h2>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Group Name
//             </label>
//             <input
//               type="text"
//               className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
//               placeholder="Enter group name"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Participants
//             </label>
//             {/* Add participant selection here */}
//           </div>

//           <div className="flex justify-end space-x-2">
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={onClose}
//               className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
//             >
//               Create Group
//             </button>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// const NewDmModal = ({ onClose }) => {
//   const [selectChat, setSelectChat] = useState([]);
//   // const dispatch = useDispatch();
//   const { allUsers } = useSelector((state) => state.DashboardStates);
//   const { onlineUsers } = useSelector((state) => state.AuthStates);
//   //

//   const handleSelectChat = (user) => {
//     if (selectChat.length > 1) return;
//     setSelectChat([user]);
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-6 rounded-lg w-96">
//         <h2 className="text-2xl font-semibold mb-4">New DM</h2>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Select a person to chat
//           </label>
//           {/* Add user selection for DM */}
//           <ul className="space-y-2">
//             {allUsers.map((dm) => (
//               <li
//                 key={dm._id}
//                 className={
//                   dm._id === selectChat[0]?.userId ? "selected-chat" : ""
//                 }
//               >
//                 <button
//                   onClick={() =>
//                     handleSelectChat({
//                       userId: dm._id,
//                       name: `${dm.firstName} ${dm.lastName}`,
//                       type: "dm",
//                     })
//                   }
//                   className="block p-2 rounded hover:bg-gray-200"
//                 >
//                   <div className="flex items-center space-x-3">
//                     <div className="relative w-10 h-10 bg-gray-300 rounded-full">
//                       <img
//                         src={dm?.avatar.url}
//                         alt={`${dm?.firstName} ${dm?.lastName}`}
//                         className="w-10 h-10 rounded-full"
//                       />

//                       <span
//                         className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
//                           onlineUsers?.some(
//                             (onlineUser) => onlineUser.userId === dm._id
//                           )
//                             ? "bg-green-500"
//                             : "bg-gray-400"
//                         } border-2 border-white`}
//                         title={dm.isOnline ? "Online" : "Offline"}
//                       />
//                     </div>
//                     <span className="font-medium">
//                       {dm.firstName} {dm.lastName}
//                     </span>
//                   </div>
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="flex justify-end space-x-2">
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onClose}
//             className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
//           >
//             Start Chat
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

export default Sidebar;
