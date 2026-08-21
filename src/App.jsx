import React, { useState, useTransition, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
} from "./features/counterSlice";

// Production spring config: stiff, non-bouncy, instantaneous tactile feel
const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.5,
};

export default function App() {
  const [value, setValue] = useState("");
  const [, startTransition] = useTransition();
  const inputId = useId();

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const handleStepSubmit = (e) => {
    e.preventDefault();
    const parsed = parseInt(value, 10);
    if (Number.isNaN(parsed) || parsed === 0) return;

    // Offload Redux state dispatch to non-blocking transition for high frame-rate UI
    startTransition(() => {
      dispatch(incrementByAmount(parsed));
      setValue("");
    });
  };

  return (
    <main className="min-h-screen bg-[#090A0F] text-[#E2E8F0] flex flex-col items-center justify-center p-4 font-mono antialiased selection:bg-indigo-500/20 selection:text-indigo-300">
      <div className="w-full max-w-[360px] bg-[#11131F] border border-white/[0.08] rounded-xl p-5 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.7)] space-y-5">
        {/* Header Metadata */}
        <header className="flex items-center justify-between text-[11px] text-slate-500 tracking-wider uppercase border-b border-white/[0.06] pb-3">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            Counter_Store
          </span>
          <span className="text-[10px] bg-white/[0.04] border border-white/[0.06] px-1.5 py-0.5 rounded text-slate-400">
            RTK v2.0
          </span>
        </header>

        {/* Tabular Animated Display */}
        <section className="py-2 flex flex-col items-center justify-center">
          <div className="relative h-16 w-full flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={count}
                initial={{ opacity: 0, y: count > 0 ? 16 : -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: count > 0 ? -16 : 16 }}
                transition={SPRING_TRANSITION}
                className="text-5xl font-extrabold tracking-tight text-white font-mono tabular-nums absolute"
              >
                {count}
              </motion.span>
            </AnimatePresence>
          </div>
        </section>

        {/* Primary Controls */}
        <div className="grid grid-cols-2 gap-2">
          <motion.button
            whileTap={{ scale: 0.97 }}
            transition={SPRING_TRANSITION}
            onClick={() => dispatch(decrement())}
            aria-label="Decrement count"
            className="h-10 bg-white/[0.03] hover:bg-white/[0.08] active:bg-white/[0.12] border border-white/[0.08] text-slate-200 rounded-lg text-xs font-semibold tracking-wide transition-colors duration-75 flex items-center justify-center gap-1.5"
          >
            <span>−</span>
            <span>DECREMENT</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            transition={SPRING_TRANSITION}
            onClick={() => dispatch(increment())}
            aria-label="Increment count"
            className="h-10 bg-white/[0.03] hover:bg-white/[0.08] active:bg-white/[0.12] border border-white/[0.08] text-slate-200 rounded-lg text-xs font-semibold tracking-wide transition-colors duration-75 flex items-center justify-center gap-1.5"
          >
            <span>+</span>
            <span>INCREMENT</span>
          </motion.button>
        </div>

        {/* Step Input Form */}
        <form onSubmit={handleStepSubmit} className="space-y-1.5">
          <label htmlFor={inputId} className="sr-only">
            Custom step value
          </label>
          <div className="flex gap-2">
            <input
              id={inputId}
              type="number"
              value={value}
              placeholder="Custom offset..."
              onChange={(e) => setValue(e.target.value)}
              className="w-full h-10 px-3 bg-black/40 border border-white/[0.08] focus:border-indigo-500/80 rounded-lg text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all font-mono tabular-nums"
            />
            <motion.button
              whileTap={{ scale: 0.97 }}
              transition={SPRING_TRANSITION}
              type="submit"
              disabled={!value}
              className="h-10 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white text-xs font-semibold rounded-lg transition-colors duration-75 whitespace-nowrap shadow-sm"
            >
              APPLY
            </motion.button>
          </div>
        </form>

        {/* Footer */}
        <footer className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
          <button
            onClick={() => {
              dispatch(reset());
              setValue("");
            }}
            className="text-[11px] text-slate-500 hover:text-slate-300 font-medium transition-colors"
          >
            Reset to zero
          </button>
          <span className="text-[10px] text-slate-600">STATE_OK</span>
        </footer>
      </div>
    </main>
  );
}
