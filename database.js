const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./mysterybox.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      category TEXT NOT NULL,
      image TEXT,
      description TEXT
    )
  `);

  db.get("SELECT COUNT(*) AS count FROM products", (err, row) => {
    if (err) {
      console.error(err.message);
      return;
    }

    if (row.count === 0) {
      const insert = db.prepare(`
        INSERT INTO products (name, price, category, image, description)
        VALUES (?, ?, ?, ?, ?)
      `);

      insert.run(
        "Gaming Mystery Box",
        29.99,
        "Gaming",
        "/images/gaming-box.jpg",
        "A surprise box filled with gaming-themed items, stickers, accessories, and collectibles."
      );

      insert.run(
        "Anime Mystery Box",
        24.99,
        "Anime",
        "/images/anime-box.jpg",
        "A fun mystery box for anime fans with keychains, stickers, mini posters, and surprise collectibles."
      );

      insert.run(
        "Self-Care Mystery Box",
        34.99,
        "Self-Care",
        "/images/self-care-box.jpg",
        "A relaxing box with self-care surprises like candles, skincare samples, bath items, and cozy gifts."
      );

      insert.run(
        "Snack Mystery Box",
        19.99,
        "Snacks",
        "/images/snack-box.jpg",
        "A tasty mystery box full of surprise snacks, candy, chips, drinks, and treats."
      );

      insert.run(
        "Tech Mystery Box",
        39.99,
        "Tech",
        "/images/tech-box.jpg",
        "A mystery box with useful tech accessories, phone gadgets, cables, and desk tools."
      );

      insert.run(
        "Premium Mystery Box",
        59.99,
        "Premium",
        "/images/premium-box.jpg",
        "Our biggest mystery box with higher-value surprises from multiple categories."
      );

      insert.run(
        "Beauty Mystery Box",
        32.99,
        "Beauty",
        "/images/beauty-box.jpg",
        "A beauty-themed mystery box with makeup samples, skincare items, hair accessories, and beauty surprises."
      );

      insert.run(
        "Pet Mystery Box",
        27.99,
        "Pets",
        "/images/pet-box.jpg",
        "A surprise box for pets with toys, treats, accessories, and fun items for cats or dogs."
      );

      insert.run(
        "Book Lover Mystery Box",
        22.99,
        "Books",
        "/images/book-box.jpg",
        "A cozy mystery box with bookmarks, bookish stickers, reading accessories, and surprise items."
      );

      insert.run(
        "Fitness Mystery Box",
        31.99,
        "Fitness",
        "/images/fitness-box.jpg",
        "A mystery box with workout accessories, wellness items, and fitness-themed surprises."
      );

      insert.run(
        "Art Mystery Box",
        28.99,
        "Art",
        "/images/art-box.jpg",
        "A creative mystery box with art supplies, stickers, sketch items, and fun creative tools."
      );

      insert.run(
        "Movie Night Mystery Box",
        26.99,
        "Movies",
        "/images/movie-box.jpg",
        "A fun movie night mystery box with snacks, themed items, cozy surprises, and entertainment accessories."
      );

      insert.finalize();
    }
  });
});

module.exports = db;