'use client';

import { useState, useEffect } from 'react';
import { FilterButton } from './FilterButton';
import { SearchInput } from './SearchInput';

type ApeMap = Record<string, string>;

const getOptimizedURL = (url: string) =>
  `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=200&output=webp`;

export const ApeGallery = () => {
  const [apeMap, setApeMap] = useState<ApeMap>({});
  const [imagesPerRow, setImagesPerRow] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [filteredImages, setFilteredImages] = useState<string[]>([]);

  // 1. Calcola immagini per riga
  useEffect(() => {
    const calculate = () => {
      const width = window.innerWidth;
      setImagesPerRow(width < 576 ? Math.floor(width / 100) : Math.floor((width - 120) / 140));
    };

    calculate();
    window.addEventListener('resize', calculate);
    return () => window.removeEventListener('resize', calculate);
  }, []);

  // 2. Carica JSON con gli URL
  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch('/apes.json');
      const json = await res.json();
      setApeMap(json);

      const sortedKeys = Object.keys(json).sort((a, b) => Number(a) - Number(b));
      setFilteredImages(sortedKeys);
    };

    fetchImages();
  }, []);

  // 3. Filtra per ricerca
  useEffect(() => {
    const ids = Object.keys(apeMap);
    const filtered = searchValue
      ? ids.filter((id) => id.includes(searchValue))
      : ids;
    setFilteredImages(filtered.sort((a, b) => Number(a) - Number(b)));
  }, [searchValue, apeMap]);

  const handleSearch = (val: string) => setSearchValue(val);

  const createRows = () => {
    const rows = [];
    for (let i = 0; i < filteredImages.length; i += imagesPerRow) {
      rows.push(filteredImages.slice(i, i + imagesPerRow));
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
              {row.map((id) => (
                <div key={`image-${id}`} className="image-item">
                  <img
                    src={getOptimizedURL(apeMap[id])}
                    alt={`Ape ${id}`}
                    className="thumbnail"
                    loading="lazy"
                  />
                  <p className="thumbnail-number">#{id}</p>
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
