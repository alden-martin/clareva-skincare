"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Ingredeints({ ingredeints }) {
  const [indexState, setIndexState] = useState(0);

  return (
    <div className="my-10">
      {ingredeints.map((ingredeint, index) => (
        <div
          key={index}
          className="border-y border-secondary py-5 mb-3"
        >
          {/* Upper Section */}
          <div
            className="flex justify-between items-center group cursor-pointer"
            onClick={() => setIndexState(index)}
          >
            <div className="flex flex-row items-center gap-x-2">
              <h4 className="font-body text-xs text-text/50">
                {"0" + (index + 1)}
              </h4>

              <h1 className="font-heading text-2xl font-bold transition-colors group-hover:text-primary">
                {ingredeint.name}
              </h1>
            </div>

            <p className="text-xs font-body text-primary">
              {ingredeint.per}
            </p>
          </div>

          {/* Lower Description */}
          <AnimatePresence>
            {index === indexState && (
              <motion.p
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden text-text/50 text-sm text-center my-2"
              >
                {ingredeint.description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default Ingredeints;