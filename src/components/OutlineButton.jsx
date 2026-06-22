import React from "react";

function OutlineButton({ children }) {
  return (
    <button className="border border-primary py-4 px-8 rounded-2xl text-black text-sm font-body capitalize hover:bg-secondary-foreground/80 transition-colors hover:text-white hover:scale-105 delay-50">
      {children.toUpperCase()}
    </button>
  );
}

export default OutlineButton;
