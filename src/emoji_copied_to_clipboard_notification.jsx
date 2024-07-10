import './emoji_copied_to_clipboard_notification.css';

import PropTypes from "prop-types";

// функциональный компонент "уведомление
// о скопированном в буфер обмен смайле".
function EmojiCopiedToClipboardNotification({isVisible, emojiCharacter}) {
    return (
        <div
            className={`emoji-copied-to-clipboard-notification ${isVisible ? "visible" : ""}`}
        >
            {`смайл "${emojiCharacter}" скопирован в буфер обмена`}
        </div>
    );
}

EmojiCopiedToClipboardNotification.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    emojiCharacter: PropTypes.string.isRequired,
};

export default EmojiCopiedToClipboardNotification;