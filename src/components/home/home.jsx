import { useDispatch, useSelector } from "react-redux";
import { getAction } from "../../redux/util/util";

const Home = () => {
  const state = useSelector((state) => state.ApplicationState);
  const dispatch = useDispatch();
  console.log(state);

  const handleClick = () => {
    dispatch(getAction("INCREMENT"));
  };
  return (
    <div>
      <div>Devops</div>
      <button onClick={handleClick}>click</button>
    </div>
  );
};

export default Home;
