import React, { createContext, useContext } from 'react';

interface ScrollContextType {
  scrollProgress: number;
}

const ScrollContext = createContext<ScrollContextType>({ scrollProgress: 0 });

export const ScrollProvider = ScrollContext.Provider;
export const useScroll = () => useContext(ScrollContext);