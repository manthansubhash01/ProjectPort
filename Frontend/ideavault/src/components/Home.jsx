import { useEffect,useState } from "react"
import {motion} from "framer-motion"

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
    const heading = "NST WAP Project Submission";
    const letters = heading.split("");
    console.log(letters)

    return (
      <div className="work-sans min-h-screen p-25 flex flex-col items-center justify-center bg-black">
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-10xl"></div>
          <div className="bg-black flex-col justify-center p-20 rounded-xl shadow-lg w-300 relative leading-none">
            <div className="flex justify-center p-10">
              {letters.map((letter, index) => (
                <motion.h1
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 12 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="inline-block text-5xl text-center font-bold z-10  text-white"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.h1>
              ))}
            </div>
            <motion.div
              initial={{ y: 150, opacity: 0 }}
              animate={{ y: 10, opacity: 1 }}
              transition={{
                duration: 1,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              className="bg-[#111017] text-gray-400 text-xl flex-col justify-center p-20 rounded-xl shadow-lg w-half"
            >
              <div className="backdrop-blur px-15 py-7">
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
                    <strong>Fill All Fields:</strong> Complete every required
                    field in the registration form. Incomplete submissions will
                    not be accepted.
                  </li>
                  <li>
                    <strong>Enter Valid Information:</strong> Provide accurate
                    project details, including a proper title, description, and
                    relevant links.
                  </li>
                  <li>
                    <strong>Be Descriptive:</strong> Clearly explain your
                    project idea, objectives, and functionality in detail. A
                    vague or unclear description may lead to rejection.
                  </li>
                  <li>
                    <strong>Avoid Similar Ideas:</strong> Our system checks for
                    similar projects in the database. If your idea closely
                    matches an existing one, registration will be denied. Please
                    refine your concept before submitting.
                  </li>
                  <li>
                    <strong>
                      Failure to meet these criteria may result in rejection of
                      your submission.
                    </strong>
                  </li>
                </ul>
              </div>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: 1,
                scale: 1.1,
                transition: { duration: 1.5 },
              }}
              className="text-3xl text-center font-bold p-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg m-15"
            >
              Projects
            </motion.h2>
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
              </div>
            ) : project.length === 0 ? (
              <div className="flex justify-center">
                <img
                  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F5908%2F5908978.png&f=1&nofb=1&ipt=edb0505a0bce38d0d8abf6f09e1924ff40dce171de8585d14e94178963e557f8&ipo=images"
                  className="h-75"
                ></img>
              </div>
            ) : (
              <div className="rounded-lg overflow-hidden border border-white shadow-md">
                <table className="w-full border-collapse text-white ">
                  <thead>
                    <tr className="bg-[#0A0819] text-gray-200">
                      <th className="border border-gray-300 px-4 py-2">
                        Full Name
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Email
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Project Name
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Code Base Link
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Website
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.map((projectObj) => {
                      return (
                        <tr className="bg-black text-center">
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
                                  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fp.kindpng.com%2Fpicc%2Fs%2F128-1280233_free-files-github-github-white-logo-png-transparent.png&f=1&nofb=1&ipt=71d78d922be97002979408b0d748b9e7d928fa666c4a86ac26e484debd1c1aa9&ipo=images"
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
                                  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.vhv.rs%2Fdpng%2Fd%2F509-5096184_link-icon-white-link-icon-white-png-transparent.png&f=1&nofb=1&ipt=8a055da4c2ede001d396bb3500cb820d767cb1ea1fdb5163bb36869462311c08&ipo=images"
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
              </div>
            )}
          </div>
        </div>
      </div>
    );
}

export default Home