import express from "express";
import cors from "cors";
import pg from "pg";
import "dotenv/config"

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: "blog",
});

app.post("/api/posts", async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: "title and body are required" });
  }
  try {
    const result = await pool.query(
      `INSERT INTO posts (title, content, published)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [title, body, false],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong saving the post" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
