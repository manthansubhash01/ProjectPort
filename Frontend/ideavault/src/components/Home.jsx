import { useEffect,useState } from "react"

function Home(){
    const [project,setProject] = useState([])

    useEffect(() => {
        async function getProjectData() {
            try {
                const response = await fetch("https://projectport-production.up.railway.app/api/projects/");
                if (!response.ok) {
                throw new Error("Fail to get project data");
                }
                const data = await response.json()
                setProject(data)
            }catch(err){
                console.log(err)
            }
        } 
        getProjectData();
    }, [])

    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white flex-col justify-center p-25 rounded-xl shadow-lg w-300">
          <div className="bg-blue-500 flex-col justify-center p-25 rounded-xl shadow-lg w-half"></div>
          <h2 className="text-2xl text-center font-bold p-10  text-blue-600">
            projects
          </h2>
          <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border border-gray-300 px-4 py-2">Full Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">
                  Project Name
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Code Base Link
                </th>
                <th className="border border-gray-300 px-4 py-2">Website</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {project.map((projectObj) => {
                return (
                  <tr className="bg-gray-70">
                    <td className="border border-gray-300 px-4 py-2">
                      {projectObj.studentName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {projectObj.collegeEmail}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {projectObj.projectName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <a href={projectObj.githubLink}></a>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <a href={projectObj.hostingLink}></a>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {projectObj.status}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default Home