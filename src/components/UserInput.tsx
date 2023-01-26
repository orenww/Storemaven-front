import React, { useState, useEffect, useContext } from "react";
import UserContext from "../store/user-context";


import classes from "./UserInput.module.css";


const UserInput = (props: any) => {

  const ctx = useContext(UserContext);

  const [enteredUserName, setEnteredUserName] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(enteredUserName.trim().length > 0);
    }, 500);

    return () => {      
      clearTimeout(identifier);
    };
  }, [enteredUserName]);

  const userNameChangeHandler = (event: any) => {
    setEnteredUserName(event.target.value);
  };

  const submitHandler = (event: any) => {
    event.preventDefault();
    ctx.userName = enteredUserName 
    props.onStart(enteredUserName);
  };

  return (
    <form className={classes['user-name']} onSubmit={submitHandler}>
      <div
        className={classes.control}
      >
        <label htmlFor="userName">User Name:</label>
        <input
          id="userName"
          value={enteredUserName}
          onChange={userNameChangeHandler}          
        />
      </div>

      <div className={classes.actions}>
        <button type="submit" className={classes.btn} disabled={!formIsValid}>
          Start
        </button>
      </div>
    </form>
  );
};

export default UserInput;
