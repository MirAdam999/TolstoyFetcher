import '../css/Result.css'

const Result = ({ result }) => {
    const hasError = result && result.error;

    return (
        <div className="result">
            {hasError ? (
                <div className="result-err">
                    <p className='result-header' id='err-result-header'>An Error Has Occured:</p>
                    <p className='result-txt'>{result.error}</p>
                </div>
            ) : (
                <div className="result-ok">
                    <p className='result-header' id='result-top-header'>Metadata Found:</p>
                    <p className='result-header'>Title:</p>
                    <p className='result-txt'>{result.title ? (result.title) : ('No title for URL given.')}</p>
                    <p className='result-header'>Description:</p>
                    <p className='result-txt'>{result.description ? (result.description) : ('No description for URL given.')}</p>
                    <p className='result-header'>Image:</p>
                    {result.image ? (<img src={result.image} alt={result.title} className='result-img' />) : ('No image for URL given.')}
                </div>
            )}
        </div>
    )
}

export default Result