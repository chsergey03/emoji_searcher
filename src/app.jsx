import "./app.css";

import SearchBar from "./search_bar.jsx";

import LoadingSpinner from "./loading_spinner.jsx";

import EmojisGrid from "./emojis_grid.jsx";
import EmojisGridPages from "./emojis_grid_pages.jsx";

import EmojiCopiedToClipboardNotification from "./emoji_copied_to_clipboard_notification.jsx";

import EmojisSortingDropdown from "./emojis_sorting_dropdown.jsx";
import EmojisFilteringDropdown from "./emojis_filtering_dropdown.jsx";

import {
    useReducer,
    useEffect,
    useRef
} from "react";

import axios from "axios";

const N_EMOJIS_PER_PAGE = 15;
const CURRENT_EMOJIS_GRID_PAGE_NUMBER_INIT_VALUE = 1;

const initialState = {
    isLoading: true,
    emojisData: [],
    currentEmojisGridPageNumber: CURRENT_EMOJIS_GRID_PAGE_NUMBER_INIT_VALUE,
    searchQuery: "",
    isNotificationVisible: false,
    notificationMessageEmoji: ""
};

function reducer(state, action) {
    switch (action.type) {
        case "SET_IS_LOADING_FALSE":
            return {...state, isLoading: false};
        case "SET_EMOJIS_DATA":
            return {...state, emojisData: action.payload, isLoading: false};
        case "SET_SEARCH_QUERY":
            return {...state, searchQuery: action.payload};
        case "SET_CURRENT_PAGE":
            return {...state, currentEmojisGridPageNumber: action.payload};
        case "SHOW_NOTIFICATION":
            return {...state, isNotificationVisible: true, notificationMessageEmoji: action.payload};
        case "HIDE_NOTIFICATION":
            return {...state, isNotificationVisible: false};
        default:
            return state;
    }
}

