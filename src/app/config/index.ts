import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
      port: process.env.PORT,
      node_env: process.env.NODE_ENV,
      database_url: process.env.DATABASE_URL,
      salt_round: process.env.SALT_ROUND,
      jwt: {
            access_secret: process.env.JWT_ACCESS_SECRET_KEY as string,
            access_expiresIn: process.env.JWT_ACCESS_EXPIRES_IN as string,
            refresh_secret: process.env.JWT_REFRESH_SECRET_KEY as string,
            refresh_expiresIn: process.env.JWT_REFRESH_EXPIRES_IN as string,
      },
      cloudinary: {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
      }
};