import createServer from "./server";

const PORT = process.env.APP_PORT || 9000;
const app = createServer();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});