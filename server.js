import express from "express";
import cors from "cors";
import pg from "pg";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import "dotenv/config";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: "blog",
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// *******************GET**********************************
//  Health Check
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

//  All posts (published/unpublished)
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

//  All "published posts"
app.get("/api/posts/published", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM posts WHERE published=true`);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// *******************POST**********************************
//  "Save&Publish" and "Save" buttons
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

// Login request
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }

  try {
    const result = await pool.query(`SELECT * FROM authors WHERE email = $1`, [
      email,
    ]);
    const author = result.rows[0];

    if (!author) {
      return res.status(401).json({ error: "invalid email or password" });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      author.password_hash,
    );

    if (!passwordMatches) {
      return res.status(401).json({ error: "invalid email or password" });
    }

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const sessionResult = await pool.query(
      `INSERT INTO sessions (author_id, expires_at) VALUES ($1, $2) RETURNING id`,
      [author.id, expiresAt],
    );
    const sessionId = sessionResult.rows[0].id;

    res.cookie("session_id", sessionId, {
      httpOnly: true,
      expires: expiresAt,
      sameSite: "lax",
      secure: false,
    });

    res.status(200).json({ message: "logged in" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "something went wrong logging in" });
  }
});

// Logout request
app.post("/api/logout", async (req, res) => {
  res.cookie("session_id", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "lax",
    secure: false,
  });

  res.status(200).json({ message: "Logged out successfully" });
});
