import Result from './Result'
import InputURL from './InputUrl';
import Loader from './Loader';
import { useURL } from './URLProvider';
import { useState } from 'react'
import '../css/Fetcher.css'

const Fetcher = () => {
    const storedURL = useURL();
    const [urls, setUrls] = useState([]);
    const [metadata, setMetadata] = useState([]);
    const [genErr, setGenErr] = useState('');
    const [counter, setCounter] = useState(3);
    const [loading, setLoading] = useState(false)

    const addField = (e) => {
        e.preventDefault();
        if (counter < 11) {
            setCounter(counter + 1);
        }
    }

    const FetchMetadata = async (e) => {
        e.preventDefault();

        if (urls.length < 1) {
            setGenErr('At least one URL required');
            return;
        }
        else {
            setLoading(true)
            try {
                setGenErr('')
                const response = await fetch(`${storedURL}/fetch_metadata`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ urls: urls }),
                });

                const data = await response.json();

                if (data.global_error) {
                    setGenErr(data.global_error);
                } else {
                    setMetadata(data);
                }

            } catch (error) {
                console.error('Error fetching metadata:', error);
                setGenErr('Error fetching metadata');
            }
            finally {
                setLoading(false)
            }
        }
    }

    return (
        <div className='fetcher' data-testid="fetcher-comp">
            <form onSubmit={FetchMetadata} className='fetch-form'>

                {[...Array(counter)].map((_, index) => {
                    const urlData = metadata.find(data => data.index === index);

                    return (
                        <div key={index}>
                            <InputURL url_list={urls} setUrls={setUrls} index={index} />
                            {urlData && (
                                <Result result={urlData} />
                            )}
                        </div>
                    );
                })}

                {counter < 11 && <button className='add-field-btn' onClick={addField}>+ Add Field</button>}

                <button type='submit' data-testid="submit-btn" className='submit-btn'>Fetch!</button>
            </form>
            {loading && <Loader />}
            {genErr && <p className='err-msg'>{genErr}</p>}
        </div>
    )
}

export default Fetcher