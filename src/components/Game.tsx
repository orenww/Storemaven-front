import React, { useContext, useEffect, useState } from "react";
import UserContext from "../store/user-context";
import classes from "./Game.module.css";
import Indicator from "./Indicator";
import { useNavigate } from "react-router-dom";

const Game: React.FC = (props: any) => {
  const [gameState, setGameState] = useState<"waiting" | "showing" | "finish">(
    "waiting"
  );
  const [direction, setDirection] = useState<"left" | "right">("left");
  const navigate = useNavigate();
  const ctx = useContext(UserContext);

  const [error, setError] = useState<{
    type: "mistake" | "success" | "init";
    msg: "Lets Play" | "Too Soon" | "Too Late" | "Wrong Key" | "Success";
  }>({ type: "init", msg: "Lets Play" });

  useEffect(() => {
    if (!ctx.userName || ctx.userName === "") {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    switch (gameState) {
      case "waiting":
        setTimeout(() => {
          setGameState("finish");          
        }, getRandomWaiting());
        break;
      case "showing":
        setTimeout(() => {
          setGameState("waiting");
        }, 1000);
        break;
      case "finish":
        setTimeout(() => {
          setGameState("showing");
        }, 1000);
        break;
    }
  }, [gameState]);

  useEffect(() => {
    updateRandomDirection();
    const listener = (e: KeyboardEvent) => {
      handleUserInput(e.key);
    };

    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [gameState, direction]);

  const handleUserInput = (key: string) => {

    switch (gameState) {
      case "waiting":
        setError({ type: "mistake", msg: "Too Soon" });
        break;
      case "finish":
        setError({ type: "mistake", msg: "Too Late" });
        break;
      default:
        if (direction === "left" && key === "a") {
          setError({ type: "success", msg: "Success" });
          sendRequest();
        } else if (direction === "right" && key === "l") {
          setError({ type: "success", msg: "Success" });
          sendRequest();
        } else {
          setError({ type: "mistake", msg: "Wrong Key" });
        }
    }
  };

  const sendRequest = async () => {
    try {
      const response = await fetch("api/v1/users", {
        method: "POST",
        body: JSON.stringify({ userName: ctx.userName }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log("error - ", error);
    }
  };

  const getRandomWaiting = () => {
    let rand = Math.random();
    rand = Math.floor(rand * 3);
    rand = rand + 2;
    console.log(rand * 1000);
    return rand * 1000;
  };

  const updateRandomDirection = () => {
    let value = Math.round(Math.random());
    setDirection(value === 0 ? "left" : "right");
  };

  return (
    <div>
      {gameState === "showing" && <Indicator direction={direction}></Indicator>}

      <div className={`${classes.bottom} ${classes[error.type]}`}>
        <p className={classes.center}>{error.msg}</p>
      </div>
    </div>
  );
};

export default Game;
