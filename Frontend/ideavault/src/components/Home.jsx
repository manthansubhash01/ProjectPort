import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Deadline from "./Deadline";

function Home() {
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBatch, setFilterBatch] = useState("all");

  useEffect(() => {
    async function getProjectData() {
      try {
        const response = await fetch(
          "https://projectport-llf4.onrender.com/api/projects/"
        );
        if (!response.ok) {
          throw new Error("Fail to get project data");
        }
        const data = await response.json();
        setProject(data.reverse());
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    getProjectData();
  }, []);

  const uniqueBatches = [
    ...new Set(project.map((p) => p.batch).filter(Boolean)),
  ].sort();

  const filterProjects = (projects) => {
    return projects.filter((p) => {
      const matchesSearch =
        p.projectName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.projectDescription
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        p.studentName?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesBatch = filterBatch === "all" || p.batch === filterBatch;

      return matchesSearch && matchesBatch;
    });
  };

  const registeredProjects = filterProjects(
    project.filter(
      (p) =>
        p.status === "Pending" ||
        p.status === "pending" ||
        p.status === "Registered" ||
        p.status === "registered" ||
        (!p.githubLink && !p.hostingLink)
    )
  );

  const submittedProjects = filterProjects(
    project.filter(
      (p) =>
        p.status === "Approved" ||
        p.status === "approved" ||
        p.status === "Submitted" ||
        p.status === "submitted" ||
        p.githubLink ||
        p.hostingLink
    )
  );

  const ProjectCard = ({ projectObj, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 mb-3"
    >
      <div className="flex gap-2 mb-3 flex-wrap">
        <span className="tag tag-orange">Project</span>
        {projectObj.batch && (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
            Batch {projectObj.batch}
          </span>
        )}
      </div>

      <h3 className="font-semibold text-[#1f2124] text-base mb-2 line-clamp-2">
        {projectObj.projectName}
      </h3>

      <p className="text-sm text-gray-600 line-clamp-3 mb-3 leading-relaxed">
        {projectObj.projectDescription || "No description provided"}
      </p>

      {projectObj.createdAt && (
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>
            {new Date(projectObj.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#fa8029] to-[#ff9040] flex items-center justify-center text-white text-xs font-semibold">
            {projectObj.studentName?.charAt(0).toUpperCase() || "S"}
          </div>
          <span className="text-xs font-medium text-gray-700 truncate max-w-[120px]">
            {projectObj.studentName}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {projectObj.githubLink && (
            <a
              href={projectObj.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
              title="View Code"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          )}
          {projectObj.hostingLink && (
            <a
              href={projectObj.hostingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
              title="View Live"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span>{Math.floor(Math.random() * 5)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="work-sans min-h-screen bg-white flex p-4">
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

        <div className="space-y-1 mb-8">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
            Menu
          </h3>
          <a
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#3a3b3e] text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="font-medium">Overview</span>
            <span className="ml-auto bg-[#fa8029] text-white text-xs px-2 py-0.5 rounded-full font-semibold">
              {project.length}
            </span>
          </a>
          <a
            href="/register"
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

        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
            Projects
          </h3>
          <div className="space-y-1">
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-300">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">Registered</span>
              <span className="ml-auto text-xs text-gray-400">
                {registeredProjects.length}
              </span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-300">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Submitted</span>
              <span className="ml-auto text-xs text-gray-400">
                {submittedProjects.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-3xl overflow-hidden">
        <div className="px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Deadline
              label="Submission Deadline"
              deadline={"2025-05-02T12:30:00.000Z"}
            />
            <div className="mt-6 bg-[#fff5f0] rounded-xl p-6">
              <h2 className="text-xl font-bold mb-3 text-[#1f2124]">
                Notice for Project Registration
              </h2>
              <p className="mb-3 text-gray-700 text-sm">Dear Students,</p>
              <p className="mb-3 text-gray-700 text-sm">
                Please ensure the following while{" "}
                <strong className="text-[#fa8029]">
                  submitting or registering
                </strong>{" "}
                your project:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong className="text-[#fa8029]">Fill All Fields:</strong>{" "}
                  Complete every required field in the registration form.
                </li>
                <li>
                  <strong className="text-[#fa8029]">
                    Enter Valid Information:
                  </strong>{" "}
                  Provide accurate project details.
                </li>
                <li>
                  <strong className="text-[#fa8029]">Be Descriptive:</strong>{" "}
                  Clearly explain your project idea and objectives.
                </li>
                <li>
                  <strong className="text-[#fa8029]">
                    Avoid Similar Ideas:
                  </strong>{" "}
                  Our system checks for duplicate projects.
                </li>
              </ul>
            </div>
          </motion.div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1f2124]">
                All Projects
              </h2>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fa8029] focus:border-transparent text-sm"
                  />
                  <svg
                    className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                <select
                  value={filterBatch}
                  onChange={(e) => setFilterBatch(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fa8029] focus:border-transparent text-sm bg-white"
                >
                  <option value="all">All Batches</option>
                  {uniqueBatches.map((batch) => (
                    <option key={batch} value={batch}>
                      Batch {batch}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#fa8029] border-solid"></div>
              </div>
            ) : project.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="text-gray-400 text-lg mb-2">
                  No projects yet
                </div>
                <p className="text-gray-500 text-sm">
                  Projects will appear here once submitted
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 text-base">
                      Registered ({registeredProjects.length})
                    </h3>
                  </div>
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {registeredProjects.map((proj, idx) => (
                      <ProjectCard key={idx} projectObj={proj} index={idx} />
                    ))}
                    {registeredProjects.length === 0 && (
                      <div className="text-center py-8 text-gray-400 text-sm">
                        No registered projects
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 text-base">
                      Submitted ({submittedProjects.length})
                    </h3>
                  </div>
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {submittedProjects.map((proj, idx) => (
                      <ProjectCard key={idx} projectObj={proj} index={idx} />
                    ))}
                    {submittedProjects.length === 0 && (
                      <div className="text-center py-8 text-gray-400 text-sm">
                        No submitted projects
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
