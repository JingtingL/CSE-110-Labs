'toggleHeart.tsx'
import React, { useState, useEffect, useContext } from 'react';
import fillHeart from "./vecteezy_heart_1187397.png"
import emptyHeart from "./Empty-Heart.png"
import NoteTitlesList from './NoteTitlesList'; // Import the new component
import exp from 'constants';
import { stat } from 'fs';

// Define the shape of the context
export const hearts = {
    empty: {
      image: emptyHeart
    },
    fill: {
      image: fillHeart
    },
   };

let status: boolean = false;

// Create the ThemeContext
export const LikeContext = React.createContext(hearts.empty);

const HeartButton = () => {
    const [isFilled, setIsFilled] = useState(false);
    if(isFilled){
      status = true;
    }

    // Toggle the heart state on button click
    const toggleHeart = () => setIsFilled((prev) => !prev);

    return (
      
      <button 
        onClick={toggleHeart} 
        className="heart-button"
      >

      <img
        src={isFilled ? hearts.fill.image : hearts.empty.image}
        alt={isFilled ? 'Filled Heart' : 'Empty Heart'}
        className="heart-image"
      />
    </button>
    
    )

};

export const heartStatus: boolean = false;
export default HeartButton; 