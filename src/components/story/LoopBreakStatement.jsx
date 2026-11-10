import React from 'react'
import { motion } from 'framer-motion'
import { STORY_TIME_CONFIG } from '../../config/storyTimeConfig'

/**
 * LoopBreakStatement
 * Beats 4 & 5 of "The loop breaks":
 * 4. Statement: huge display type enters word by word:
 *    "THE LOOP ENDS HERE." then "This is Endloops."
 *    Beneath it, small: "Same work. Less time." (Illustrative scenario stays visible)
 * 5. Release: statement scales down and moves up toward Chapter 3 headline position.
 */
export function LoopBreakStatement({
  statementScale,
  statementY,
  statementOp,
  word1Op,
  word1Y,
  word2Op,
  word2Y,
  word3Op,
  word3Y,
  word4Op,
  word4Y,
  line2Op,
  line2Y,
  sublineOp,
  sublineY,
}) {
  return (
    <motion.div
      style={{
        scale: statementScale,
        y: statementY,
        opacity: statementOp,
      }}
      className="relative z-30 max-w-4xl mx-auto px-6 text-center space-y-4 will-change-transform"
    >
      {/* Eyebrow Label */}
      <motion.div
        style={{ opacity: word1Op }}
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-teal font-semibold"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-teal" />
        <span>System Reset</span>
      </motion.div>

      {/* Main Headline: "THE LOOP ENDS HERE." (Word by Word Slam) */}
      <h1 className="text-display sm:text-[3.5rem] lg:text-[4.5rem] font-display font-black text-navy tracking-tight leading-[1.05]">
        <motion.span
          style={{ opacity: word1Op, y: word1Y }}
          className="inline-block mr-2 sm:mr-4 will-change-transform"
        >
          THE
        </motion.span>
        <motion.span
          style={{ opacity: word2Op, y: word2Y }}
          className="inline-block mr-2 sm:mr-4 will-change-transform"
        >
          LOOP
        </motion.span>
        <motion.span
          style={{ opacity: word3Op, y: word3Y }}
          className="inline-block mr-2 sm:mr-4 text-teal will-change-transform"
        >
          ENDS
        </motion.span>
        <motion.span
          style={{ opacity: word4Op, y: word4Y }}
          className="inline-block will-change-transform"
        >
          HERE.
        </motion.span>
      </h1>

      {/* Second Line: "This is Endloops." */}
      <motion.p
        style={{ opacity: line2Op, y: line2Y }}
        className="text-h2 sm:text-h1 font-display font-extrabold text-navy-700 tracking-tight will-change-transform"
      >
        This is <span className="text-teal font-black">Endloops</span>.
      </motion.p>

      {/* Beneath it, small: "Same work. Less time." */}
      <motion.div
        style={{ opacity: sublineOp, y: sublineY }}
        className="space-y-1.5 will-change-transform"
      >
        <p className="text-body-lg sm:text-h3 font-sans text-navy-600 font-medium max-w-xl mx-auto">
          Same work. Less time.
        </p>
        <p className="text-caption font-mono text-navy-400">
          * {STORY_TIME_CONFIG.illustrativeScenarioLabel}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default LoopBreakStatement
