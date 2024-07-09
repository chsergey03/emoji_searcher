import './search_bar.css';

import {
    useState
} from "react";

import PropTypes from "prop-types";

// функциональный компонент "поисковая строка".
const SearchBar = ({ onSearch, onClearSearch }) => {
    const [query, setQuery] = useState("");
    const [isOnSearch, setIsOnSearch] = useState(false);

    const handleChange = (event) => {
        setQuery(event.target.value);
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();

            setIsOnSearch(true)

            onSearch(event.target.value);
        }
    }

    const handleClear = () => {
        setQuery("");

        setIsOnSearch(false);

        onSearch("");
        onClearSearch(true);
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                className="search-bar"
                value={query}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="input name of emoji and press 'enter'..."
            />
            {isOnSearch && (
                <button
                    className="clear-button"
                    onClick={handleClear}>
                    ✖
                </button>
            )}
        </div>
    );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onClearSearch: PropTypes.bool.isRequired,
};

export default SearchBar;