import React from "react";

function CtaButton({ children }) {
  return (
    <button className="bg-linear-to-r from-primary/80 to-primary py-4 px-8 rounded-2xl text-white text-sm font-body shadow-xl capitalize hover:bg-secondary-foreground hover:scale-105 transition-all delay-50">
      {children.toUpperCase()}
    </button>
  );
}

export default CtaButton;
