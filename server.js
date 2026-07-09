import express from "express";
import cors from "cors";
import pg from "pg";
import "dotenv/config";

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

// Health Check - GET
app.get("/", async (req, res) => {
  try {
    console.log("Hello World!");
  } catch (err) {
    console
      .error(err)
      .status(500)
      .json({ error: "Unable to connect to server" });
  }
});

// GET all posts (published/unpublished)
app.get("/api/posts", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM posts`);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Something went wrong while retrieving posts" });
  }
});

// GET all "published posts"
app.get("/api/posts", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM posts WHERE published=true`);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});


// POST "Save&Publish" and "Save"
app.post("/api/posts", async (req, res) => {
  const { title, body, published } = req.body;
  if (!title || !body) {
    return res.status(400).json({ error: "title and body are required" });
  }
  try {
    const result = await pool.query(
      `INSERT INTO posts (title, content, published)
      VALUES($1, $2, $3)
      RETURNING *`,
      [title, body, !!published],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong saving the post" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
