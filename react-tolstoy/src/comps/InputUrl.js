
import '../css/InputURL.css';

const InputURL = ({ value, onChange }) => {
    const handleChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <div className="input-url">
            <input
                type="url"
                value={value}
                placeholder="Enter URL"
                onChange={handleChange}
            />
        </div>
    );
};

export default InputURL;
