import whitelist from "./whitelist.json";

const corsOptions = {
    origin : (origin, callback) => {
        if (whitelist['allow'].indexOf(origin) !== -1 || !origin) {
            callback( null, true )
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true
}

export default corsOptions;