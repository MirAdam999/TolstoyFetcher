const express = require('express');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const metascraper = require('metascraper')([
    require('metascraper-image')(),
    require('metascraper-title')(),
    require('metascraper-description')()
]);

const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());

const limiter = rateLimit({
    windowMs: 1000,
    max: 5,
});

app.use(limiter);

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());

app.post('/fetch_metadata', async (req, res) => {
    const urls = req.body.urls;

    if (!Array.isArray(urls) || urls.length === 0) {
        return res.status(400).json({ global_error: 'Please provide a valid list of URLs.' });
    }

    if (urls.length > 10) {
        return res.status(400).json({ global_error: 'Up to 10 URLs per submittion please.' });
    }

    if (urls.some(url_array => !Array.isArray(url_array) || url_array.length !== 2)) {
        return res.status(400).json({ global_error: 'Invalid URL list.' });
    }

    try {
        const metadataPromises = urls.map(async (url_array) => {
            try {
                const index = url_array[0]
                const url = url_array[1]
                const { data: html } = await axios.get(url);
                let metadata = await metascraper({ html, url });
                metadata.index = index

                // if no image in header, get scrshoot
                if (!metadata.image) {
                    const browser = await puppeteer.launch();
                    const page = await browser.newPage();
                    await page.goto(url, { waitUntil: 'networkidle2' });
                    const screenshotBuffer = await page.screenshot({ fullPage: true });
                    const buffer = Buffer.from(screenshotBuffer);
                    const screenshotBase64 = buffer.toString('base64');
                    const dataUrl = `data:image/png;base64,${screenshotBase64}`;
                    metadata.image = dataUrl;
                    await browser.close();
                }

                return { url, ...metadata };
            } catch (err) {
                console.error(`Error processing URL ${url_array[1]}: ${err.message}`);
                return { url: url_array[1], index: url_array[0], error: 'Failed to fetch metadata for URL given.' };
            }
        });

        const metadataResults = await Promise.all(metadataPromises);
        res.json(metadataResults);
    } catch (err) {
        res.status(500).json({ global_error: 'Server error while fetching metadata.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
