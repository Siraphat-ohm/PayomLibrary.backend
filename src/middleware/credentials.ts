import whitelist from "../config/whitelist.json";

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (whitelist['allow'].includes(origin)) {
        res.setHeader('Access-Control-Allow-Credentials', true);
    }
    next();
}

export default credentials;