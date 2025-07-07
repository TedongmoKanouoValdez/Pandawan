declare module 'react-highlight-words' {
  import * as React from 'react';
  const Highlighter: React.ComponentType<{
    highlightClassName?: string;
    searchWords: string[];
    autoEscape?: boolean;
    textToHighlight: string;
    highlightStyle?: React.CSSProperties;
    caseSensitive?: boolean;
  }>;
  export default Highlighter;
}
