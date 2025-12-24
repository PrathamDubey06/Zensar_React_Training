function Progress() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Progress Tracking
        </h2>
        <p className="text-gray-600">
          Visualize your learning progress and achievements over time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Weekly Progress
          </h3>
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-400">Chart will be displayed here</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Monthly Overview
          </h3>
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-400">Chart will be displayed here</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="ml-4 flex-1">
              <p className="text-gray-600 text-sm">
                No activities recorded yet. Start planning to see your progress here!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Progress
