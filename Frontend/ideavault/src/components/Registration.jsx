import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Registration() {
  const [formData, setFormData] = useState({
    studentName: "",
    urn: "",
    collegeEmail: "",
    batch: "A",
    projectName: "",
    projectDescription: "",
  });

  // const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // let isError = false;
  useEffect(() => {
    if (fieldErrors || successMessage) {
      const timer = setTimeout(() => {
        setFieldErrors("");
        setSuccessMessage("");
      }, 2000); 

      return () => clearTimeout(timer); // Cleanup function to clear timeout if component re-renders
    }
  }, [fieldErrors, successMessage]);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    console.log(ev.target.value);
    console.log(formData);
    try {
      const response = await fetch(
        "https://projectport-production.up.railway.app/api/projects/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const data = await response.json();
      console.log("Registration Successful");
      setSuccessMessage("Registration Successful!");
      console.log("API Response", data);
      // isError = false
      setFormData({
        studentName: "",
        urn: "",
        collegeEmail: "",
        batch: "A",
        projectName: "",
        projectDescription: "",
      });
    } catch (err) {
      console.log("Error:", err);
      setFieldErrors(`${err}`);
      // isError = true;
    }
  };

  const handleChange = (ev) => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  };

  return (
    <div className="work-sans  p-25 flex  items-center justify-center bg-black">
      <motion.div
        initial={{ y: 150, opacity: 0, scale: 0 }}
        animate={{ y: 10, opacity: 1, scale: 1.05 }}
        transition={{
          duration: 1,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="relative"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-10xl"></div>
        <div className="bg-black flex-col justify-center p-8 rounded-lg shadow-lg w-96 relative">
          <h2 className="text-2xl text-center font-bold text-white">
            Register
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-400 font-medium pb-2">
                Name :
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                className="w-full px-4 py-2 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              ></input>
            </div>
            <div>
              <label className="block text-gray-400 font-medium pb-2">
                Urn :
              </label>
              <input
                type="text"
                placeholder="2024-A-xxxxxxx"
                name="urn"
                value={formData.urn}
                onChange={handleChange}
                className="w-full px-4 py-2 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              ></input>
            </div>
            <div>
              <label className="block text-gray-400 font-medium pb-2">
                College Email :
              </label>
              <input
                type="email"
                placeholder="abc.xyz@adypu.edu.in"
                name="collegeEmail"
                value={formData.collegeEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              ></input>
            </div>
            <div>
              <label className="block text-gray-400 font-medium pb-2">
                Batch :
              </label>
              <select
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                className="w-full px-4 py-2 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="A">Batch A</option>
                <option value="B">Batch B</option>
                <option value="C">Batch c</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 font-medium pb-2">
                Project Name :
              </label>
              <input
                type="text"
                placeholder="Enter your project name"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                className="w-full px-4 py-2 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              ></input>
            </div>
            <div>
              <label className="block text-gray-400 font-medium pb-2">
                Project Description :
              </label>
              <input
                type="text"
                placeholder="Enter your project description"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                className="w-full px-4 py-2 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              ></input>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg py-2.5 hover:scale-105 "
            >
              Submit
            </button>
          </form>
          {fieldErrors && <p className="text-red-500">{fieldErrors}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
        </div>
      </motion.div>
    </div>
  );
}
export default Registration;
