import './search_bar.css';

import {
    useState,
    forwardRef,
    useImperativeHandle
} from "react";

import PropTypes from "prop-types";

// функциональный компонент "поисковая строка".
const SearchBar = forwardRef((props, ref) => {
    const [query, setQuery] = useState("");
    const [isOnSearch, setIsOnSearch] = useState(false);

    const handleChange = (event) => {
        setQuery(event.target.value);
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();

            setIsOnSearch(true)

            props.onSearch(event.target.value);
        }
    }

    const clear = () => {
        setQuery("");

        setIsOnSearch(false);
    }

    const handleClear = () => {
        clear();

        props.onSearch("");
        props.onClearSearch(true);
    };

    useImperativeHandle(ref, () => ({
        resetSearchBar: () => {
            clear();
        }
    }));

    return (
        <div className="search-bar-container">
            <input
                type="text"
                className="input-field"
                value={query}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder={`введите имя смайла и нажмите на клавишу "enter"...`}
            />
            {isOnSearch &&
                <button
                    className="input-field-clear-button"
                    onClick={handleClear}>
                    ✖
                </button>
            }
        </div>
    );
});

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onClearSearch: PropTypes.func.isRequired,
};

export default SearchBar;