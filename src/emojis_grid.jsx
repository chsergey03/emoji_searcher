import "./emojis_grid.css"

import copyToClipboardButtonIcon from "./icons/copy_to_clipboard_button_icon.png";

import PropTypes from "prop-types";

// функциональный компонент "сетка смайлов".
function EmojisGrid({emojisData, onEmojiCopiedToClipboard}) {
    const cleanName = (name) => {
        return name.replace(/E\d+\.\d+/g, "");
    };

    const copyToClipboard = (emoji) => {
        navigator.clipboard.writeText(emoji.character).then(
            () => {},
            (error) => {
            console.error("failed to copy text: ", error);
        });

        onEmojiCopiedToClipboard(emoji.character);
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

                        <button
                            className="copy-to-clipboard-button"
                            onClick={() => copyToClipboard(emoji)}
                        >
                            <img
                                src={copyToClipboardButtonIcon}
                                alt=""
                                className="copy-to-clipboard-icon"
                            />
                        </button>
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
    ).isRequired,
    onEmojiCopiedToClipboard: PropTypes.func.isRequired,
};

export default EmojisGrid;