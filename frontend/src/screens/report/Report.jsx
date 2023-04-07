import React, { useEffect, useState } from "react";
import "./Report.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Report = () => {
  const navigate = useNavigate();
  const [count, setCont] = useState({});
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
        "http://localhost:5000/api/task/getTaskCount",

        config
      );
      const res = await axios.get(
        "http://localhost:5000/api/task/getSortedTask",

        config
      );

      setCont(data);
      setData(res.data);
      console.log(res.data);
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
    <div>
      <div className="card-container">
        <div className="card">
          <h2 className="card-title">pending</h2>
          <p className="card-count">{count.pending || "0"}</p>
        </div>
        <div className="card">
          <h2 className="card-title">cancel</h2>
          <p className="card-count">{count.canceled || "0"}</p>
        </div>
        <div className="card">
          <h2 className="card-title">completed</h2>
          <p className="card-count">{count.completed || "0"}</p>
        </div>
      </div>

      <div className="table-container">
        <h3>
          sorted task list based on their status ( pending, canceled, completed
          )
        </h3>

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((task) => (
                <tr key={task._id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
