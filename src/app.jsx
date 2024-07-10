import "./app.css";

import SearchBar from "./search_bar.jsx";

import LoadingSpinner from './loading_spinner.jsx';
import EmojisGrid from "./emojis_grid.jsx";
import EmojiCopiedToClipboardNotification from "./emoji_copied_to_clipboard_notification.jsx";
import EmojisGridPages from "./emojis_grid_pages.jsx"

import {
    useState,
    useEffect
} from "react";

import axios from "axios";

const N_EMOJIS_PER_PAGE = 15;
const CURRENT_EMOJIS_GRID_PAGE_NUMBER_INIT_VALUE = 1;

// функциональный компонент "веб-приложение
// поисковика смайлов".
function App() {
    const [loading, setLoading] = useState(true);

    const [emojis, setEmojis] = useState([]);
    const [filteredEmojis, setFilteredEmojis] = useState([]);

    const [currentEmojisGridPageNumber,
           setCurrentEmojisGridPageNumber] =
        useState(CURRENT_EMOJIS_GRID_PAGE_NUMBER_INIT_VALUE);

    const [searchQuery, setSearchQuery] = useState("");

    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [notificationMessageEmoji, setNotificationMessageEmoji] = useState("");

    useEffect(() => {
        const cachedEmojis = localStorage.getItem('emojis');
        if (cachedEmojis) {
            setEmojis(JSON.parse(cachedEmojis));

            setLoading(false);
        } else {
            axios.get(
                "https://emoji-api.com/emojis?" +
                "access_key=808477da80a7ef8521990e5994d3dded8c634609")
                .then(response => {
                    const prohibitedCodepoints = [
                        "1FAC3",
                        "1F936",
                        "1F9D1 200D 1F384",
                        "1F9D1 200D 1F91D 200D 1F9D1",
                        "26A7 FE0F",
                        "1F46A",
                        "1F469 200D 1F469 200D 1F466",
                        "1F46D",
                        "1F469 1F3FB 200D 1F91D 200D 1F469 1F3FC",
                        "1F46D 1F3FC",
                        "1F469 1F3FC 200D 1F91D 200D 1F469 1F3FD",
                        "1F46D 1F3FD",
                        "1F469 1F3FD 200D 1F91D 200D 1F469 1F3FE",
                        "1F46D 1F3FE",
                        "1F469 1F3FE 200D 1F91D 200D 1F469 1F3FF",
                        "1F46D 1F3FF",
                        "1F46C",
                        "1F468 1F3FB 200D 1F91D 200D 1F468 1F3FC",
                        "1F46C 1F3FC",
                        "1F468 1F3FC 200D 1F91D 200D 1F468 1F3FD",
                        "1F46C 1F3FD",
                        "1F468 1F3FD 200D 1F91D 200D 1F468 1F3FE",
                        "1F46C 1F3FE",
                        "1F468 1F3FE 200D 1F91D 200D 1F468 1F3FF",
                        "1F46C 1F3FF",
                        "1F48F",
                        "1F468 200D 2764 FE0F 200D 1F48B 200D 1F468",
                        "1F469 200D 2764 FE0F 200D 1F48B 200D 1F469",
                        "1F491",
                        "1F9D1 1F3FB 200D 2764 FE0F 200D 1F9D1 1F3FC",
                        "1F468 200D 2764 FE0F 200D 1F468",
                        "1F469 200D 2764 FE0F 200D 1F469",
                        "1F6BB",
                        "1F3F3 FE0F 200D 1F308",
                        "1F3F3 FE0F 200D 26A7 FE0F",
                        "1F9D1 1F3FB 200D 2764 FE0F 200D 1F48B 200D 1F9D1 1F3FC ; fully-qualified"
                    ];

                    const emojisData = response.data.filter(emoji =>
                        !prohibitedCodepoints.includes(emoji.codePoint));

                    setEmojis(emojisData);

                    setLoading(false);
                })
                .catch(error => {
                    console.error(
                        "there was an error fetching the emojis data!",
                        error);

                    setLoading(false);
                });
        }
    }, []);

    const handleSearch = (searchQuery) => {
        setSearchQuery(searchQuery);

        const emojisAfterFiltering = emojis.filter(
            emoji => emoji.unicodeName.toLowerCase().includes(searchQuery.toLowerCase()));

        setFilteredEmojis(emojisAfterFiltering);

        setCurrentEmojisGridPageNumber(
            CURRENT_EMOJIS_GRID_PAGE_NUMBER_INIT_VALUE);
    };

    const handleClearSearch = () => {
        setSearchQuery("");
    };

    const handleCopyingEmojiToClipboard = (emojiCharacter) => {
        setNotificationMessageEmoji(emojiCharacter);

        setIsNotificationVisible(true);

        setTimeout(() => {
            setIsNotificationVisible(false);
        }, 2000);
    };

    const paginate = (pageNumber) => {
        setCurrentEmojisGridPageNumber(pageNumber);
    }

    let emojisData;

    if (searchQuery.length > 0) {
        emojisData = filteredEmojis;
    } else {
        emojisData = emojis;
    }

    const nPagesOfEmojisGrid = Math.ceil(emojisData.length / N_EMOJIS_PER_PAGE);
    const indexOfLastEmoji = currentEmojisGridPageNumber * N_EMOJIS_PER_PAGE;
    const indexOfFirstEmoji = indexOfLastEmoji - N_EMOJIS_PER_PAGE;

    emojisData = emojisData.slice(indexOfFirstEmoji, indexOfLastEmoji);

    return (
        <div className="App">
            <EmojiCopiedToClipboardNotification
                isVisible={isNotificationVisible}
                emojiCharacter={notificationMessageEmoji}
            />

            <div className="main-header-container">
                <h1>emoji searcher</h1>
            </div>

            <SearchBar
                onSearch={handleSearch}
                onClearSearch={handleClearSearch}/>

            {searchQuery.length > 0 &&
                <div className="search-header-container">
                    <h4 className="search-header">
                        {emojisData.length > 0 ?
                            `смайлы, найденные по запросу "${searchQuery}", 
                             (количество результатов поиска: ${emojisData.length}):` :
                            `по запросу "${searchQuery}" не найдено ни одного смайла.`}
                    </h4>
                </div>
            }

            {loading ?
                <LoadingSpinner/> :
                <>
                    <EmojisGrid
                        emojisData={emojisData}
                        onEmojiCopiedToClipboard={handleCopyingEmojiToClipboard}
                    />

                    {nPagesOfEmojisGrid > 1 &&
                        <EmojisGridPages
                            nEmojisPerPage={N_EMOJIS_PER_PAGE}
                            currentPageNumber={currentEmojisGridPageNumber}
                            nPagesOfEmojisGrid={nPagesOfEmojisGrid}
                            onPageChange={paginate}/>}
                </>}
        </div>
    );
}

export default App;