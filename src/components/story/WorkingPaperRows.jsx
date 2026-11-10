import React from 'react'
import { motion, useTransform } from 'framer-motion'
import { NO_SKIP_CONFIG } from '../../config/pacingConfig'
import { EASINGS } from '../../styles/motionTokens'

export function WorkingPaperRows({
  scrollYProgress,
  shouldStack = false,
  isMobile = false,
  shouldReduceMotion = false,
  arrivedByJump = false,
}) {
  const row2Op = useTransform(scrollYProgress, [0.06, 0.16], [0, 1], { ease: EASINGS.easeInOut })
  const row2Y = useTransform(scrollYProgress, [0.06, 0.16], [10, 0], { ease: EASINGS.easeInOut })
  const row3Op = useTransform(scrollYProgress, [0.16, 0.26], [0, 1], { ease: EASINGS.easeInOut })
  const row3Y = useTransform(scrollYProgress, [0.16, 0.26], [10, 0], { ease: EASINGS.easeInOut })
  const row4Op = useTransform(scrollYProgress, [0.26, 0.36], [0, 1], { ease: EASINGS.easeInOut })
  const row4Y = useTransform(scrollYProgress, [0.26, 0.36], [10, 0], { ease: EASINGS.easeInOut })

  const staggerS = NO_SKIP_CONFIG.popStaggerMs / 1000
  const mobileProps = isMobile && !shouldReduceMotion
    ? { initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.35 } }
    : {}

  const jumpProps = (idx) =>
    arrivedByJump && !shouldStack
      ? {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: idx * staggerS, ease: EASINGS.easeOut },
        }
      : {}

  return (
    <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-calm-subtle rounded-xl p-4 border border-slate-100">
      <motion.div {...mobileProps} className="will-change-transform">
        <span className="text-navy-400 block text-[10px] uppercase">Entity</span>
        <span className="text-navy font-semibold truncate block">Gulf Horizon PJSC</span>
      </motion.div>

      <motion.div
        {...mobileProps}
        {...jumpProps(1)}
        style={shouldStack || arrivedByJump ? {} : { opacity: row2Op, y: row2Y }}
        className="will-change-transform"
      >
        <span className="text-navy-400 block text-[10px] uppercase">Audit Period</span>
        <span className="text-navy font-semibold block">Q3 Statutory Audit</span>
      </motion.div>

      <motion.div
        {...mobileProps}
        {...jumpProps(2)}
        style={shouldStack || arrivedByJump ? {} : { opacity: row3Op, y: row3Y }}
        className="will-change-transform"
      >
        <span className="text-navy-400 block text-[10px] uppercase">Documents Reconciled</span>
        <span className="text-navy font-semibold block whitespace-nowrap">412 of 412 Vouchers</span>
      </motion.div>

      <motion.div
        {...mobileProps}
        {...jumpProps(3)}
        style={shouldStack || arrivedByJump ? {} : { opacity: row4Op, y: row4Y }}
        className="will-change-transform"
      >
        <span className="text-navy-400 block text-[10px] uppercase">Net Variance</span>
        <span className="text-green-700 font-bold block whitespace-nowrap">AED 0.00 (Balanced)</span>
      </motion.div>
    </div>
  )
}

export default WorkingPaperRows
