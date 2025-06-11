import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Submission() {
  const [formData, setFormData] = useState({
    studentName: "",
    urn: "",
    collegeEmail: "",
    githubLink: "",
    hostingLink: "",
  });

  const [fieldErrors, setFieldErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (fieldErrors || successMessage) {
      const timer = setTimeout(() => {
        setFieldErrors("");
        setSuccessMessage("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [fieldErrors, successMessage]);

  async function handleSubmit(ev) {
    ev.preventDefault();
    console.log(ev.target.value);
    console.log(formData);
    setLoading(true);
    try {
      const response = await fetch(
        "https://projectport-llf4.onrender.com/api/projects/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        // throw new Error("Failed to Submit");
        setFieldErrors(data.message || "Failed to register");
        setSuccessMessage("");
      } else {
        console.log("Submission Successful");
        console.log("API Response", data);
        setSuccessMessage(data.message);
        setFieldErrors("");
        setFormData({
          studentName: "",
          urn: "",
          collegeEmail: "",
          githubLink: "",
          hostingLink: "",
        });
      }
    } catch (err) {
      console.log("Error:", err);
      setFieldErrors("Server Error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(ev) {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  }

  return (
    <div className="work-sans h-screen flex items-center justify-center bg-black">
      <motion.div
        initial={{ y: 150, opacity: 0, scale: 0 }}
        animate={{ y: 10, opacity: 1, scale: 1.05 }}
        transition={{
          duration: 1,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="relative"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-10xl"></div>
        <div className="bg-black flex-col justify-center p-8 rounded-lg shadow-lg w-96 relative">
          <h2 className="text-2xl text-center font-bold text-white">Submit</h2>
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
                className="w-full px-4 py-2 text-white  border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                Code Link :
              </label>
              <input
                type="url"
                placeholder="https://github.com/username/repository"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
                className="w-full px-4 py-2 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              ></input>
            </div>
            <div>
              <label className="block text-gray-400 font-medium pb-2">
                Hosting Link :
              </label>
              <input
                type="url"
                placeholder="https://your-hosting.com/project"
                name="hostingLink"
                value={formData.hostingLink}
                onChange={handleChange}
                className="w-full px-4 py-2 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              ></input>
            </div>
            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg py-2.5 hover:scale-105 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
              } `}
              disabled={true}
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
export default Submission;
