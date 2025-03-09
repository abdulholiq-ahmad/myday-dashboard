import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const [goToPage, setGoToPage] = useState("");

  const handleGoToPage = () => {
    const page = Number.parseInt(goToPage);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page);
      setGoToPage("");
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];

    // Always include current page
    pages.push(currentPage);

    // Add pages before current
    if (currentPage > 1) {
      pages.unshift(currentPage - 1);
    }
    if (currentPage > 2) {
      pages.unshift(currentPage - 2);
    }

    // Add pages after current
    if (currentPage < totalPages) {
      pages.push(currentPage + 1);
    }
    if (currentPage < totalPages - 1) {
      pages.push(currentPage + 2);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous page
      </Button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(page)}
            className="w-8 h-8 p-0"
          >
            {page}
          </Button>
        ))}

        {currentPage < totalPages - 2 && <span className="px-2">...</span>}

        {currentPage < totalPages - 1 && (
          <Button variant="outline" size="sm" onClick={() => onPageChange(totalPages)} className="w-8 h-8 p-0">
            {totalPages}
          </Button>
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1"
      >
        Next page
        <ChevronRight className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-2 ml-4">
        <Input className="w-16 h-8" value={goToPage} onChange={(e) => setGoToPage(e.target.value)} placeholder="№" />
        <Button variant="outline" size="sm" onClick={handleGoToPage}>
          Go to page
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
