import React from "react";

export default function Popup (props) {
  return (
    <div className="  fixed bg-indigo-400  min-h-min inset-0 z-50 "  style={{marginLeft:"65vw", marginTop:"50vh"}}>
      <div className="popup-inner">
        <button className="bg-red-600 " onClick={props.handleClose}>
          &times; {props.emotion}
        </button>
        
        <div className=" bg-slate-400 w-96" style={{width:"34vw",height:"42vh"}}>{props.content}</div>
      </div>
    </div>
  );
};

