import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import { GlobalContext } from "../../context/GlobalContext";
import { ThemeContext } from "../../context/ThemeContext";

const AddTask = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { theme } = useContext(ThemeContext);
  const tasks = state.tasks.list;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    completed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Task title cannot be empty",
      });
      return;
    }

    const newTask = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      userId: 1,
      title: formData.title,
      completed: formData.completed,
    };

    dispatch({ type: "ADD_TASK", payload: newTask });

    Swal.fire({
      icon: "success",
      title: "Task Added",
      text: `"${formData.title}" has been added!`,
      timer: 2000,
      showConfirmButton: false,
    });

    navigate("/tasks");
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center min-vh-100 py-4"
      style={{
        alignItems: window.innerWidth >= 576 ? "center" : "flex-start",
        backgroundColor: theme === "dark" ? "#0d1b2a" : "#f8f9fa",
      }}
    >
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <Card
            className="p-4 shadow"
            style={{
              border: "none",
              backgroundColor: theme === "dark" ? "#17314d" : "#f8f9fa",
            }}
          >
            <Card.Body>
              <h2
                className="text-center mb-4"
                style={{ color: theme === "dark" ? "#aad4f5" : "#000" }}
              >
                Add New Task
              </h2>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formTaskTitle">
                  <Form.Label
                    style={{ color: theme === "dark" ? "#aad4f5" : "#000" }}
                  >
                    Task Title
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter task title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    style={{
                      backgroundColor: theme === "dark" ? "#34495e" : "#fff",
                      color: theme === "dark" ? "#f0f0f0" : "#000",
                      borderColor: theme === "dark" ? "#555" : "#ced4da",
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formTaskCompleted">
                  <Form.Check
                    type="checkbox"
                    label="Completed"
                    name="completed"
                    checked={formData.completed}
                    onChange={handleChange}
                    style={{ color: theme === "dark" ? "#aad4f5" : "#000" }}
                  />
                </Form.Group>

                <div className="d-flex justify-content-between flex-wrap gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => navigate("/tasks")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    style={{
                      backgroundColor:
                        theme === "dark" ? "#2279d0" : "#0a4a86",
                      border: "none",
                      color: "#ffffff",
                    }}
                  >
                    Add Task
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default AddTask;
