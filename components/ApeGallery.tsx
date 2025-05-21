// components/ApeGallery.tsx
'use client';

import { useState, useEffect } from 'react';
import { FilterButton } from './FilterButton';
import { SearchInput } from './SearchInput';

export const ApeGallery = () => {
  const [images, setImages] = useState<number[]>([]);
  const [imagesPerRow, setImagesPerRow] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [filteredImages, setFilteredImages] = useState<number[]>([]);

  useEffect(() => {
    function calculateNumberOfImages() {
      const windowWidth = window.innerWidth;
      if (windowWidth < 576) {
        return Math.floor(windowWidth / 100);
      } else {
        return Math.floor((windowWidth - 120) / 140);
      }
    }

    function generateImages() {
      const imagesCount = calculateNumberOfImages();
      setImagesPerRow(imagesCount);
      
      // Generate 100 images for demo (would be 10000 in production)
      const imageIndexes = Array.from({ length: 100 }, (_, i) => i + 1);
      setImages(imageIndexes);
      setFilteredImages(imageIndexes); // Initially all images are shown
    }

    generateImages();
    
    const handleResize = () => {
      generateImages();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter images based on search input
  useEffect(() => {
    if (!searchValue) {
      setFilteredImages(images);
      return;
    }

    const filtered = images.filter(imageIndex => 
      imageIndex.toString().includes(searchValue)
    );
    setFilteredImages(filtered);
  }, [searchValue, images]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const createRows = () => {
    const rows = [];
    for (let i = 0; i < filteredImages.length; i += imagesPerRow) {
      const rowImages = filteredImages.slice(i, i + imagesPerRow);
      rows.push(rowImages);
    }
    return rows;
  };

  return (
    <>
      <div className="flex flex-col mt-[80px] ml-5">
        <SearchInput value={searchValue} onChange={handleSearch} />
        
        <FilterButton title="Background" />
        <FilterButton title="Fur" />
        <FilterButton title="Clothes" />
        <FilterButton title="Eyes" />
        <FilterButton title="Mouth" />
        <FilterButton title="Hat" />
        <FilterButton title="Earring" />
      </div>

      <div className="image-gallery">
        {filteredImages.length > 0 ? (
          createRows().map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="image-row">
              {row.map((imageIndex) => (
                <div key={`image-${imageIndex}`} className="image-item">
                  <img 
                    src={`https://shdw-drive.genesysgo.net/tmPsyPrSsdFpcGx9etB2dJwYEKesPChmyfefis3G3dp/${imageIndex}.png`} 
                    alt={`Ape ${imageIndex}`} 
                    className="thumbnail" 
                  />
                  <p className="thumbnail-number">{imageIndex}</p>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="w-full text-center mt-10 font-ethnocentric">
            No apes found matching #{searchValue}
          </div>
        )}
      </div>
    </>
  );
};