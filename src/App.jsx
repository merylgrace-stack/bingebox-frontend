import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import AddMovie from "./components/AddMovie";
import Watchlist from "./components/Watchlist";

const API_URL = "https://bingebox-ra8f.onrender.com";

function App() {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [password, setPassword] = useState("");
  const [media, setMedia] = useState([]);
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("userToken")
  );

  const [title, setTitle] = useState("");
  const [type, setType] = useState("movie");
  const [status, setStatus] = useState("unwatched");
  const [rating, setRating] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Restore login when the app starts
  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      return;
    }

    axios.defaults.headers.common["Authorization"] = `Token ${token}`;

    axios
      .get(`${API_URL}/watchlist/api/media/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setMedia(response.data);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log(
          "AUTO LOGIN ERROR:",
          JSON.stringify(error.response?.data, null, 2)
        );

        localStorage.removeItem("userToken");
        localStorage.removeItem("username");

        delete axios.defaults.headers.common["Authorization"];

        setLoggedIn(false);
        setMedia([]);
      });
  }, []);

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/api-token-auth/`,
        {
          username,
          password,
        }
      );

      const token = response.data.token;

      // Save login information
      localStorage.setItem("userToken", token);
      localStorage.setItem("username", username);

      // Set token for future requests
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;

      console.log("TOKEN BEING SENT:", token);
      console.log(
        "AUTH HEADER BEFORE GET:",
        axios.defaults.headers.common["Authorization"]
      );

      // Get existing watchlist
      const mediaResponse = await axios.get(
        `${API_URL}/watchlist/api/media/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setMedia(mediaResponse.data);
      setLoggedIn(true);

      alert("Login successful!");
    } catch (error) {
      console.log(
        "LOGIN ERROR:",
        JSON.stringify(error.response?.data, null, 2)
      );

      console.log("STATUS:", error.response?.status);

      alert("Login failed!");
    }
  };

  // Add movie
  const handleAddMovie = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/watchlist/api/media/`,
        {
          title,
          type,
          status,
          rating: rating ? Number(rating) : null,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("userToken")}`,
          },
        }
      );

      setMedia([...media, response.data]);

      setTitle("");
      setType("movie");
      setStatus("unwatched");
      setRating("");

      alert("Movie added!");
    } catch (error) {
      console.log(
        "ADD MOVIE ERROR:",
        JSON.stringify(error.response?.data, null, 2)
      );

      alert("Could not add movie.");
    }
  };

  // Edit movie
  const handleEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title);
    setType(item.type);
    setStatus(item.status);
    setRating(item.rating ?? "");
  };

  // Update movie
  const handleUpdateMovie = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${API_URL}/watchlist/api/media/${editingId}/`,
        {
          title,
          type,
          status,
          rating: rating ? Number(rating) : null,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("userToken")}`,
          },
        }
      );

      console.log("UPDATED MOVIE:", response.data);

      setMedia(
        media.map((item) =>
          item.id === editingId ? response.data : item
        )
      );

      setEditingId(null);
      setTitle("");
      setType("movie");
      setStatus("unwatched");
      setRating("");

      alert("Movie updated!");
    } catch (error) {
      console.log(
        "UPDATE MOVIE ERROR:",
        JSON.stringify(error.response?.data, null, 2)
      );

      alert("Could not update movie.");
    }
  };

  // Delete movie
  const handleDeleteMovie = async (id) => {
    try {
      await axios.delete(
        `${API_URL}/watchlist/api/media/${id}/`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("userToken")}`,
          },
        }
      );

      setMedia(media.filter((item) => item.id !== id));

      alert("Movie deleted!");
    } catch (error) {
      console.log(
        "DELETE MOVIE ERROR:",
        JSON.stringify(error.response?.data, null, 2)
      );

      alert("Could not delete movie.");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("username");

    delete axios.defaults.headers.common["Authorization"];

    setLoggedIn(false);
    setMedia([]);

    setUsername("");
    setPassword("");

    setTitle("");
    setType("movie");
    setStatus("unwatched");
    setRating("");
    setEditingId(null);
  };

  return (
    <div className="app-container">
      {!loggedIn ? (
        <Login
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <div>
          <Navbar
            username={username}
            handleLogout={handleLogout}
          />

          <AddMovie
            title={title}
            type={type}
            status={status}
            rating={rating}
            setTitle={setTitle}
            setType={setType}
            setStatus={setStatus}
            setRating={setRating}
            handleAddMovie={handleAddMovie}
            handleUpdateMovie={handleUpdateMovie}
            editingId={editingId}
          />

          <Watchlist
            media={media}
            handleEdit={handleEdit}
            handleDeleteMovie={handleDeleteMovie}
          />
        </div>
      )}
    </div>
  );
}

export default App;