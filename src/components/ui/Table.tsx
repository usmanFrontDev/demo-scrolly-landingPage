import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import type { CardTableProps } from "../../types/types";
import { useTheme } from "../../context/ThemeContext";

function CardTable<T>({
  data,
  renderCard,
  cardsPerRow,
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  isLoading = false,
  emptyMessage = 'No data available',
  className = '',
}: CardTableProps<T>) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const {theme} = useTheme()

  // Calculate grid columns based on cardsPerRow
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  }[cardsPerRow] || 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';

  const getPaginationRange = (totalPages: number, currentPage: number): (number | string)[] => {
    const totalNumbersToShow = 5;
    const pages: (number | string)[] = [];

    if (totalPages <= totalNumbersToShow) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    const leftSibling = Math.max(currentPage - 1, 1);
    const rightSibling = Math.min(currentPage + 1, totalPages);
    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 1;

    if (!showLeftDots && showRightDots) {
      for (let i = 1; i <= 4; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages);
    } else if (showLeftDots && !showRightDots) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
    } else if (showLeftDots && showRightDots) {
      pages.push(1);
      pages.push('...');
      for (let i = leftSibling; i <= rightSibling; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className={`w-full ${className} space-y-12`}>
      {/* Cards Grid */}
      <div className="rounded-t-2xl min-[200px] sm:min-h-[400px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          </div>
        ) : data.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 text-gray-500">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-lg font-medium">{emptyMessage}</p>
          </div>
        ) : (
          <div className={`grid ${gridCols} gap-4 md:gap-6`}>
            {data.map((item, index) => (
              <div key={index} className="animate-fadeIn">
                {renderCard(item, index)}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && data.length > 0 && (
        <div className="flex flex-col sm:flex-row 
        justify-between items-center gap-4 px-4 md:px-6 py-4rounded-b-2xl max-sm:pt-4">
          {/* Mobile Page Numbers */}
          <div className="flex sm:hidden justify-center items-center gap-2">
            {getPaginationRange(totalPages, currentPage).map((page, index) =>
              page === '...' ? (
                <span key={`dots-${index}`} className="px-2 text-gray-400 select-none">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => onPageChange(page as number)}
                  className={`p-1 w-6 h-6 flex justify-center items-center
                       rounded-full transition-all ${
                     currentPage === page
                        ? 'bg-white text-[#141414] font-semibold'
                        : 'bg-transparent text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  {page}
                </button>
              )
            )}
          </div>

          {/* Desktop Layout */}
          <div className="flex items-center font-Urbanist justify-between w-full">
            {/* Previous Button */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-4 py-2
                rounded-lg font-semibold 
                 disabled:opacity-50 disabled:cursor-not-allowed 
                transition-all cursor-pointer
                 ${theme === 'dark' ? 'text-white' : 'text-black'}
                `}
            >
              <ArrowLeftIcon/>
              Previous
            </button>

            {/* Desktop Page Numbers */}
            <div className="hidden sm:flex justify-center items-center gap-2">
              {getPaginationRange(totalPages, currentPage).map((page, index) =>
                page === '...' ? (
                  <span key={`dots-${index}`} className="px-2 text-gray-400 select-none">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => onPageChange(page as number)}
                    className={`p-1 w-8 h-8 flex justify-center items-center
                       text-sm rounded-full transition-all ${
                      currentPage === page
                        ? `${theme === 'dark'? 'bg-white text-[#141414] font-semibold' :
                           'bg-black text-white font-semibold'}`
                        : 'bg-transparent text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`
              
              flex items-center gap-2 px-4 py-2
                rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed 
                transition-all cursor-pointer
                ${theme === 'dark' ? 'text-white' : 'text-black'}
                `}
            >
              Next
                  <ArrowRightIcon/>
             
            </button>
          </div>
        </div>
      )}

      {/* Info Text */}
      {!isLoading && data.length > 0 && (
       <div className={`text-center text-sm  font-Urbanist
  ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
  Showing {data.length} of {totalItems} results
</div>
      )}
    </div>
  );
}


export default CardTable