import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  NODE_ENV:process.env.NODE_ENV,
  port: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND
}
