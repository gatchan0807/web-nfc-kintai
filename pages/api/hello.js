// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  if (req.method === "POST") {
    res.statusCode = 200;
    const body = req.body;
    res.json({ name: "John Doe", body });
  } else if (req.method === "GET") {
    res.statusCode = 200;
    res.json({ name: "Hello John." });
  }
};
