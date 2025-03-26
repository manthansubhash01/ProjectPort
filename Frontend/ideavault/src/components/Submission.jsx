import { useState } from "react";

function Submission() {
  const [formData, setFormData] = useState({
    name: "",
    urn: "",
    githubLink: "",
    hostingLink: "",
  });

  function handleSubmit(ev) {
    console.log(ev.target.value);
    console.log(formData);
    setFormData({
      name: "",
      urn: "",
      githubLink: "",
      hostingLink: "",
    });
  }

  function handleChange(ev) {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  }

  return (
    <div>
      <h2>Submit</h2>
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
          <label>Code Link :</label>
          <input
            type="url"
            placeholder="https://github.com/username/repository"
            name="githubLink"
            value={formData.githubLink}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div>
          <label>Hosting Link :</label>
          <input
            type="url"
            placeholder="https://your-hosting.com/project"
            name="hostingLink"
            value={formData.hostingLink}
            onChange={handleChange}
            required
          ></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default Submission;
