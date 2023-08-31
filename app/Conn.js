import dotenv from "dotenv";
import {createPool} from "mysql2";

dotenv.config();

class Conn {
    constructor() {
        if (Conn.instance) {
            return Conn.instance;
        }
    
        this.pool = createPool({
            host: process.env.DBHOST,
            user: process.env.DBUSER,
            database: process.env.DBNAME,
            password: process.env.DBPASS,
            connectionLimit: process.env.CONNLIMIT
        });
    
        Conn.instance = this;
        return this;
    }
  
    async query(sql, values) {
        try {
            const promisePool = this.pool.promise();
            const rows = await promisePool.query(sql, values);
            return rows[0];
        } catch(err) {
            throw err;
        }
    }
}

export default Conn;