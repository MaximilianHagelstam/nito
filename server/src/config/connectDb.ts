import { createConnection } from "typeorm";
import Like from "../entities/Like";
import Post from "../entities/Post";
import User from "../entities/User";
import { DB_URL, IS_PROD } from "./constants";
import logger from "./logger";

const connectDb = async () => {
  try {
    await createConnection({
      type: "postgres",
      url: DB_URL,
      synchronize: !IS_PROD,
      logging: !IS_PROD,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [Post, User, Like],
    });
    logger.info("Connected to database");
  } catch (err) {
    logger.error(`Error connecting to db: ${err}`);
  }
};

export default connectDb;
