import React from 'react'
import './Home.css'
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import ChangeStatusModal from '../../components/changeStatus/ChangeStatusModal';
import NewTask from '../../components/newtask/NewTask';
const Home = () => {
  return (
    <>
      <div className="todo-card-container">
        <div className="todo-card-status-btn">
          <NewTask />
        </div>
        
        <div className="todo-card">
          <div className="todo-card-status-btn">
            <ChangeStatusModal />
          </div>

          <h2 className="todo-card-title">
            To-Do App (2) [<DoneIcon />]{" "}
          </h2>

          <p className="todo-card-description">
            This app allows you to create, manage and prioritize your to-do
            list. You can add new tasks, mark tasks as completed, and delete
            tasks that you no longer need. Stay organized and on top of your
            tasks with this easy-to-use to-do app.
          </p>
        </div>
        <div className="todo-card">
          <button className="todo-card-status-btn">Change Status</button>
          <h2 className="todo-card-title">
            To-Do App ("2") [<CloseIcon />]
          </h2>
          <p className="todo-card-description">
            This app allows you to create, manage and prioritize your to-do
            list. You can add new tasks, mark tasks as completed, and delete
            tasks that you no longer need. Stay organized and on top of your
            tasks with this easy-to-use to-do app.
          </p>
        </div>
      </div>
    </>
  );
}

export default Home
