import "module-alias/register";
import app from "@src/app";

const PORT = process.env.PORT || 5002;

const server = app.listen(PORT, () => {
    if (process.env.NODE_ENV !== "test") {
        console.log(`listening on port ${PORT}`);
    }
});

export default server;
