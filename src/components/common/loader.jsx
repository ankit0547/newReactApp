import { useSelector } from "react-redux";

const Loader = () => {
  const { processing } = useSelector((state) => state.ApplicationStates);

  return (
    processing && (
      <div className="flex justify-center items-center min-h-screen loader">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    )
  );
};

export default Loader;
