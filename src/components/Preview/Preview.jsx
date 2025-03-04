import React, { useEffect, useRef } from 'react';
import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/dist/contrib/auto-render.min';

export const Preview = ({ content }) => {
  const previewRef = useRef(null);

  useEffect(() => {
    if (previewRef.current) {
      try {
        previewRef.current.innerHTML = content.preview;
        
        renderMathInElement(previewRef.current, {
          delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "$", right: "$", display: false},
            {left: "\\[", right: "\\]", display: true},
            {left: "\\(", right: "\\)", display: false}
          ],
          throwOnError: false,
          errorColor: '#cc0000',
          strict: false,
          trust: true,
          macros: {
            "\\eqref": "\\href{###1}{(\\text{#1})}",
            "\\label": "\\htmlId{#1}",
            "\\ref": "\\href{###1}{\\text{#1}}"
          }
        });
      } catch (error) {
        console.error('Preview rendering error:', error);
      }
    }
  }, [content]);

  return (
    <div className="preview-content" ref={previewRef} />
  );
}; 