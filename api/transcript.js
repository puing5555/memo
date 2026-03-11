module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  const { videoId, lang } = req.query;
  if (!videoId) return res.status(400).json({ error: 'videoId required' });
  
  const url = `https://api.supadata.ai/v1/youtube/transcript?videoId=${videoId}${lang ? '&lang=' + lang : ''}`;
  
  try {
    const r = await fetch(url, {
      headers: { 'x-api-key': process.env.SUPADATA_KEY }
    });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
