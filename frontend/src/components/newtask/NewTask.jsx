import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  margin: 5,
  p: 4,
};
const btn = {
  margin: 5,
};

const NewTask = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [token, setToken] = useState("");
  const [priority, setPriority] = useState();
  let navigate = useNavigate();

  const submitTask = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("todoUser"));
    // setToken(user.email);
    // console.log(user.token);
    if (!title || !priority) {
      toast.warn("Title field is mandatory", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/task/createTask",
        {
          title,
          description,
          priority,
        },
        config
      );
      toast(data.msg, "please refresh the page to see result");
      if (data) {
        window.location.reload();
      }
    } catch (error) {
      toast(error.response.data.message);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen}>Add new task</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add new task
          </Typography>
          <FormControl fullWidth>
            {/* <InputLabel id="demo-simple-select-label">Pending</InputLabel> */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="title"
              name="title"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />{" "}
            <TextField
              margin="normal"
              fullWidth
              id="description"
              label="description"
              name="description"
              autoFocus
              onChange={(e) => setDescription(e.target.value)}
            />
            <p>priority</p>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="priority"
              onChange={(e) => setPriority(e.target.value)}
              //   onChange={handleChange}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
            </Select>
            <Button
              type="submit"
              sx={btn}
              variant="contained"
              onClick={submitTask}
            >
              Submit
            </Button>
            <ToastContainer />
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
};

export default NewTask;
