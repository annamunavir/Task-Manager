import React, { useContext } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { ThemeContext } from "../../context/ThemeContext";

const Home = () => {
  const { setIsLogin } = useContext(GlobalContext);
  const { theme } = useContext(ThemeContext);

  

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        backgroundColor: theme === "dark" ? "#0d1b2a" : "#f8f9fa",
        color: theme === "dark" ? "#ffffff" : "#212529",
      }}    >
      <div className="row justify-content-center text-center w-100">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="p-4 p-md-5 rounded-4">
            <h1
              className="fw-bold mb-4"
              style={{
                fontSize: "50px",
                background:
                  "linear-gradient(135deg, #667eea 0%, #712fb3ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Task Manager
            </h1>
            <p className="lead mb-4">
              “Welcome to your Task Manager! Stay organized and boost
              productivity by creating, updating, and tracking your daily tasks
              with ease. Manage your priorities, set deadlines, and keep
              everything in one place for a smoother workflow.”
            </p>
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <Link to="/authentication">
                <Button
                  onClick={() => setIsLogin(true)}
                  variant="primary"
                  size="lg"
                  className="px-4 shadow w-100"
                >
                  Login
                </Button>
              </Link>
              <Link to="/authentication">
                <Button
                  onClick={() => setIsLogin(false)}
                  variant="success"
                  size="lg"
                  className="px-4 shadow w-100"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
