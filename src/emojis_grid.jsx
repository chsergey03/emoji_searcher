import "./emojis_grid.css"

import PropTypes from "prop-types";

// функциональный компонент "сетка эмодзи".
function EmojisGrid({ emojisData }) {
    const cleanName = (name) => {
        return name.replace(/E\d+\.\d+/g, "");
    };

    return (
        <div className="emojis-grid-container">
            <div className="emojis-grid">
                {emojisData.map(emoji => (
                    <div key={emoji.slug} className="emoji-card">

                        <span className="emoji-character">
                            {emoji.character}
                        </span>

                        <span className="emoji-name">
                            {cleanName(emoji.unicodeName)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

EmojisGrid.propTypes = {
    emojisData: PropTypes.arrayOf(
        PropTypes.shape({
            character: PropTypes.string.isRequired,
            unicodeName: PropTypes.string.isRequired
        })
    ).isRequired
};

export default EmojisGrid;