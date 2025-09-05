// routes/captcha.js  (ou dans ton contrôleur)
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/verify-captcha', async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ ok: false });

  try {
    const { data } = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token,
          remoteip: req.ip,
        },
      }
    );
    res.json({ ok: data.success, score: data.score });
  } catch {
    res.status(500).json({ ok: false });
  }
});

module.exports = router;