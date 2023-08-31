import express from "express";
import cors from "cors";

class HTTP {
    constructor() {
        this.app = express();
        this.app.use(cors({
            origin:"*"
        }));

        this.app.use(express.json());
        this.app.listen(process.env.PORT, 
        ()=> console.log(`app is listening on port ${process.env.PORT}`));
    }

    get(path, cb) {
        this.app.get(path, cb);
    }

    post(path, cb) {
        this.app.post(path, cb);
    }

    put(path, cb) {
        this.app.put(path, cb);
    }

    delete(path, cb) {
        this.app.delete(path, cb);
    }
}

export default HTTP;