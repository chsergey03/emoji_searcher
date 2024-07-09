import {
    useState,
    useEffect
} from "react";

import axios from "axios";

// функциональный компонент "список эмодзи".
function EmojisList() {
    const cleanName = (name) => {
        return name.replace(/E\d+\.\d+/g, "");
    };

    const [emojis, setEmojis] = useState([]);

    useEffect(() => {
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
            })
            .catch(error => {
                console.error(
                    "there was an error fetching the emojis data!",
                    error);
            });
    }, []);

    return (
        <ul style={{listStyleType: "none"}}>
            {emojis.map(
                emoji => (
                    <li key={emoji.slug}>
                            <span className="emoji">
                                {emoji.character}
                            </span> {cleanName(emoji.unicodeName)}
                    </li>
                ))}
        </ul>
    );
}

export default EmojisList;