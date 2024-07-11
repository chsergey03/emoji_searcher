import './search_bar.css';

import {
    useState
} from "react";

import PropTypes from "prop-types";

// функциональный компонент "поисковая строка".
const SearchBar = ({isNecessaryToClearInputForm, onSearch, onClearSearch}) => {
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
                className="input-field"
                value={isNecessaryToClearInputForm ? "" : query}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder={`введите имя смайла и нажмите на клавишу "enter"...`}
            />
            {!isNecessaryToClearInputForm && isOnSearch &&
                <button
                    className="input-field-clear-button"
                    onClick={handleClear}>
                    ✖
                </button>
            }
        </div>
    );
};

SearchBar.propTypes = {
    isNecessaryToClearInputForm: PropTypes.bool.isRequired,
    onSearch: PropTypes.func.isRequired,
    onClearSearch: PropTypes.func.isRequired,
};

export default SearchBar;