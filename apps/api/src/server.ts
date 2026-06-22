import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import members from './routes/members.js';
import payments from './routes/payments.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.APP_ORIGIN, credentials: true }));
app.use(express.json({ limit: '5mb' }));
app.use(morgan('combined'));
app.use(rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS ?? 900000),
  max: Number(process.env.RATE_LIMIT_MAX ?? 100)
}));

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/v1/members', members);
app.use('/api/v1/payments', payments);

const port = Number(process.env.API_PORT ?? 8080);
app.listen(port, () => console.log(`AKYBS API running on :${port}`));
