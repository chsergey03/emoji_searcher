import "./app.css";

import EmojisList from "./emojis_list.jsx";

// функциональный компонент "веб-приложение
// поисковика смайлов".
function App() {
    return (
        <div className="App">
            <h1>emoji searcher</h1>

            <EmojisList/>
        </div>
    );
}

export default App;