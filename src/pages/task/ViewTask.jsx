import React, { useContext, useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { Button, Spinner, Card, Badge, Form } from "react-bootstrap";
import { GlobalContext } from "../../context/GlobalContext";
import { ThemeContext } from "../../context/ThemeContext";
import { FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { AiOutlinePlusCircle, AiOutlineUnorderedList } from "react-icons/ai";
import "../../App.scss"; // ✅ import your SCSS

const ViewTask = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { theme } = useContext(ThemeContext);
  const { list: tasks, loading, error } = state.tasks;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  const statusFilter = searchParams.get("status");

  const filteredTasks = useMemo(() => {
    let filtered = tasks;
    if (statusFilter === "completed") filtered = filtered.filter((t) => t.completed);
    if (statusFilter === "pending") filtered = filtered.filter((t) => !t.completed);
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((t) =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  }, [tasks, statusFilter, searchQuery]);

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTask = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  useEffect(() => {
    console.log("TaskList mounted");
    return () => console.log("TaskList unmounted");
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      console.log("Tasks updated");
    }
  }, [tasks]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "<span class='fs-responsive'>Are you sure?</span>",
      html: "<span class='fs-responsive'>This task will be permanently deleted!</span>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "<span class='fs-responsive'>Yes, delete it!</span>",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "DELETE_TASK", payload: id });
        Swal.fire(
          "<span class='fs-responsive'>Deleted!</span>",
          "<span class='fs-responsive'>Your task has been deleted.</span>",
          "success"
        );
      }
    });
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant={theme === "dark" ? "light" : "primary"} />
      </div>
    );

  if (error)
    return (
      <h4 className={`text-center ${theme === "dark" ? "text-light" : "text-danger"} fs-responsive`}>
        Error: {error}
      </h4>
    );

  return (
    <div className="container mt-4" style={{ backgroundColor: "transparent", padding: "8px" }}>
      {/* Header */}
      <div
        className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 p-3 rounded-4 shadow"
        style={{ backgroundColor: theme === "dark" ? "#1a2b3c" : "#1271baff", gap: "1rem" }}
      >
        <h2
          style={{ color: theme === "dark" ? "#ffffff" : "#1a2b3c" }}
          className="d-flex align-items-center gap-2 mb-2 mb-md-0 .fs-small-heading"
        >
          <AiOutlineUnorderedList size={25} /> Task List
        </h2>
        <Button
          onClick={() => navigate("/addTask")}
          className="d-flex align-items-center gap-2 shadow-sm fs-responsive"
          style={{ backgroundColor: theme === "dark" ? "#2279d0ff" : "#6f8192ff", border: "none", color: "#ffffff" }}
        >
          <AiOutlinePlusCircle size={24} /> Add Task
        </Button>
      </div>

      {/* Filter + Search */}
      <div className="d-flex justify-content-between flex-wrap gap-2 mb-4">
        <div>
          <Button className="me-2 fs-responsive" variant={!statusFilter ? "primary" : "outline-primary"} onClick={() => setSearchParams({})}>
            All
          </Button>
          <Button className="me-2 fs-responsive" variant={statusFilter === "completed" ? "primary" : "outline-primary"} onClick={() => setSearchParams({ status: "completed" })}>
            Completed
          </Button>
          <Button className="me-2 fs-responsive" variant={statusFilter === "pending" ? "primary" : "outline-primary"} onClick={() => setSearchParams({ status: "pending" })}>
            Pending
          </Button>
        </div>
        <Form className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="fs-responsive"
          />
        </Form>
      </div>

      {/* Task List */}
      <div className="row">
        {currentTask.length === 0 && (
          <p className="text-center w-100 mt-4 fs-responsive">No tasks found.</p>
        )}
        {currentTask.map((task) => (
          <div key={task.id} className="col-12 mb-3">
            <Card
              className={`shadow-sm border-0 rounded-3 ${theme === "dark" ? "bg-secondary text-light" : ""}`}
              onClick={() => navigate(`/task/${task.id}`)}
              style={{ cursor: "pointer", transition: "transform 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Card.Body className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3">
                  <Card.Title className={`mb-0 ${task.completed && "text-muted"} fs-responsive`}>
                    {task.title}
                  </Card.Title>
                  <Badge bg={task.completed ? "success" : "warning"} className="fw-bold fs-responsive">
                    {task.completed ? "Completed" : "Pending"}
                  </Badge>
                </div>

                <div className="d-flex gap-3 mt-3 mt-md-0">
                  <FaRegEdit
                    size={20}
                    color={theme === "dark" ? "white" : "grey"}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/task/${task.id}/edit`);
                    }}
                  />
                  <MdDeleteForever
                    size={25}
                    color="brown"
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(task.id);
                    }}
                  />
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4 flex-wrap gap-2">
          <Button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="fs-responsive"
            style={{ backgroundColor: theme === "dark" ? "transparent" : "#243341ff", color: "#fff", border: theme === "dark" ? "1px solid #4a5568" : "none" }}
          >
            Prev
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <Button
              key={num}
              onClick={() => setCurrentPage(num)}
              className="fs-responsive"
              style={{
                backgroundColor: num === currentPage ? (theme === "dark" ? "transparent" : "#243341ff") : "transparent",
                color: num === currentPage ? "#fff" : theme === "dark" ? "#fff" : "#243341ff",
                border: theme === "dark" ? "1px solid #4a5568" : num === currentPage ? "none" : "1px solid #243341ff",
              }}
            >
              {num}
            </Button>
          ))}

          <Button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="fs-responsive"
            style={{ backgroundColor: theme === "dark" ? "transparent" : "#243341ff", color: "#fff", border: theme === "dark" ? "1px solid #4a5568" : "none" }}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ViewTask;
