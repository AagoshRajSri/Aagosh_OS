import express from 'express';
import cors from 'cors';

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.post('/api/contact', (req, res) => {
  const { name, subject, message } = req.body;
  
  if (!name || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Here you would typically send an email, save to DB, or post to Slack
  console.log('--- NEW INCOMING TRANSMISSION ---');
  console.log(`IDENTITY: ${name}`);
  console.log(`PURPOSE:  ${subject}`);
  console.log(`PAYLOAD:  ${message}`);
  console.log('---------------------------------');
  
  // Simulate delay for realism
  setTimeout(() => {
    res.json({ success: true, message: 'Message received by the core.' });
  }, 1000);
});

app.listen(port, () => {
  console.log(`AagoshRaj_OS Backend Terminal running on port ${port}`);
});
