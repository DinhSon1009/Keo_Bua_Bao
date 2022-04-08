import React from "react";
import "./Game.css";
import images from "../../constants/images";
import Bubble from "../../components/Bubble";
import { useReducer } from "react";
import swal from "sweetalert";

const initialGame = {
  gameInfo: {
    playerImg: images.keo,
    soLanThang: 0,
    soLanChoi: 0,
    computerImg: null,
  },
  clickedItem: null,
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case "clickedItem": {
      return {
        ...state,
        gameInfo: { ...state.gameInfo, playerImg: action.item },
        clickedItem: action.number,
      };
    }
    case "computerChoose": {
      return {
        ...state,
        gameInfo: { ...state.gameInfo, computerImg: action.item },
      };
    }
    case "result": {
      let cloneObj = { ...state.gameInfo };
      if (action.result === "win") {
        cloneObj.soLanThang = cloneObj.soLanThang + 1;
      }
      return {
        ...state,
        gameInfo: {
          ...state.gameInfo,
          soLanChoi: state.gameInfo.soLanChoi + 1,
          soLanThang: cloneObj.soLanThang,
        },
        clickedItem: null,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

const Game = () => {
  let [game, dispatch] = useReducer(gameReducer, initialGame);

  const handleSelection = (itemClicked, number) => {
    dispatch({
      type: "clickedItem",
      item: itemClicked,
      number: number,
    });
  };
  const winningConditions = [
    [0, 2],
    [1, 0],
    [2, 1],
  ];
  const imageArray = [images.keo, images.bua, images.bao];
  const handlePlay = (playerChoose) => {
    let result = "lose";
    if (playerChoose === null) {
      return swal("Game information :", "Vui lòng chọn kéo búa bao!", "info");
    }

    let number = Math.floor(Math.random() * 3);
    dispatch({
      type: "computerChoose",
      item: imageArray[number],
    });
    for (let i = 0; i <= 2; i++) {
      let a = winningConditions[i][0];
      let b = winningConditions[i][1];
      if (playerChoose === a && number === b) {
        result = "win";
        swal("Iron man vô đối", "I love you 3000 !", images.player);
        break;
      } else if (playerChoose === number) {
        result = "draw";
        swal("Draw!!!", "....", images.player);
        break;
      }
    }
    if (result === "lose") {
      swal("1 búng...", "Dăm ba thằng iron man!", images.playerComputer);
    }
    dispatch({
      type: "result",
      result: result,
    });
  };
  return (
    <div
      className="container"
      style={{ backgroundImage: `url(${images.bgGame})` }}
    >
      <div className="left">
        <Bubble luaChon={game.gameInfo.playerImg} />
        <div className="left__image">
          <img src={images.player} alt="iron man" />
        </div>
        <div className="box">
          <div
            className={`select bua ${game.clickedItem === 0 ? "active" : ""}`}
            onClick={() => handleSelection(images.keo, 0)}
          >
            <img src={images.keo} alt="keo" />
          </div>
          <div
            className={`select bua ${game.clickedItem === 1 ? "active" : ""}`}
          >
            <img
              src={images.bua}
              alt="bua"
              onClick={() => handleSelection(images.bua, 1)}
            />
          </div>
          <div
            className={`select bua ${game.clickedItem === 2 ? "active" : ""}`}
          >
            <img
              src={images.bao}
              alt="bao"
              onClick={() => handleSelection(images.bao, 2)}
            />
          </div>
        </div>
      </div>
      <div className="middle">
        <div className="top">
          <h2 className="title">I'm iron man, i love you 3000 !!</h2>
          <h3>You win : {game.gameInfo.soLanThang}</h3>
          <h3>Play times: {game.gameInfo.soLanChoi}</h3>
        </div>
        <div className="bot">
          <button
            className="btn-play"
            onClick={() => handlePlay(game.clickedItem)}
          >
            PLAY GAME
          </button>
        </div>
      </div>
      <div className="right">
        <Bubble luaChon={game.gameInfo.computerImg} />
        <div className="right__image">
          <img src={images.playerComputer} alt="computer" />
        </div>
      </div>
    </div>
  );
};

export default Game;
