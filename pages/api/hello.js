// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  if (req.method === "POST") {
    res.statusCode = 200;
    res.json({ name: "John Doe" });
  } else if (req.method === "GET") {
    res.statusCode = 200;
    res.json({ name: "Hello John." });
  }
};
