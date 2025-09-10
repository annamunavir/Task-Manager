import React, { useState, useContext, useEffect } from "react";
import { Navbar, Container, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { FaMoon, FaSun, FaUserPlus } from "react-icons/fa";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import Swal from "sweetalert2";
import { GlobalContext } from "../../context/GlobalContext";
import { ThemeContext } from "../../context/ThemeContext";

const Header = () => {
  const { logout, state, setIsLogin } = useContext(GlobalContext);
  const { user } = state.auth;
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, logout",
      background: theme === "dark" ? "#2d3748" : "#ffffff",
      color: theme === "dark" ? "#ffffff" : "#000000",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          icon: "success",
          title: "Logged out",
          timer: 1500,
          showConfirmButton: false,
          background: theme === "dark" ? "#303845ff" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#000000",
        });
        navigate("/");
      }
    });
  };

  const profileLetter = user?.userName?.charAt(0).toUpperCase() || null;
  const isLight = theme === "light";

  const handleMenuClick = (page) => {
    if (page === "home") {
      navigate("/");
    } else if (page === "tasks") {
      if (user) {
        navigate("/tasks");
      } else {
        Swal.fire({
          icon: "info",
          title: "Please login",
          text: "You must be logged in to view tasks",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    }
  };

  const profileSize = windowWidth < 576 ? 32 : 42;
  const fontSize = windowWidth < 576 ? "1rem" : "1.2rem";

  const [hovered, setHovered] = useState({ home: false, tasks: false });

  return (
    <Navbar
      className="py-2 shadow-sm"
      style={{
        backgroundColor: "#1a202c",
        borderBottom: "1px solid #2d3748",
      }}
    >
      <Container fluid className="d-flex align-items-center px-3 flex-nowrap">
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold"
          style={{
            fontSize: "1.5rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ✨ Task Manager
        </Navbar.Brand>

        <div className="d-none d-md-flex mx-auto gap-4 justify-content-center align-items-center">
          <span
            onClick={() => handleMenuClick("home")}
            onMouseEnter={() => setHovered((prev) => ({ ...prev, home: true }))}
            onMouseLeave={() => setHovered((prev) => ({ ...prev, home: false }))}
            style={{
              cursor: "pointer",
              fontWeight: 500,
              color: hovered.home ? "#667eea" : "#fff",
              transform: hovered.home ? "scale(1.05)" : "scale(1)",
              transition: "all 0.2s ease",
              fontSize: "1.1rem",
            }}
          >
            Home
          </span>

          <span
            onClick={() => handleMenuClick("tasks")}
            onMouseEnter={() => setHovered((prev) => ({ ...prev, tasks: true }))}
            onMouseLeave={() => setHovered((prev) => ({ ...prev, tasks: false }))}
            style={{
              cursor: "pointer",
              fontWeight: 500,
              color: hovered.tasks ? "#667eea" : "#fff",
              transform: hovered.tasks ? "scale(1.05)" : "scale(1)",
              transition: "all 0.2s ease",
              fontSize: "1.1rem",
            }}
          >
            Tasks
          </span>
        </div>


        <div className="ms-auto d-flex align-items-center gap-2 gap-md-3 flex-nowrap">
          <div
            className="d-flex align-items-center justify-content-center rounded"
            onClick={toggleTheme}
            style={{
              cursor: "pointer",
              padding: "6px 10px",
              color: isLight ? "#cad8f1ff" : "#e2e8f0",
            }}
            title="Toggle Dark/Light Mode"
          >
            {isLight ? <FaMoon size={22} /> : <FaSun size={22} />}
          </div>

          <Dropdown show={open} align="end" onToggle={() => setOpen(!open)}>
            <Dropdown.Toggle
              as="button"
              onClick={() => setOpen(!open)}
              className="d-flex align-items-center justify-content-center rounded-circle border-0"
              style={{
                width: `${profileSize}px`,
                height: `${profileSize}px`,
                cursor: "pointer",
                background: user
                  ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  : isLight
                    ? "#f7fafc"
                    : "#2d3748",
                color: user ? "#fff" : isLight ? "#4a5568" : "#e2e8f0",
                fontWeight: "600",
                fontSize: fontSize,
                border: isLight ? "2px solid #e2e8f0" : "2px solid #4a5568",
              }}
            >
              {user ? (
                <span style={{ lineHeight: 1 }}>{profileLetter}</span>
              ) : (
                <MdAccountCircle
                  size={profileSize + 6}   // 👈 make it slightly larger than the circle size
                />
              )}
            </Dropdown.Toggle>

            <Dropdown.Menu
              style={{
                backgroundColor: isLight ? "#fff" : "#2d3748",
                border: isLight ? "1px solid #e2e8f0" : "1px solid #4a5568",
                minWidth: "200px",
                borderRadius: "12px",
                padding: "8px 0",
              }}
            >
              {/* Mobile: Home & Tasks */}
              <div className="d-md-none">
                <Dropdown.Item onClick={() => handleMenuClick("home")}>
                  Home
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleMenuClick("tasks")}>
                  Tasks
                </Dropdown.Item>
                <Dropdown.Divider
                  style={{ borderColor: isLight ? "#e2e8f0" : "#4a5568" }}
                />
              </div>

              {user ? (
                <>
                  <Dropdown.Item disabled style={{ opacity: 0.5, color: isLight ? "#15294fff" : "#fff" }}>
                    👋 Hi, <strong>{user?.userName || user?.email}</strong>
                  </Dropdown.Item>
                  <Dropdown.Divider
                    style={{ borderColor: isLight ? "#e2e8f0" : "#4a5568" }}
                  />
                  <Dropdown.Item onClick={handleLogout} style={{ color: "#3572dcff" }}>
                    <FiLogOut size={18} /> Logout
                  </Dropdown.Item>
                </>
              ) : (
                <>
                  <Dropdown.Item as={Link} to="/authentication?mode=login" onClick={() => setIsLogin(true)}>
                    <FiLogIn size={18} /> Login
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/authentication?mode=signup" onClick={() => setIsLogin(false)}>
                    <FaUserPlus size={18} /> Sign Up
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
