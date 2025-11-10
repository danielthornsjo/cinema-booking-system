function checkApiKey(req, res, next) {
    const apiKey = req.header('X-API-Key');

    if (apiKey !== 'valid-api-key') {
        return res.status(401).json({ error: '401 unauthorized' });
    }

    next();
}

export default checkApiKey;