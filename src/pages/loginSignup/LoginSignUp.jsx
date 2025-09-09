import React, { useContext, useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { ThemeContext } from "../../context/ThemeContext";

const LoginSignUp = () => {
  const navigate = useNavigate();
  const { login, signUp, state, setIsLogin } = useContext(GlobalContext);
  const { isLogin } = state.auth;
  const { theme } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      const success = login(formData.email, formData.password);
      if (success) {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome back, ${formData.email}!`,
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/tasks");
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password.",
        });
      }
    } else {
      signUp(formData);
      Swal.fire({
        icon: "success",
        title: "SignUp Successful",
        text: `Welcome, ${formData.userName}! Please login to continue.`,
        timer: 2500,
        showConfirmButton: false,
      });
      setIsLogin(true);
      setFormData({ userName: "", email: "", password: "" });
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: theme === "dark" ? "#0d1b2a" : "#f8f9fa",
      }}
    >
      <div className="row w-100 justify-content-center">
        <div className="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-4">
          <Card
            className="rounded-4 shadow-lg p-4"
            style={{
              backgroundColor: theme === "dark" ? "#1b263b" : "#ffffff",
              color: theme === "dark" ? "#f8f9fa" : "#212529",
            }}
          >
            <Card.Body>
              <h2
                className="text-center mb-4"
                style={{ color: theme === "dark" ? "#aad4f5" : "#212529" }}
              >
                {isLogin ? "Login" : "SignUp"}
              </h2>

              <Form onSubmit={handleSubmit}>
                {!isLogin && (
                  <Form.Group className="mb-3" controlId="formBasicUserName">
                    <Form.Label style={{ color: theme === "dark" ? "#aad4f5" : "#212529" }}>
                      User Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="userName"
                      value={formData.userName}
                      required
                      onChange={handleChange}
                      placeholder="Enter user name"
                      className="py-2 py-md-3"
                      style={{
                        backgroundColor: theme === "dark" ? "#34495e" : "#fff",
                        color: theme === "dark" ? "#f8f9fa" : "#000",
                        borderColor: theme === "dark" ? "#555" : "#ced4da",
                      }}
                    />
                  </Form.Group>
                )}

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{ color: theme === "dark" ? "#aad4f5" : "#212529" }}>
                    Email address
                  </Form.Label>
                  <Form.Control
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    required
                    placeholder="Enter email"
                    className="py-2 py-md-3"
                    style={{
                      backgroundColor: theme === "dark" ? "#34495e" : "#fff",
                      color: theme === "dark" ? "#f8f9fa" : "#000",
                      borderColor: theme === "dark" ? "#555" : "#ced4da",
                    }}
                  />
                  
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label style={{ color: theme === "dark" ? "#aad4f5" : "#212529" }}>
                    Password
                  </Form.Label>
                  <Form.Control
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    type="password"
                    placeholder="Password"
                    className="py-2 py-md-3"
                    style={{
                      backgroundColor: theme === "dark" ? "#34495e" : "#fff",
                      color: theme === "dark" ? "#f8f9fa" : "#000",
                      borderColor: theme === "dark" ? "#555" : "#ced4da",
                    }}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 rounded"
                  size="lg"
                  variant="primary"
                  style={{
                    backgroundColor: theme === "dark" ? "#aad4f5" : "#0d6efd",
                    border: "none",
                    color: theme === "dark" ? "#0d1b2a" : "#fff",
                  }}
                >
                  {isLogin ? "Login" : "SignUp"}
                </Button>
              </Form>

              <div className="text-center mt-3">
                {isLogin ? (
                  <p>
                    Don’t have an account?{" "}
                    <span
                      onClick={() => setIsLogin(false)}
                      className="fw-bold"
                      style={{
                        cursor: "pointer",
                        color: theme === "dark" ? "#fbb13c" : "#0d6efd",
                      }}
                    >
                      SignUp
                    </span>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <span
                      onClick={() => setIsLogin(true)}
                      className="fw-bold"
                      style={{
                        cursor: "pointer",
                        color: theme === "dark" ? "#fbb13c" : "#0d6efd",
                      }}
                    >
                      Login
                    </span>
                  </p>
                )}
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
