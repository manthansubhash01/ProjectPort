import { useEffect,useState } from "react"

function Home(){
    const [project,setProject] = useState([])
    const [loading, setLoading] = useState(true);

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
            }finally{
                setLoading(false);
            }
        } 
        getProjectData();
    }, [])

    return (
      <div className="playfair-display min-h-screen p-6 flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white flex-col justify-center p-20 py-7 rounded-xl shadow-lg w-300">
          <h1 className="text-5xl text-center font-bold p-10  text-blue-600">
            NST WAP Project Submission
          </h1>
          <div className="bg-blue-500 text-white text-xl flex-col justify-center p-20 rounded-xl shadow-lg w-half">
            <h2 className="text-xl font-bold mb-4">
              Notice for Project Registration
            </h2>
            <p className="mb-4">Dear Students,</p>
            <p className="mb-4">
              Please ensure the following while{" "}
              <strong>submitting or registering</strong> your project:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Fill All Fields:</strong> Complete every required field
                in the registration form. Incomplete submissions will not be
                accepted.
              </li>
              <li>
                <strong>Enter Valid Information:</strong> Provide accurate
                project details, including a proper title, description, and
                relevant links.
              </li>
              <li>
                <strong>Be Descriptive:</strong> Clearly explain your project
                idea, objectives, and functionality in detail. A vague or
                unclear description may lead to rejection.
              </li>
              <li>
                <strong>Avoid Similar Ideas:</strong> Our system checks for
                similar projects in the database. If your idea closely matches
                an existing one, registration will be denied. Please refine your
                concept before submitting.
              </li>
              <li>
                <strong>
                  Failure to meet these criteria may result in rejection of your
                  submission.
                </strong>
              </li>
            </ul>
          </div>
          <h2 className="text-3xl text-center font-bold p-10  text-blue-600">
            Projects
          </h2>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            </div>
          ) : project.length === 0 ? (
            <div className="flex justify-center">
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F7465%2F7465691.png&f=1&nofb=1&ipt=b079ccaf7c08b01b347ad461b1e4d04a6b603ec3dc5544b2344b11b7f9a41e24&ipo=images"
                className="h-75"
              ></img>
            </div>
          ) : (
            <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="border border-gray-300 px-4 py-2">
                    Full Name
                  </th>
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
                        {projectObj.githubLink ? (
                          <a
                            href={projectObj.githubLink}
                            className="flex justify-center"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flh3.googleusercontent.com%2Fproxy%2FRoPcmEVMBSgWrFW1o1e2zAMssiAvZHDxzHM_U2JaCEBn7r8nLUxiauFGk5Oy_Y8CJqOr0OZSJ9V3tJ_Mj4ITBJNOuwFT%3Ds0-d&f=1&nofb=1&ipt=b24beaac5e861e71f56c8cfe8a9999ba97ee5b2aa83a414970bfbee4024f3b4b&ipo=images"
                              className="h-8"
                            ></img>
                          </a>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {projectObj.hostingLink ? (
                          <a
                            href={projectObj.hostingLink}
                            className="flex justify-center"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F019%2F858%2F694%2Flarge_2x%2Fmaximize-flat-color-outline-icon-free-png.png&f=1&nofb=1&ipt=2aebe69c520d566e68785e07369e6a944b3f05bca1601beedb682b6f22963af4&ipo=images"
                              className="h-8"
                            ></img>
                          </a>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {projectObj.status}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
}

export default Home