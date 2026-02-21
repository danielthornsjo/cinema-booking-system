import dotenv from 'dotenv';
dotenv.config();

const VALID_API_KEY = process.env.VALID_API_KEY;

function checkApiKey(req, res, next) {
    const apiKey = req.header('X-API-Key');

    const isValid = apiKey === VALID_API_KEY;

    if (isValid) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized: Invalid or missing API KEY' })
    }

}

export default checkApiKey;