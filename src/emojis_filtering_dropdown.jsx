import './emojis_filtering_dropdown.css';

import {
    useState
} from "react";

import PropTypes from "prop-types";

// функциональный компонент "выпадающее меню фильтрации смайлов по категории".
function EmojisFilteringDropdown({onFilterEmojis}) {
    const [selectedValue, setSelectedValue] = useState("header");

    const handleChange = (event) => {
        if (event.target.value !== "header") {
            setSelectedValue(event.target.value);

            onFilterEmojis(event.target.value);
        }

    };

    return (
        <div className="emojis-filtering-dropdown-container">
            <select
                value={selectedValue}
                onChange={handleChange}
            >
                <option
                    value="header"
                    disabled
                    hidden
                >
                    категория
                </option>

                <option
                    value="smileys-emotion">
                    эмоции
                </option>

                <option
                    value="people-body">
                    человек
                </option>

                <option
                    value="animals-nature">
                    природа
                </option>

                <option
                    value="food-drink">
                    еда и напитки
                </option>

                <option
                    value="travel-places">
                    путешествия
                </option>

                <option
                    value="activities">
                    мероприятия
                </option>

                <option
                    value="objects">
                    объекты
                </option>

                <option
                    value="symbols">
                    символы
                </option>

                <option
                    value="flags">
                    флаги
                </option>
            </select>
        </div>
    );
}

EmojisFilteringDropdown.propTypes = {
    onFilterEmojis: PropTypes.func.isRequired
};

export default EmojisFilteringDropdown;