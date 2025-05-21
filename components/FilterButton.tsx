import React from 'react';

interface FilterButtonProps {
  title: string;
}

export const FilterButton: React.FC<FilterButtonProps> = ({ title }) => {
  return (
    <button className="filter-button">
      {title}
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" width="24" height="24">
        <path d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
};