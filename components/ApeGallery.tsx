'use client';

import { useState, useEffect, useRef } from 'react';
import { SearchInput } from './SearchInput';
import { FilterButton } from './FilterButton';

type ApeMap = Record<string, string>;
const IMAGE_HEIGHT = 180; // altezza media thumbnail + testo
const BUFFER_ROWS = 3;

export const ApeGallery = () => {
  const [apeMap, setApeMap] = useState<ApeMap>({});
  const [searchValue, setSearchValue] = useState('');
  const [filteredIds, setFilteredIds] = useState<string[]>([]);
  const [visibleStart, setVisibleStart] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Carica JSON da /public/apes.json
  useEffect(() => {
    const load = async () => {
      const res = await fetch('/apes.json');
      const data = await res.json();
      setApeMap(data);
      setFilteredIds(Object.keys(data).sort((a, b) => Number(a) - Number(b)));
    };
    load();
  }, []);

  // Filtra per ID (ricerca)
  useEffect(() => {
    if (!searchValue) {
      setFilteredIds(Object.keys(apeMap).sort((a, b) => Number(a) - Number(b)));
    } else {
      const filtered = Object.keys(apeMap).filter((id) =>
        id.includes(searchValue)
      );
      setFilteredIds(filtered.sort((a, b) => Number(a) - Number(b)));
    }
  }, [searchValue, apeMap]);

  // Rileva scroll per capire quante righe devono essere mostrate
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const scrollTop = el.scrollTop;
      const startRow = Math.floor(scrollTop / IMAGE_HEIGHT);
      setVisibleStart(startRow);
    };

    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (v: string) => setSearchValue(v);

  // Calcola numero righe visibili
  const totalVisible = Math.ceil(typeof window !== 'undefined' ? window.innerHeight / IMAGE_HEIGHT : 6);
  const start = Math.max(0, visibleStart - BUFFER_ROWS);
  const end = Math.min(filteredIds.length, visibleStart + totalVisible + BUFFER_ROWS);

  const visibleIds = filteredIds.slice(start, end);

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
        className="mt-10 h-[calc(100vh-160px)] overflow-y-auto px-4"
      >
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(auto-fit, minmax(120px, 1fr))` }}
        >
          {visibleIds.map((id) => (
            <div key={id} className="flex flex-col items-center">
              <img
                src={apeMap[id]}
                alt={`Ape ${id}`}
                loading="lazy"
                className="rounded-xl w-full object-cover border border-gray-600 hover:scale-105 transition"
              />
              <p className="text-sm text-gray-300 mt-2">#{id}</p>
            </div>
          ))}
        </div>
      </div>

      {visibleIds.length === 0 && (
        <div className="text-center mt-10 font-ethnocentric">No apes found.</div>
      )}
    </>
  );
};
