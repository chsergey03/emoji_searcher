import './emojis_sorting_dropdown.css';

import {
    useState
} from "react";

import PropTypes from "prop-types";

function EmojisSortingDropdown({onSortEmojis}) {
    const [selectedValue, setSelectedValue] = useState("header");

    const handleChange = (event) => {
        if (event.target.value !== "header") {
                setSelectedValue(event.target.value);
                onSortEmojis(event.target.value);
        }

    };

    return (
        <div className="emojis-sorting-dropdown-container">
            <select value={selectedValue} onChange={handleChange}>
                <option value="header" disabled hidden>отсортировать</option>
                <option value="asc">по возрастанию</option>
                <option value="desc">по убыванию</option>
            </select>
        </div>
    );
}

EmojisSortingDropdown.propTypes = {
    onSortEmojis: PropTypes.func.isRequired
};

export default EmojisSortingDropdown;