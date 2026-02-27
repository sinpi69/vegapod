"use client";

import { motion, AnimatePresence } from "framer-motion";
import * as React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function FloatingPanel({ open, onClose, children }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Background Blur */}
          <motion.div
            className="fixed inset-0 backdrop-blur-md bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Floating Card */}
          <motion.div
            className="fixed z-50 top-1/2 left-1/2 w-[600px] max-w-[90%] -translate-x-1/2 -translate-y-1/2 bg-black border border-[#00ffcc]/40 rounded-2xl p-8 shadow-2xl shadow-[#00ffcc]/20"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}