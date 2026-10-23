const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();
setGlobalOptions({maxInstances: 10});

// GET /countBooks -> { "count": <number of docs in "books"> }
exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = await admin.firestore().collection("books").get();
      res.status(200).json({count: snapshot.size});
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

// POST /addBook  body: { isbn, name }
// Capitalises every text field, then saves the book to Firestore.
exports.addBook = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Please use POST");
    }
    try {
      const book = {};
      for (const [key, value] of Object.entries(req.body)) {
        book[key] = typeof value === "string" ? value.toUpperCase() : value;
      }
      const docRef = await admin.firestore().collection("books").add(book);
      res.status(200).json({id: docRef.id, ...book});
    } catch (error) {
      console.error("Error adding book:", error.message);
      res.status(500).send("Error adding book");
    }
  });
});