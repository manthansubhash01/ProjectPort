import { useEffect,useState } from "react";

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
    
    try {
        const response = await fetch(
          "https://projectport-production.up.railway.app/api/projects/submit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
          }
        );

        if(!response.ok){
            throw new Error('Failed to Submit')
        }

        const data = await response.json()
        console.log("Submission Successful")
        console.log("API Response",data)
        setSuccessMessage("Submission Successful");
        setFormData({
          studentName: "",
          urn: "",
          collegeEmail: "",
          githubLink: "",
          hostingLink: "",
        });
    }catch (err){
        console.log("Error:", err)
        setFieldErrors(err);
    }

  }

  function handleChange(ev) {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  }

  return (
    <div className="playfair-display h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl text-center font-bold text-blue-600">Submit</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium">Name :</label>
            <input
              type="text"
              placeholder="Enter your name"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></input>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Urn :</label>
            <input
              type="text"
              placeholder="2024-A-xxxxxxx"
              name="urn"
              value={formData.urn}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></input>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              College Email :
            </label>
            <input
              type="email"
              placeholder="abc.xyz@adypu.edu.in"
              name="collegeEmail"
              value={formData.collegeEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></input>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Code Link :
            </label>
            <input
              type="url"
              placeholder="https://github.com/username/repository"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></input>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Hosting Link :
            </label>
            <input
              type="url"
              placeholder="https://your-hosting.com/project"
              name="hostingLink"
              value={formData.hostingLink}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></input>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-2.5 hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
        {fieldErrors && <p className="text-red-500">{fieldErrors}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
      </div>
    </div>
  );
}
export default Submission;
