import { createContext, useContext } from 'react';

const ScrollPositionContext = createContext({
	position: 0,
	setPosition: (pos: number) => {},
});

export const useScrollPosition = () => useContext(ScrollPositionContext);

export default ScrollPositionContext;