// функциональный компонент "веб-приложение
// поисковика смайлов".
function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const searchBarRef = useRef();
    const emojisFilteringDropdownRef = useRef();
    const emojisSortingDropdownRef = useRef();

    useEffect(() => {
        const cachedEmojis = localStorage.getItem("emojisData");

        if (cachedEmojis) {
            dispatch({type: "SET_EMOJIS_DATA", payload: JSON.parse(cachedEmojis)});
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

                    const data = response.data.filter(
                        emoji => !prohibitedCodepoints.includes(emoji.codePoint));

                    dispatch({type: "SET_EMOJIS_DATA", payload: data});

                    localStorage.setItem("emojisData", JSON.stringify(data));
                })
                .catch(error => {
                    dispatch({type: "SET_IS_LOADING_FALSE"});

                    console.error(
                        "there was an error fetching the emojis data!",
                        error);
                });
        }
    }, []);

    const handleSearch = (searchQuery) => {
        emojisSortingDropdownRef.current.resetSelectedValue();
        emojisFilteringDropdownRef.current.resetSelectedValue();

        dispatch({type: "SET_SEARCH_QUERY", payload: searchQuery});

        const emojisAfterFiltering = JSON.parse(localStorage.getItem("emojisData")).filter(
            emoji => emoji.unicodeName.toLowerCase().includes(searchQuery.toLowerCase())
        );

        dispatch({type: "SET_EMOJIS_DATA", payload: emojisAfterFiltering});

        dispatch({
            type: "SET_CURRENT_PAGE",
            payload: CURRENT_EMOJIS_GRID_PAGE_NUMBER_INIT_VALUE
        });
    };

    const handleClearSearch = () => {
        dispatch({type: "SET_SEARCH_QUERY", payload: ""});

        dispatch({
            type: "SET_EMOJIS_DATA",
            payload: JSON.parse(localStorage.getItem("emojisData"))});
    };

    const handleCopyingEmojiToClipboard = (emojiCharacter) => {
        dispatch({type: "SHOW_NOTIFICATION", payload: emojiCharacter});

        setTimeout(() => {
            dispatch({type: "HIDE_NOTIFICATION"});
        }, 2000);
    };

    const paginate = (pageNumber) => {
        dispatch({type: "SET_CURRENT_PAGE", payload: pageNumber});
    }

    const nPagesOfEmojisGrid = Math.ceil(state.emojisData.length / N_EMOJIS_PER_PAGE);
    const indexOfLastEmoji = state.currentEmojisGridPageNumber * N_EMOJIS_PER_PAGE;
    const indexOfFirstEmoji = indexOfLastEmoji - N_EMOJIS_PER_PAGE;

    const sortEmojis = (sortingRule) => {
        let comparator;

        switch (sortingRule) {
            case "asc":
                comparator = (a, b) => {
                    const codePointA = parseInt(a.codePoint, 16);
                    const codePointB = parseInt(b.codePoint, 16);

                    return codePointA - codePointB;
                };

                break;
            case "desc":
                comparator = (a, b) => {
                    const codePointA = parseInt(a.codePoint, 16);
                    const codePointB = parseInt(b.codePoint, 16);

                    return codePointB - codePointA;
                };

                break;
        }

        dispatch({
            type: "SET_EMOJIS_DATA",
            payload: [...state.emojisData].sort(comparator)
        });
    }

    const filterEmojis = (category) => {
        if (category !== "header") {
            searchBarRef.current.resetSearchBar();

            dispatch({type: "SET_SEARCH_QUERY", payload: ""});

            const emojisAfterFiltering = JSON.parse(localStorage.getItem("emojisData")).filter(
                emoji => emoji.group === category
            );

            dispatch({type: "SET_EMOJIS_DATA", payload: emojisAfterFiltering});

            dispatch({
                type: "SET_CURRENT_PAGE",
                payload: CURRENT_EMOJIS_GRID_PAGE_NUMBER_INIT_VALUE
            });
        }
    }

    return (
        <div className="App">
            <EmojiCopiedToClipboardNotification
                isVisible={state.isNotificationVisible}
                emojiCharacter={state.notificationMessageEmoji}
            />

            <div className="main-header-container">
                <h1 className="main-header">emoji searcher</h1>
            </div>

            <div className="search-sorting-filtering-container">
                <SearchBar
                    ref={searchBarRef}
                    onSearch={handleSearch}
                    onClearSearch={handleClearSearch}
                />

                <EmojisSortingDropdown
                    ref={emojisSortingDropdownRef}
                    onSortEmojis={sortEmojis}
                />

                <EmojisFilteringDropdown
                    ref={emojisFilteringDropdownRef}
                    onFilterEmojis={filterEmojis}
                />
            </div>

            {state.searchQuery.length > 0 ?
                <div className="search-results-header-container">
                    <h4 className="search-results-header">
                        {state.emojisData.length > 0 ?
                            `смайлы, найденные по запросу "${state.searchQuery}", 
                             (количество результатов поиска: ${state.emojisData.length}):` :
                            `по запросу "${state.searchQuery}" не найдено ни одного смайла.`}
                    </h4>
                </div> :
                <div
                    className="search-results-header-container-empty"
                >
                </div>
            }

            {state.isLoading ?
                <LoadingSpinner/> :
                <>
                    <EmojisGrid
                        emojisData={state.emojisData.slice(indexOfFirstEmoji, indexOfLastEmoji)}
                        onEmojiCopiedToClipboard={handleCopyingEmojiToClipboard}
                    />

                    {nPagesOfEmojisGrid > 1 &&
                        <EmojisGridPages
                            nEmojisPerPage={N_EMOJIS_PER_PAGE}
                            currentPageNumber={state.currentEmojisGridPageNumber}
                            nPagesOfEmojisGrid={nPagesOfEmojisGrid}
                            onPageChange={paginate}/>}
                </>}
        </div>
    );
}

export default App;