import { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import { getDateFilters } from "../../utils/dateFilters";
import type { FilterConfig, ScrollyItem } from "../../types/types";
import SearchFilter from "./SearchAndFilter";
import CardTable from "./Table";
import {  useScrollys } from "../../hooks/useLandingScrolly";
import { useTheme } from "../../context/ThemeContext";

const itemsPerPage = 10;

const TableWrapper = () => {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
 const [searchQuery, setSearchQuery] = useState('');
const [debouncedSearch, setDebouncedSearch] = useState('');
const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});


 const dateRanges = getDateFilters();
  
  // Date range ko pehle calculate krengee
  const dateRange = activeFilters.date
    ? dateRanges[activeFilters.date as keyof typeof dateRanges]
    : undefined;

  // Fetch page from API
const { data, isFetching } = useScrollys({
  page: currentPage,
  limit: itemsPerPage,
  q: debouncedSearch,
  status: activeFilters.status,
  startDate: dateRange?.from,
  endDate: dateRange?.to,
});

console.log("Date Range:", dateRange);
console.log("Active Filters:", activeFilters);

  const debouncedSetSearch = useCallback(
  debounce((value: string) => {
    setDebouncedSearch(value);
    setCurrentPage(1);
  }, 500),
  []
);

useEffect(() => {
  return () => {
    debouncedSetSearch.cancel();
  };
}, [debouncedSetSearch]);


  const apiItems = data?.items ?? [];
  const totalItems = data?.meta.total ?? 0;

  // Filters config
 const filterConfig: FilterConfig = {
date: [
  { label: 'Today', value: 'today' },
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
],

  status: [
    { label: 'Published', value: 'published' },
    { label: 'Draft', value: 'draft' },
    { label: 'Blocked', value: 'blocked' },
    { label: 'Reported', value: 'reported' },
  ],
};




  // Handlers
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  const handleFilterChange = (filterKey: string, value: string) => {
    console.log("Filter change:", filterKey, value);
    setActiveFilters(prev => ({ ...prev, [filterKey]: value }));
    setCurrentPage(1);
  };

const handleSearchChange = (value: string) => {
  setSearchQuery(value);
  debouncedSetSearch(value);
};

  // Render card
  const renderCard = (item: ScrollyItem) => (
    <div className={`fadeIn
      rounded-2xl hover:shadow-lg transition-all duration-300 
      hover:-translate-y-1 h-full flex flex-col overflow-hidden
       border
      ${theme === 'dark' ? 'bg-card shadow-[0px_0.89px_3.56px_0px_#FFFFFF40] border-white/10 bg-[#292929]' : 
      'bg-transparent shadow-[0px_0.9px_3.58px_0px_#00000026] border-black/10'}`}>
      <img src={item.thumbnail || "https://res.cloudinary.com/dhvzbkkv6/image/upload/v1764950269/827a53199f1267d5b2f448f66cbc52c56b3acd6a_2_iplqzs.png"}
       alt={item.title} 
       className="h-[28vh] w-full object-cover object-top"
       />
      <div className="flex flex-col justify-between items-start mb-3 font-Urbanist px-4 py-2 gap-1 mt-2">
         <p className={`w-[90%] text-base truncate sm:text-lg font-light  line-clamp-1
              ${theme === 'dark' ?  'text-white/50': 'text-[#01010180]'}`}>
                {item.author}
            </p>
        <h3 className={`w-[90%] text-lg truncate font-normal sm:text-xl line-clamp-1
          ${theme === 'dark' ? 'text-white': 'text-[#121212]'}`}>
          {item.title}</h3>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="w-full">
        {/* Search & Filter */}
        <SearchFilter
          placeholder="Search By Title Or Author..."
          searchValue={searchQuery}
          onSearchChange={handleSearchChange}
          filters={filterConfig}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          className="mb-6"
        />

        {/* Card Table */}
        <CardTable
          className="mt-12"
          data={apiItems}
          renderCard={renderCard}
          cardsPerRow={5}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onPageChange={handlePageChange}
          isLoading={isFetching}
          emptyMessage="No cards found matching your criteria"
        />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
      `}</style>
    </div>
  );
};

export default TableWrapper;
