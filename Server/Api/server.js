import  express  from 'express';
import "dotenv/config"
import cors  from 'cors';
import { authRoutes } from './Src/Routes/auth.routes.js';
import logger from './Src/Config/logger.config.js';

const app = express();

app.set('trust proxy', 1);

// ! SERVER PORT
const PORT = process.env.PORT;


//! CROS SETUP
app.use(
  cors({
    origin:process.env.CLIENT_URL,
    credentials: true,
  })
);


// ! PROXY ROUTES STUP
app.use(authRoutes);

app.listen(PORT, () => {
  logger.info(`server listening on port ${PORT}`);
});


