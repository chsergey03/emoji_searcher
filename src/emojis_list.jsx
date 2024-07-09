import "./emojis_list.css"

import PropTypes from "prop-types";

// функциональный компонент "список эмодзи".
function EmojisList({ emojisData }) {
    const cleanName = (name) => {
        return name.replace(/E\d+\.\d+/g, "");
    };

    return (
        <div className="emojis-list-container">
            <ul className="emojis-list">
                {emojisData.map(
                    emoji => (
                        <li key={emoji.slug}>
                            <span className="emoji">
                                {emoji.character}
                            </span> {cleanName(emoji.unicodeName)}
                        </li>
                    ))}
            </ul>
        </div>
    );
}

EmojisList.propTypes = {
    emojisData: PropTypes.arrayOf(
        PropTypes.shape({
            character: PropTypes.string.isRequired,
            unicodeName: PropTypes.string.isRequired
        })
    ).isRequired
};

export default EmojisList;