"use client"
import React from "react";

function CtaButton({ children, clickFunction , changeStyle }) {
  return (
    <button
      className={ changeStyle ? changeStyle : `bg-linear-to-r from-primary/80 to-primary py-4 px-8 rounded-2xl text-white text-sm font-body shadow-xl  hover:bg-secondary-foreground hover:scale-105 transition-all delay-50 uppercase `}
      onClick={clickFunction ?? (() => {})}
    >
      {children}
    </button>
  );
}

export default CtaButton;
