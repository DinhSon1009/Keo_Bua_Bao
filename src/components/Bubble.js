import React from "react";
const Bubble = (props) => {
  return (
    <div className="bubble shadow large bottom">
      {props.luaChon ? (
        <img className="" src={props.luaChon} alt="bao" />
      ) : (
        <span style={{ textAlign: "center", fontSize: "14px" }}>
          you will lose anyway, hahaha
        </span>
      )}
    </div>
  );
};

export default Bubble;
