// import React, { useContext, useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Form, Button, Card } from "react-bootstrap";
// import Swal from "sweetalert2";
// import { GlobalContext } from "../../../context/GlobalContext";

// const EditTask = () => {
//   const { id } = useParams();
//   const { state, dispatch } = useContext(GlobalContext);
//   const tasks = state.tasks.list;
//   const navigate = useNavigate();

//   // ------------------ LIFECYCLE LOG ------------------
//   useEffect(() => {
//     console.log(`EditTask mounted for task ${id}`);
//     return () => {
//       console.log(`EditTask unmounted for task ${id}`);
//     };
//   }, [id]);
//   // ---------------------------------------------------

//   const [formData, setFormData] = useState({
//     title: "",
//     completed: false,
//   });

//   useEffect(() => {
//     const taskToEdit = tasks.find((t) => String(t.id) === id);
//     if (taskToEdit) {
//       setFormData({
//         title: taskToEdit.title,
//         completed: taskToEdit.completed,
//       });
//     }
//   }, [id, tasks]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.title.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Task title cannot be empty",
//       });
//       return;
//     }

//     const updatedTask = {
//       id: Number(id),
//       title: formData.title,
//       completed: formData.completed,
//       userId: 1,
//     };

//     dispatch({ type: "UPDATE_TASK", payload: updatedTask });

//     Swal.fire({
//       icon: "success",
//       title: "Task Updated",
//       text: `"${formData.title}" has been updated!`,
//       timer: 2000,
//       showConfirmButton: false,
//     });

//     navigate(`/task/${id}`);
//   };

//   return (
//     <div className="d-flex justify-content-center py-4">
//       <div className="col-12 col-sm-10 col-md-8 col-lg-12">
//         <Card className="shadow-sm">
//           <Card.Body>
//             <h2 className="mb-4 text-center">Edit Task</h2>
//             <Form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <Form.Label>Task Title</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter task title"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="mb-3 form-check">
//                 <Form.Check
//                   type="checkbox"
//                   label="Completed"
//                   name="completed"
//                   checked={formData.completed}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="d-flex flex-wrap gap-2">
//                 <div className="flex-grow-1 flex-sm-grow-0">
//                   <Button
//                     variant="secondary"
//                     className="w-100"
//                     onClick={() => navigate(`/task/${id}`)}
//                   >
//                     Cancel
//                   </Button>
//                 </div>
//                 <div className="flex-grow-1 flex-sm-grow-0">
//                   <Button variant="primary" type="submit" className="w-100">
//                     Update Task
//                   </Button>
//                 </div>
//               </div>
//             </Form>
//           </Card.Body>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default EditTask;

import React, { useContext, useEffect, useState } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import { GlobalContext } from "../../context/GlobalContext";
import { ThemeContext } from "../../context/ThemeContext";

const EditTask = () => {
  const { id } = useParams();
  const { state, dispatch } = useContext(GlobalContext);
  const { theme } = useContext(ThemeContext);
  const tasks = state.tasks.list;
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`EditTask mounted for task ${id}`);
    return () => {
      console.log(`EditTask unmounted for task ${id}`);
    };
  }, [id]);

  const [formData, setFormData] = useState({
    title: "",
    completed: false,
  });

  useEffect(() => {
    const taskToEdit = tasks.find((t) => String(t.id) === id);
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        completed: taskToEdit.completed,
      });
    }
  }, [id, tasks]);

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

    const updatedTask = {
      id: Number(id),
      title: formData.title,
      completed: formData.completed,
      userId: 1,
    };

    dispatch({ type: "UPDATE_TASK", payload: updatedTask });

    Swal.fire({
      icon: "success",
      title: "Task Updated",
      text: `"${formData.title}" has been updated!`,
      timer: 2000,
      showConfirmButton: false,
    });

    navigate(`/task/${id}`);
  };

  return (
    <div
      className="d-flex justify-content-center "
      style={{ backgroundColor: theme === "dark" ? "#1a2b3c" : "#f8f9fa",  }}
    >
      <div className="col-12 col-sm-10 col-md-8 col-lg-12">
        <Card
          className="shadow-sm"
          style={{ backgroundColor: theme === "dark" ? "#17314dff" : "#fff", color: theme === "dark" ? "#f0f0f0" : "#000" }}
        >
          <Card.Body>
            <h2 className="mb-4 text-center" style={{ color: theme === "dark" ? "#aad4f5" : "#333" }}>
              Edit Task
            </h2>
            <Form onSubmit={handleSubmit}>
              <div className="mb-3">
                <Form.Label style={{ color: theme === "dark" ? "#aad4f5" : "#333" }}>Task Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter task title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  style={{
                    backgroundColor: theme === "dark" ? "#34495e" : "#fff",
                    color: theme === "dark" ? "#f0f0f0" : "#000",
                    borderColor: theme === "dark" ? "#555" : "#ced4da"
                  }}
                />
              </div>

              <div className="mb-3 form-check">
                <Form.Check
                  type="checkbox"
                  label="Completed"
                  name="completed"
                  checked={formData.completed}
                  onChange={handleChange}
                  style={{ color: theme === "dark" ? "#aad4f5" : "#333" }}
                />
              </div>

              <div className="d-flex justify-content-between  flex-wrap gap-2">
                <div className="flex-grow-1 flex-sm-grow-0">
                  <Button
                    variant={theme === "dark" ? "secondary" : "secondary"}
                    className="w-100"
                    onClick={() => navigate(`/task/${id}`)}
                  >
                    Cancel
                  </Button>
                </div>
                <div className="flex-grow-1 flex-sm-grow-0">
                  <Button
                    variant={theme === "dark" ? "primary" : "primary"}
                    type="submit"
                    className="w-100"
                  >
                    Update Task
                  </Button>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default EditTask;

