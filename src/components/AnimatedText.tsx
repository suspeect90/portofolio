import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface CharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const CharSpan: React.FC<CharProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none" aria-hidden="true">
        {char}
      </span>
      <motion.span
        style={{ opacity }}
        className="absolute inset-0"
        aria-hidden="true"
      >
        {char}
      </motion.span>
    </span>
  );
};

export interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const totalChars = text.length;
  let charIndexCounter = 0;

  // Split into words to prevent unnatural character breaks across line wraps
  const words = text.split(' ');

  return (
    <p
      ref={containerRef}
      className={`text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] text-[clamp(1rem,2vw,1.35rem)] ${className}`}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wordIndex) => {
          const wordChars = word.split('');
          const renderedWord = (
            <span key={wordIndex} className="inline-block whitespace-nowrap">
              {wordChars.map((char) => {
                const currentIndex = charIndexCounter++;
                const start = currentIndex / totalChars;
                const end = Math.min(1, (currentIndex + 2) / totalChars);
                return (
                  <CharSpan
                    key={currentIndex}
                    char={char}
                    progress={scrollYProgress}
                    range={[start, end]}
                  />
                );
              })}
            </span>
          );

          // Add spacing between words
          if (wordIndex < words.length - 1) {
            charIndexCounter++; // count the space
            return (
              <React.Fragment key={wordIndex}>
                {renderedWord}
                <span className="inline-block">&nbsp;</span>
              </React.Fragment>
            );
          }

          return renderedWord;
        })}
      </span>
    </p>
  );
};

export default AnimatedText;
