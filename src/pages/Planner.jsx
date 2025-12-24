function Planner() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Study Planner
        </h2>
        <p className="text-gray-600">
          Organize your study sessions and manage your learning tasks.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Your Study Plan
          </h3>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            + Add Task
          </button>
        </div>

        <div className="border-4 border-dashed border-gray-200 rounded-lg p-12 text-center">
          <div className="text-gray-400">
            <svg
              className="mx-auto h-12 w-12 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="text-lg font-medium text-gray-600">
              No tasks yet
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Get started by creating your first study task
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Planner
