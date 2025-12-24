function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to Your Dashboard
        </h2>
        <p className="text-gray-600">
          Track your study progress and plan your learning journey effectively.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-600 mb-2">0</div>
            <div className="text-gray-600 text-sm uppercase tracking-wide">
              Total Tasks
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">0</div>
            <div className="text-gray-600 text-sm uppercase tracking-wide">
              Completed
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">0%</div>
            <div className="text-gray-600 text-sm uppercase tracking-wide">
              Progress
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Create New Task
          </button>
          <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
            View Statistics
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
