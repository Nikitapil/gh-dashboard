import React, { FC, useEffect, useMemo, useState } from "react";

interface PaginationProps {
  total: number;
  currenPage: number;
  setCurrentPage: (currenPage: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  total,
  setCurrentPage,
  currenPage,
}) => {
  const [slicer, setSlicer] = useState(currenPage - 1);
  const paginationArray = useMemo(() => {
    const arr = Array.from({ length: Math.ceil(total / 10) }, (a, b) => b + 1);
    return arr.slice(+slicer, +slicer + 10);
  }, [total, slicer]);

  useEffect(() => {
    if (currenPage > 10) {
      setSlicer(currenPage - 1);
    } else {
      setSlicer(0);
    }
  }, [currenPage]);

  const sliceToRight = () => setSlicer(+slicer + 1);
  const sliceToLeft = () => setSlicer(+slicer - 1);

  return (
    <div className="pagination">
      {total > 100 && paginationArray[0] !== 1 && (
        <button className="pagination__arrow" onClick={sliceToLeft}>
          &lt;
        </button>
      )}
      <div className="pagination__body">
        {paginationArray.map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`pagination__page ${
              num === currenPage ? "current" : ""
            }`}
          >
            {num}
          </button>
        ))}
      </div>
      {total > 100 && paginationArray.length === 10 && (
        <button className="pagination__arrow" onClick={sliceToRight}>
          &gt;
        </button>
      )}
    </div>
  );
};
