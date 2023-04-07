import React, { useEffect, useState } from "react";
import "./Home.css";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import ChangeStatusModal from "../../components/changeStatus/ChangeStatusModal";
import NewTask from "../../components/newtask/NewTask";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");

  const getData = async (user) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:5000/api/task/getAllTask",

        config
      );

      setData(data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("todoUser"));
    if (!user) {
      navigate("/login");
    }

    getData(user);
  }, [navigate]);

  return (
    <>
      <div className="todo-card-container">
        <div className="todo-card-status-btn">
          <NewTask />
        </div>
        {data &&
          data.map((task, index) => (
            <div className="todo-card" key={task._id}>
              {task.status === "pending" && (
                <div className="todo-card-status-btn">
                  <ChangeStatusModal taskId={task._id} />
                </div>
              )}

              <h2 className="todo-card-title">
                {index + 1}. {task.title} ({task.priority}) [
                {task.status == "completed" ? (
                  <DoneIcon />
                ) : task.status == "cancelled" ? (
                  <CloseIcon />
                ) : (
                  "pending"
                )}
                ]
              </h2>

              <p className="todo-card-description">{task.description}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;
