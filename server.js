const express = require("express");
const path = require("path");
const db = require("./database");

const app = express();
const PORT = process.env.PORT || 3000;

// Simple temporary login storage
// This resets when the server restarts.
let currentUser = null;

// Pug setup 
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Home page
app.get("/", (req, res) => {
  res.render("home", {
    title: "Mystery Box Store"
  });
});

// Products page from database
app.get("/products", (req, res) => {
  db.all("SELECT * FROM products", [], (err, products) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Database error");
    }

    res.render("products", {
      title: "Products",
      products: products
    });
  });
});

// Single product page from database
app.get("/products/:id", (req, res) => {
  db.get("SELECT * FROM products WHERE id = ?", [req.params.id], (err, product) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Database error");
    }

    if (!product) {
      return res.status(404).render("404", {
        title: "Product Not Found"
      });
    }

    res.render("product-detail", {
      title: product.name,
      product: product
    });
  });
});

// Cart page
app.get("/cart", (req, res) => {
  res.render("cart", {
    title: "Your Cart"
  });
});

// Checkout page
app.get("/checkout", (req, res) => {
  res.render("checkout", {
    title: "Checkout"
  });
});

app.post("/checkout", (req, res) => {
  res.render("checkout", {
    title: "Checkout",
    success: "Thank you! Your mystery box order has been placed."
  });
});

// Login page
app.get("/login", (req, res) => {
  res.render("login", {
    title: "Login"
  });
});

app.post("/login", (req, res) => {
  currentUser = {
    name: req.body.email,
    email: req.body.email
  };

  res.redirect("/profile");
});

// Register page
app.get("/register", (req, res) => {
  res.render("register", {
    title: "Register"
  });
});

app.post("/register", (req, res) => {
  currentUser = {
    name: req.body.name,
    email: req.body.email
  };

  res.redirect("/profile");
});

// Profile page
app.get("/profile", (req, res) => {
  res.render("profile", {
    title: "Profile",
    user: currentUser || {
      name: "Guest User",
      email: "Not logged in"
    }
  });
});

// Logout page
app.get("/logout", (req, res) => {
  currentUser = null;
  res.redirect("/");
});

// API route from database
app.get("/api/products", (req, res) => {
  db.all("SELECT * FROM products", [], (err, products) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(products);
  });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", {
    title: "Page Not Found"
  });
});

app.listen(PORT, () => {
  console.log(`Mystery Box Store is running on port ${PORT}`);
});
