import {ReactNode} from 'react';

export type SwipeModalProps = {
  bottomOffset?: number;
  topOffset?: number;
  bounceToTopCallback: () => void;
  bounceToMiddleCallback: () => void;
  bounceToBottomCallback: () => void;
  panningCallback: () => void;
  children: ReactNode;
};
