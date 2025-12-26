import { useCallback, useState } from "react";
import type { SearchFilterProps } from "../../types/types";
import { ChevronDown, Search, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const SearchFilter: React.FC<SearchFilterProps> = ({
  placeholder = 'Search...',
  searchValue,
  onSearchChange,
  filters = {},
  activeFilters = {},
  onFilterChange,
  className = '',
}) => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState(searchValue);
  const {theme} = useTheme();

  // Debounced search with direct state management
  const handleSearchInput = useCallback(
    (value: string) => {
      setSearchInput(value);
      // Simple debounce using setTimeout
      const timeoutId = setTimeout(() => {
        onSearchChange(value);
      }, 300);
      return () => clearTimeout(timeoutId);
    },
    [onSearchChange]
  );

  const toggleFilterDropdown = (filterKey: string) => {
    setOpenFilter(openFilter === filterKey ? null : filterKey);
  };

  const handleFilterSelect = (filterKey: string, value: string) => {
    if (!onFilterChange) return;
    
    // Single selection logic - agar same value hai to clear karo, warna set karo
    const currentValue = activeFilters[filterKey];
    onFilterChange(filterKey, currentValue === value ? '' : value);
    console.log(filterKey, currentValue)
    setOpenFilter(null); // Close dropdown after selection
  };

  const clearFilter = (filterKey: string) => {
    if (onFilterChange) {
      onFilterChange(filterKey, '');
    }
  };

  const clearAllFilters = () => {
    if (onFilterChange) {
      Object.keys(activeFilters).forEach((key) => {
        onFilterChange(key, '');
      });
    }
  };

  const activeFilterCount = Object.values(activeFilters).filter(v => v !== '').length;


  return (
    <>
    <div className={`w-full justify-between items-center ${className}
     flex flex-col sm:flex-row gap-6 gap-8`}>
      {/* Search Bar */}
      <div className="relative flex-1 max-sm:w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => handleSearchInput(e.target.value)}
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-3 border
           rounded-lg outline-none font-Urbanist
           transition-all ${theme === 'dark' ? 'border-filterBorder  focus:border-white placeholder:text-white text-white' : 
            'border-filterBorderLight focus:border-black placeholder:text-black text-black'}`}
        />
      </div>

      {/* Filters */}
      {Object.keys(filters).length > 0 && (
        <div className="flex flex-wrap gap-3  w-full sm:w-fit
        justify-between sm:justify-start sm:gap-6 items-center">

          {Object.entries(filters).map(([filterKey, options]) => {
            const selectedValue = activeFilters[filterKey];
            const hasSelection = selectedValue && selectedValue !== '';
            const filterLabel = filterKey.charAt(0).toUpperCase() + filterKey.slice(1);

            return (
              <div key={filterKey} className="relative font-Urbanist">
                <button
                  onClick={() => toggleFilterDropdown(filterKey)}
                  className={`flex cursor-pointer items-center gap-2 px-4 sm:px-6 py-2 rounded-lg 
                    border transition-all bg-transparent 
                   ${theme === 'dark' ? 'border-filterBorder text-white hover:bg-white/20' :
                     'border-filterBorderLight text-black hover:bg-black/10'}
                  `}
                >
                  <span>{filterLabel}</span>
                  {hasSelection && (
                    <span className="bg-white text-black text-xs px-2 py-0.5 rounded-full">
                      1
                    </span>
                  )}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {openFilter === filterKey && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setOpenFilter(null)}
                    />
                    <div className={`absolute top-full mt-2 min-w-fit bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-80 overflow-y-auto
                        ${filterLabel === 'Date' ? 'left-0' : 'right-0'}`}>
                      {/* <div className="sticky top-0 bg-white border-b px-4 py-3 flex justify-between items-center">
                        <span className="text-sm">Select {filterLabel}</span>
                        {hasSelection && (
                          <button
                            onClick={() => clearFilter(filterKey)}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Clear
                          </button>
                        )}
                      </div> */}
                      <div className="p-2">
                        {options.map((option) => {
                          const isSelected = activeFilters[filterKey] === option.value;
                  
                          return (
                            <label
                              key={option.value}
                              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer"
                            >
                              <input
                                type="radio"
                                name={filterKey}
                                checked={isSelected}
                                onChange={() => handleFilterSelect(filterKey, option.value)}
                                className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-700 whitespace-nowrap">{option.label}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}

          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className={`flex items-center gap-1 px-3 py-2 text-sm 
               hover:bg-[#8f0e10ce] rounded-lg transition-all border border-[#C4090E]
               
               ${theme === 'dark' ? 'text-white' : 'text-[#C4090E] hover:text-white'}`}
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>
      )}
    </div>
     {/* Active Filter Tags */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(activeFilters)
            .filter(([_, value]) => value !== '')
            .map(([filterKey, value]) => {
              const option = filters[filterKey]?.find((opt) => opt.value === value);
              return (
                <div
                  key={`${filterKey}-${value}`}
                  className="flex items-center gap-2 px-3 py-1 bg-white/20
                  text-white rounded-full text-sm font-Urbanist"
                >
                  <span>{filterKey}:</span>
                  <span>{option?.label || value}</span>
                  <button
                    onClick={() => clearFilter(filterKey)}
                    className="hover:bg-white/30 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
        </div>
      )}
      </>
  );
};


export default SearchFilter