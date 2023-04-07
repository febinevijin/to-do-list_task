import React from 'react'
import './Report.css'
const Report = () => {
  return (
    <div>
      <div className="card-container">
        <div className="card">
          <h2 className="card-title">pending</h2>
          <p className="card-count">5</p>
        </div>
        <div className="card">
          <h2 className="card-title">cancel</h2>
          <p className="card-count">15</p>
        </div>
        <div className="card">
          <h2 className="card-title">completed</h2>
          <p className="card-count">30</p>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Task 1</td>
              <td>Finish project by end of week</td>
              <td>Pending</td>
            </tr>
            <tr>
              <td>Task 2</td>
              <td>Submit report by next Friday</td>
              <td>Completed</td>
            </tr>
            <tr>
              <td>Task 3</td>
              <td>Meet with client to discuss new project</td>
              <td>Canceled</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Report
