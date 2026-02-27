"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  header: React.ReactNode;
  children: React.ReactNode;
}

export default function ExpandingCard({ header, children }: Props) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <motion.div
      layout
      onClick={() => setExpanded(!expanded)}
      className="bg-black border border-[#00ffcc]/40 rounded-2xl p-6 shadow-lg shadow-[#00ffcc]/10 cursor-pointer"
    >
      {header}

      <AnimatePresence>
        {expanded && (
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mt-6"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}