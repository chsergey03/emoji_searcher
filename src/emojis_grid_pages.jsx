import "./emojis_grid_pages.css"

import PropTypes from "prop-types";

// функциональный компонент "страницы сетки смайлов".
function EmojiGridPages({
    currentPageNumber,
    nPagesOfEmojisGrid,
    onPageChange
}) {
    const handlePrevPageClick = () => {
        if (currentPageNumber > 1) {
            onPageChange(currentPageNumber - 1);
        }
    };

    const handleNextPageClick = () => {
        if (currentPageNumber < nPagesOfEmojisGrid) {
            onPageChange(currentPageNumber + 1);
        }
    };

    return (
        <div className="emojis-grid-pages">
            <button
                className="emojis-grid-pages-button"
                onClick={handlePrevPageClick}
                disabled={currentPageNumber === 1}
            >
                {`<`}
            </button>

            <span
                className="emojis-grid-pages-span">
                страница {currentPageNumber} из {nPagesOfEmojisGrid}
            </span>

            <button
                className="emojis-grid-pages-button"
                onClick={handleNextPageClick}
                disabled={currentPageNumber === nPagesOfEmojisGrid}
            >
                {`>`}
            </button>
        </div>
    );
}

EmojiGridPages.propTypes = {
    currentPageNumber: PropTypes.number.isRequired,
    nPagesOfEmojisGrid: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default EmojiGridPages;