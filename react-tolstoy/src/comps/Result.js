import '../css/Result.css'

const Result = ({ result }) => {
    const hasError = result && result.error;

    return (
        <div className="result">
            {hasError ? (
                <div className="result-err">
                    <p>An Error Has Occured:</p>
                    <p>{result.error}</p>
                </div>
            ) : (
                <div className="result-ok">
                    <p>Metadata Found:</p>
                    <p>Title:</p>
                    <p>{result.title ? (result.title) : ('No title for URL given.')}</p>
                    <p>Description:</p>
                    <p>{result.description ? (result.description) : ('No description for URL given.')}</p>
                    <p>Image:</p>
                    {result.image ? (<img src={result.image} alt={result.title} />) : ('No image for URL given.')}
                </div>
            )}
        </div>
    )
}

export default Result