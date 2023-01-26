import { useNavigate } from "react-router-dom";
import UserInput from "./UserInput";
import classes from "./HomePage.module.css";

const HomePage: React.FC = (props: any) => {
  const navigate = useNavigate();

  function navigationHandler() {
    navigate('./game');
  } 

  return (
    <div>
      <div className={classes.header}> My Home page</div>
      <UserInput onStart={navigationHandler}></UserInput>
    </div>
  );
};

export default HomePage;
