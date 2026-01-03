// Reusable animation utilities for architectural design
import { motion } from 'framer-motion'

// Fade in up animation
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
}

// Fade in with delay
export const fadeInUpDelay = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }
})

// Scale in animation
export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
}

// Stagger children animation
export const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

// Slide in from left
export const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
}

// Slide in from right
export const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
}

// Hover scale effect
export const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2 }
}

// Hover lift effect
export const hoverLift = {
  whileHover: { y: -8, transition: { duration: 0.3 } },
  transition: { duration: 0.3 }
}

// Draw line animation (for architectural lines)
export const drawLine = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { duration: 1, ease: [0.4, 0, 0.2, 1] }
}

// Parallax effect
export const parallaxVariants = {
  initial: { y: 0 },
  animate: (custom) => ({
    y: custom * 0.5,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  })
}

// Motion component wrapper
export const MotionDiv = motion.div
export const MotionSection = motion.section
export const MotionH1 = motion.h1
export const MotionH2 = motion.h2
export const MotionP = motion.p

