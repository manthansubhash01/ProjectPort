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
  const [loading, setLoading] = useState(false);
  const [duplicateSuggestions, setDuplicateSuggestions] = useState([]);
  // let isError = false;
  useEffect(() => {
    if (fieldErrors || successMessage) {
      const timer = setTimeout(() => {
        setFieldErrors("");
        setSuccessMessage("");
        setDuplicateSuggestions("");
      }, 3000);

      return () => clearTimeout(timer); 
    }
  }, [fieldErrors, successMessage]);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    // console.log(ev.target.value);
    // console.log(formData);
    setLoading(true);
    try {
      const response = await fetch(
        "https://projectport-llf4.onrender.com/api/projects/register",
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
        setFieldErrors(data.message || "Failed to register");
        setDuplicateSuggestions(data.suggestions || "");
        setSuccessMessage("");
      } else {
        console.log("Registration Successful");
        setSuccessMessage("Registration Successful!", data.message);
        // console.log("API Response", data);
        // isError = false
        setFieldErrors("");
        setDuplicateSuggestions("");
        setFormData({
          studentName: "",
          urn: "",
          collegeEmail: "",
          batch: "A",
          projectName: "",
          projectDescription: "",
        });
      }
    } catch (err) {
      console.log("Error:", err);
      setFieldErrors("Server Error. Please try again.");
      setDuplicateSuggestions("");
      // isError = true;
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (ev) => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  };

  return (
    <div className="work-sans min-h-screen bg-[#1f2124] flex p-4">
      <div className="w-64 bg-[#2a2b2e] rounded-3xl text-white p-6 shadow-2xl mr-4 flex-shrink-0">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-[#fa8029] rounded-xl flex items-center justify-center">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold">ProjectPort</h1>
        </div>

        <div className="space-y-1">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
            Menu
          </h3>
          <a
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#3a3b3e] text-gray-300 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="font-medium">Overview</span>
          </a>
          <a
            href="/register"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#3a3b3e] text-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="font-medium">Register</span>
          </a>
          <a
            href="/submit"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#3a3b3e] text-gray-300 hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span className="font-medium">Submit</span>
          </a>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-3xl shadow-2xl overflow-hidden flex items-center justify-center">
        <div className="w-full max-w-2xl px-8 py-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <h2 className="text-3xl font-bold text-[#1f2124] mb-6">
              Register Your Project
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[#1f2124] font-semibold mb-2 text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-[#1f2124] bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#fa8029] transition-colors"
                  required
                ></input>
              </div>
              <div>
                <label className="block text-[#1f2124] font-semibold mb-2 text-sm">
                  URN
                </label>
                <input
                  type="text"
                  placeholder="2024-A-xxxxxxx"
                  name="urn"
                  value={formData.urn}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-[#1f2124] bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#fa8029] transition-colors"
                  required
                ></input>
              </div>
              <div>
                <label className="block text-[#1f2124] font-semibold mb-2 text-sm">
                  College Email
                </label>
                <input
                  type="email"
                  placeholder="abc.xyz@adypu.edu.in"
                  name="collegeEmail"
                  value={formData.collegeEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-[#1f2124] bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#fa8029] transition-colors"
                  required
                ></input>
              </div>
              <div>
                <label className="block text-[#1f2124] font-semibold mb-2 text-sm">
                  Batch
                </label>
                <select
                  name="batch"
                  value={formData.batch}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-[#1f2124] bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#fa8029] transition-colors"
                  required
                >
                  <option value="A">Batch A</option>
                  <option value="B">Batch B</option>
                  <option value="C">Batch C</option>
                </select>
              </div>
              <div>
                <label className="block text-[#1f2124] font-semibold mb-2 text-sm">
                  Project Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your project name"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-[#1f2124] bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#fa8029] transition-colors"
                  required
                ></input>
              </div>
              <div>
                <label className="block text-[#1f2124] font-semibold mb-2 text-sm">
                  Project Description
                </label>
                <textarea
                  placeholder="Describe your project in detail (minimum 100 characters)"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-[#1f2124] bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#fa8029] transition-colors min-h-[120px] resize-y"
                  minLength={100}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className={`w-full bg-[#fa8029] hover:bg-[#ff9040] text-white rounded-xl py-3.5 font-semibold transition-all shadow-md hover:shadow-lg ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:transform hover:scale-[1.02]"
                }`}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Register Project"
                )}
              </button>
            </form>
            {fieldErrors && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm font-medium">
                  {fieldErrors}
                </p>
              </div>
            )}
            {successMessage && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-green-600 text-sm font-medium">
                  {successMessage}
                </p>
              </div>
            )}
            {duplicateSuggestions && (
              <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-xl">
                <p className="text-[#fa8029] text-sm font-medium">
                  {duplicateSuggestions}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
export default Registration;
