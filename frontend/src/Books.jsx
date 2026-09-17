import { useState, useEffect } from "react";

function Books() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [books, setBooks] = useState([]);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    category: "",
    status: "Available",
  });

  const [editingId, setEditingId] = useState(null);

  // Fetch books from backend
  useEffect(() => {
    fetch(`${API_URL}/api/books`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error("Failed to fetch books:", error);
      });
  }, []);

  // Search books
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  // Delete book
  const deleteBook = async (id) => {
    try {
     const response = await fetch(
  `${API_URL}/api/books/${id}`,
  {
    method: "DELETE",
  }
);

      if (!response.ok) {
        throw new Error("Failed to delete book");
      }

      setBooks((currentBooks) =>
        currentBooks.filter((book) => book._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  // Change book status
  const changeStatus = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "Available" ? "Issued" : "Available";

    try {
      const response = await fetch(
  `${API_URL}/api/books/${id}`,
  {
    method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update book status");
      }

      const updatedBook = await response.json();

      setBooks((currentBooks) =>
        currentBooks.map((book) =>
          book._id === id ? updatedBook : book
        )
      );
    } catch (error) {
      console.error("Failed to change book status:", error);
    }
  };

  // Add new book
  const addBook = async (e) => {
    e.preventDefault();

    if (!newBook.title || !newBook.author || !newBook.category) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/books`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBook),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add book");
      }

      const savedBook = await response.json();

      setBooks((currentBooks) => [
        ...currentBooks,
        savedBook,
      ]);

      setNewBook({
        title: "",
        author: "",
        category: "",
        status: "Available",
      });

      setShowForm(false);
    } catch (error) {
      console.error("Failed to add book:", error);
    }
  };

  // Start editing a book
  const startEdit = (book) => {
    setEditingId(book._id);

    setNewBook({
      title: book.title,
      author: book.author,
      category: book.category,
      status: book.status,
    });

    setShowForm(true);
  };

  // Update book
  const updateBook = async (e) => {
    e.preventDefault();

    if (!newBook.title || !newBook.author || !newBook.category) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/books/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBook),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update book");
      }

      const updatedBook = await response.json();

      setBooks((currentBooks) =>
        currentBooks.map((book) =>
          book._id === editingId ? updatedBook : book
        )
      );

      setEditingId(null);

      setNewBook({
        title: "",
        author: "",
        category: "",
        status: "Available",
      });

      setShowForm(false);
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  };

  return (
    <div className="books-page">
      <div className="books-header">
        <div>
          <h1>Book Management</h1>
          <p>Manage all books in the library.</p>
        </div>

        <button
          type="button"
          className="add-book-btn"
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);

            setNewBook({
              title: "",
              author: "",
              category: "",
              status: "Available",
            });
          }}
        >
          + Add Book
        </button>
      </div>

      {showForm && (
        <form
          className="book-form"
          onSubmit={editingId ? updateBook : addBook}
        >
          <input
            type="text"
            placeholder="Book title"
            value={newBook.title}
            onChange={(e) =>
              setNewBook({
                ...newBook,
                title: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) =>
              setNewBook({
                ...newBook,
                author: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Category"
            value={newBook.category}
            onChange={(e) =>
              setNewBook({
                ...newBook,
                category: e.target.value,
              })
            }
          />

          <select
            value={newBook.status}
            onChange={(e) =>
              setNewBook({
                ...newBook,
                status: e.target.value,
              })
            }
          >
            <option value="Available">Available</option>
            <option value="Issued">Issued</option>
          </select>

          <button type="submit">
            {editingId ? "Update Book" : "Save Book"}
          </button>

          <button
            type="button"
            onClick={() => {
              setShowForm(false);
              setEditingId(null);

              setNewBook({
                title: "",
                author: "",
                category: "",
                status: "Available",
              });
            }}
          >
            Cancel
          </button>
        </form>
      )}

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="books-container">
        {filteredBooks.length === 0 ? (
          <p className="no-books">No books found.</p>
        ) : (
          filteredBooks.map((book) => (
            <div className="book-card" key={book._id}>
              <div className="book-icon">📖</div>

              <h2>{book.title}</h2>

              <p>
                <strong>Author:</strong> {book.author}
              </p>

              <p>
                <strong>Category:</strong> {book.category}
              </p>

              <span
                className={
                  book.status === "Available"
                    ? "status available"
                    : "status issued"
                }
              >
                {book.status}
              </span>

              <div className="book-actions">
                <button
                  type="button"
                  onClick={() =>
                    changeStatus(book._id, book.status)
                  }
                >
                  Change Status
                </button>

                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => startEdit(book)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => deleteBook(book._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Books;