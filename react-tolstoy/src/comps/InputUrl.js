import { useState } from "react";
import '../css/InputURL.css'

const InputURL = ({ url_list, setUrls, index }) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        if (value.length > 0) {
            setInputValue(value);
            setUrls(prevUrls => [...prevUrls, [index, value.trim()]]);
        }
    };

    return (
        <div className="input-url">
            <input
                type="url"
                value={inputValue}
                placeholder="Enter URL"
                onChange={handleChange}
            />
        </div>
    )
}

export default InputURL