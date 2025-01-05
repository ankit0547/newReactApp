import { useDispatch } from "react-redux";
import { getAction } from "../../redux/util/util";

const DashHeader = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(getAction("USER_LOGOUT"));
  };
  return (
    <>
      <header className="">
        <div className="flex items-center justify-between p-4 bg-white border-b">
          <h3 className="text-lg font-semibold">{"Select a chat"}</h3>
          <button
            className="text-red-600 hover:text-red-800"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>
    </>
  );
};

export default DashHeader;
