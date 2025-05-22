'use client';

import { useState, useEffect } from 'react';
import { FilterButton } from './FilterButton';
import { SearchInput } from './SearchInput';

type ApeMap = Record<string, string>;

const PAGE_SIZE = 100;

export const ApeGallery = () => {
  const [apeMap, setApeMap] = useState<ApeMap>({});
  const [searchValue, setSearchValue] = useState('');
  const [filteredIds, setFilteredIds] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadApeData() {
      const res = await fetch('/apes.json');
      const json = await res.json();
      setApeMap(json);
      setFilteredIds(Object.keys(json));
      setLoading(false);
    }

    loadApeData();
  }, []);

  useEffect(() => {
    if (!searchValue) {
      setFilteredIds(Object.keys(apeMap));
    } else {
      const filtered = Object.keys(apeMap).filter((id) =>
        id.includes(searchValue)
      );
      setFilteredIds(filtered);
      setVisibleCount(PAGE_SIZE); // reset when searching
    }
  }, [searchValue, apeMap]);

  const handleSearch = (value: string) => setSearchValue(value);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const visibleIds = filteredIds.slice(0, visibleCount);

  if (loading) {
    return (
      <div className="text-center text-gray-400 mt-20 font-ethnocentric text-xl">
        Loading Apes...
      </div>
    );
  }

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

      <div className="grid gap-4 px-4 mt-10"
           style={{ gridTemplateColumns: `repeat(auto-fit, minmax(120px, 1fr))` }}>
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

      {visibleCount < filteredIds.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-white text-black font-semibold rounded-xl hover:opacity-80 transition"
          >
            Load More
          </button>
        </div>
      )}

      {visibleIds.length === 0 && (
        <div className="w-full text-center mt-10 font-ethnocentric">
          No apes found matching #{searchValue}
        </div>
      )}
    </>
  );
};
