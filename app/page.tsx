'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HomePage() {
  const [randomImageIndex, setRandomImageIndex] = useState(1);
  const [textColor, setTextColor] = useState('#76c0bf');
  
  useEffect(() => {
    const images = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const colors = [
      '#da080b', // 1.PNG
      '#fba405', // 2.PNG
      '#780707', // 3.PNG
      '#d45c9b', // 4.PNG
      '#76c0bf', // 5.PNG
      '#cb0c11', // 6.PNG
      '#fbf61e', // 7.PNG
      '#52bb9d', // 8.PNG
      '#dbf3fb', // 9.PNG
    ];
    
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImageIndex(images[randomIndex]);
    setTextColor(colors[randomIndex]);
  }, []);

  return (
    <main>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center" style={{ color: textColor }}>
        <h1 className="text-5xl md:text-6xl">Ape Sui Society</h1>
      </div>
      
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[300px] md:w-[400px]">
        <img 
          src={`/${randomImageIndex}.PNG`} 
          alt="Ape" 
          className="w-full h-auto"
        />
      </div>
    </main>
  );
}