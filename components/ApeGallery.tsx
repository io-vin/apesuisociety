'use client';

import { useState, useEffect, useRef } from 'react';
import { SearchInput } from './SearchInput';
import { FilterButton } from './FilterButton';

type ApeMap = Record<string, string>;
const IMAGE_HEIGHT = 200; // thumbnail + nome + padding
const BUFFER = 6; // buffer immagini extra visibili

export const ApeGallery = () => {
  const [apeMap, setApeMap] = useState<ApeMap>({});
  const [searchValue, setSearchValue] = useState('');
  const [filteredIds, setFilteredIds] = useState<string[]>([]);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch apeMap
  useEffect(() => {
    const load = async () => {
      const res = await fetch('/apes.json');
      const json = await res.json();
      const sorted = Object.keys(json).sort((a, b) => Number(a) - Number(b));
      setApeMap(json);
      setFilteredIds(sorted);
    };
    load();
  }, []);

  // Update height on mount & resize
  useEffect(() => {
    const update = () => {
      setViewportHeight(window.innerHeight - 180); // spazio tolto a navbar e filtri
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Update scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      setScrollTop(container.scrollTop);
    };
    container.addEventListener('scroll', onScroll);
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  // Search
  useEffect(() => {
    if (!searchValue) {
      setFilteredIds(Object.keys(apeMap).sort((a, b) => Number(a) - Number(b)));
    } else {
      const result = Object.keys(apeMap)
        .filter((id) => id.includes(searchValue))
        .sort((a, b) => Number(a) - Number(b));
      setFilteredIds(result);
    }
  }, [searchValue, apeMap]);

  const handleSearch = (value: string) => setSearchValue(value);

  const itemsPerPage = Math.ceil(viewportHeight / IMAGE_HEIGHT) + BUFFER;
  const startIndex = Math.max(0, Math.floor(scrollTop / IMAGE_HEIGHT) - BUFFER);
  const visibleIds = filteredIds.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <div className="flex flex-col mt-[80px] ml-5">
        <SearchInput value={searchValue} onChange={handleSearch} />
        <div className="flex flex-wrap gap-2 mt-2">
          <FilterButton title="Background" />
          <FilterButton title="Fur" />
          <FilterButton title="Clothes" />
          <FilterButton title="Eyes" />
          <FilterButton title="Mouth" />
          <FilterButton title="Hat" />
          <FilterButton title="Earring" />
        </div>
      </div>

      <div
        ref={containerRef}
        className="mt-6 h-[calc(100vh-180px)] overflow-y-auto px-4"
      >
        <div
          style={{ height: filteredIds.length * IMAGE_HEIGHT }}
          className="relative"
        >
          {visibleIds.map((id) => {
            const index = filteredIds.indexOf(id);
            const top = index * IMAGE_HEIGHT;

            return (
              <div
                key={id}
                className="absolute w-[120px] sm:w-[150px]"
                style={{ top, left: 0 }}
              >
                <img
                  src={apeMap[id]}
                  alt={`Ape ${id}`}
                  loading="lazy"
                  className="rounded-xl w-full object-cover border border-gray-600 hover:scale-105 transition"
                />
                <p className="text-sm text-gray-300 mt-2 text-center">#{id}</p>
              </div>
            );
          })}
        </div>
      </div>

      {visibleIds.length === 0 && (
        <div className="text-center mt-10 font-ethnocentric">
          No apes found matching #{searchValue}
        </div>
      )}
    </>
  );
};
