import { useRef, useState } from 'react';

interface Props {
  text: string;
  allowedCharacters: string[];
}

/**
 * @param {string} text - The original text to apply glitch effect.
 * @param {string[]} allowedCharacters - The characters to be used for glitch effect.
 * @returns {Function} - The hover event handler.
 * @returns {string} - The glitch text state variable.
 * @description Custom hook to apply glitch effect on hover.
 *
 * Functionality: On hover, the text will be replaced with random characters from the allowed characters.
 * @example
 * Step 1: HELLO (original text)
 * Step 2: XYYZZ (text replaced on hover with random characters from the allowed characters)
 * Step 3: HYYZZ
 * Step 4: HEYZZ (iterate one character (replace it from original text) at a time and replace rest of the text (to the end of the string) with the random characters)
 * ...
 * Step n: HELLO (back to original text)
 */
export function useGlitchTextOnHover({ text, allowedCharacters }: Props): {
  handleGlitchTextHover: () => void;
  glitchText: string;
} {
  const [glitchText, setGlitchText] = useState<string>(text);
  const isInProgressRef = useRef<boolean>(false);

  return {
    handleGlitchTextHover: () => {
      if (isInProgressRef.current) {
        return;
      }
      isInProgressRef.current = true;

      const randomizedText = text
        .split('')
        .map(() => {
          const randomIndex = Math.floor(
            Math.random() * allowedCharacters.length,
          );
          return allowedCharacters[randomIndex];
        })
        .join('');

      for (let i = 0; i < text.length; i++) {
        const nextTextIndex = i + 1;
        const glitchTempText =
          text.substring(0, nextTextIndex) +
          randomizedText.substring(nextTextIndex);

        setTimeout(() => {
          setGlitchText(glitchTempText);
          if (nextTextIndex === text.length) {
            isInProgressRef.current = false;
            setGlitchText(text);
          }
        }, i * 15);
      }
    },
    glitchText,
  };
}
