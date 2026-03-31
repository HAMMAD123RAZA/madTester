import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import { connectDB } from "./db/db.js";
import { GetAll, GetById, create, update, softDelete } from "./controllers/campaigns.js";
import { login, register } from "./controllers/auth.js";
import { authenticateToken } from "./middleware/auth.js";
import { apiRateLimiter } from "./middleware/rateLimiter.js";
import { validateCampaign, validateAuth } from "./middleware/validate.js";

dotenv.config()
const app = express();

app.use(cors());
app.use(express.json());
app.use(apiRateLimiter);

app.post('/auth/login', validateAuth, login);
app.post('/auth/register', register); 

// Protected Campaign Routes
app.get("/campaigns", authenticateToken, GetAll);
app.get("/campaigns/:id", authenticateToken, GetById);
app.post('/campaigns', authenticateToken, validateCampaign, create);
app.put('/campaigns/:id', authenticateToken, update);
app.delete('/campaigns/:id', authenticateToken, softDelete);

app.get("/", (req, res) => {
  res.send("Campaign Management API is running")
})

const PORT = process.env.PORT || 3000;

export default app;

if (process.env.NODE_ENV !== 'test') {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
}
