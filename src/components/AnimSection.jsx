import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { fadeUpVariant } from './animVariants';

export function AnimSection({ children, delay = 0, className = '' }) {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={fadeUpVariant}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGrid({ children, className = '', stagger = 0.1 }) {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}
