import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Outlet, useOutlet } from "react-router-dom";
import { Button, Container, Spinner, Badge } from "react-bootstrap";
import { GlobalContext } from "../../context/GlobalContext";
import { ThemeContext } from "../../context/ThemeContext";
import { IoArrowBack } from "react-icons/io5";

const TaskDetail = () => {
  const { id } = useParams();
  const { state } = useContext(GlobalContext);
  const { theme } = useContext(ThemeContext);
  const tasks = state.tasks.list;
  const navigate = useNavigate();

  const [currentTask, setCurrentTask] = useState(null);
  const outlet = useOutlet();

  // ------------------ LIFECYCLE HANDLING ------------------
  useEffect(() => {
    console.log(`TaskDetails mounted for task ${id}`);

    return () => {
      console.log(`TaskDetails unmounted for task ${id}`);
    };
  }, [id]);
  // ---------------------------------------------------------

  useEffect(() => {
    const foundTask = tasks.find((t) => String(t.id) === id);
    if (foundTask) setCurrentTask(foundTask);
  }, [id, tasks]);

  useEffect(() => {
    if (tasks.length > 0 && !currentTask) {
      const timer = setTimeout(() => navigate("/tasks"), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentTask, navigate, tasks]);

  if (!currentTask) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant={theme === "light" ? "primary" : "light"} />
        <p className="mt-3">Loading or Task not found...</p>
      </Container>
    );
  }

  const buttonVariant = theme === "light" ? "outline-primary" : "outline-light";
  const statusVariant = currentTask.completed ? "success" : "warning";

  const cardStyle = {
    backgroundColor: theme === "light" ? "white" : "#132b4aff",
    color: theme === "light" ? "#212529" : "#f8f9fa",
    padding: "1.5rem",
    boxShadow: theme === "light" ? "0 2px 6px rgba(0,0,0,0.08)" : "0 2px 6px rgba(0,0,0,0.3)",
  };

  return (
    <div className="container my-4">
      {/* Header */}
      <div className="row align-items-center mb-4">
        <div className="col">
          <h3 className="fw-bold">Task Detail</h3>
        </div>
        <div className="col text-end">
          <Button variant={buttonVariant} onClick={() => navigate("/tasks")}>
            <IoArrowBack size={20} className="me-1" /> Back
          </Button>
        </div>
      </div>

      {/* ID + Status */}
      <div className="card mb-3 border-0 rounded-4" style={cardStyle}>
        <div className="row">
          <div className="col-12 col-md-6">
            <p className="mb-2 fw-bold">
              ID: <span className="fw-normal">{currentTask.id}</span>
            </p>
          </div>
          <div className="col-12 col-md-6">
            <p className="mb-2 fw-bold">
              Status:{" "}
              <Badge bg={statusVariant} className="fw-bold">
                {currentTask.completed ? "✅ Completed" : "⏳ Pending"}
              </Badge>
            </p>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="card mb-4 border-0 rounded-4" style={cardStyle}>
        <h5 className="mb-0 fw-bold">{currentTask.title}</h5>
      </div>

      {/* Edit Task / Outlet */}
      {outlet && (
        <div
          className="card w-100 rounded-4 mb-4"
          style={{
            padding: "2rem",
            transition: "all 0.3s ease",
            backgroundColor: theme === "light" ? "#f8f9fa" : "#132b4aff",
            color: theme === "light" ? "#212529" : "#f8f9fa",
            boxShadow: theme === "light" ? "0 4px 10px rgba(0,0,0,0.08)" : "0 4px 10px rgba(0,0,0,0.3)",
          }}
        >
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
