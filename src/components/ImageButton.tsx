import * as React from 'react';
import { FC } from "react";
interface Props {
  handleClick(): void;
  src: string;
  alt: string;
  className?: string; 
}
const ImageButton: FC<Props> = ({
   handleClick,
   alt,
   src,
   className
 }) => (
    <button 
      onClick={handleClick}
      className={className}>
        <img src={src} alt={alt} />
    </button>
);

export default ImageButton;