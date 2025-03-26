import { useState } from "react";

function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    urn: "",
    email: "",
    batch: "A",
    projectName: "",
    projectDescription: "",
  });

  const handleSubmit = (ev) => {
    console.log(ev.target.value);
    console.log(formData);
    setFormData({
      name: "",
      urn: "",
      email: "",
      batch: "A",
      projectName: "",
      projectDescription: "",
    });
  };

  const handleChange = (ev) => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name :</label>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div>
          <label>Urn :</label>
          <input
            type="text"
            placeholder="2024-A-xxxxxxx"
            name="urn"
            value={formData.urn}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div>
          <label>College Email :</label>
          <input
            type="email"
            placeholder="abc.xyz@adypu.edu.in"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div>
          <label>Batch :</label>
          <select
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            required
          >
            <option value="A">Batch A</option>
            <option value="B">Batch B</option>
            <option value="C">Batch c</option>
          </select>
        </div>
        <div>
          <label>Project Name :</label>
          <input
            type="text"
            placeholder="Enter your project name"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div>
          <label>Project Description :</label>
          <input
            type="text"
            placeholder="Enter your project description"
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleChange}
            required
          ></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default Registration;
