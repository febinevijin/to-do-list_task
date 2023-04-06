import mongoose from "mongoose";


const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },

    priority: {
      type: Number,
      min: 1,
      max: 9,
      default: 1,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled",],
      default: "pending",
    },
   
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);



export default mongoose.model("Task", taskSchema);
