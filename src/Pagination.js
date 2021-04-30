import React from "react";

export default function Pagination({ goToNextPage, goToPrevPage }) {
    return (
        <div className="pagination">
            {goToPrevPage && (
                <button className="pokeButton" id="prev" onClick={goToPrevPage}>
                    Previous
                </button>
            )}
            {goToNextPage && (
                <button className="pokeButton" id="next" onClick={goToNextPage}>
                    Next
                </button>
            )}
        </div>
    );
}
