import { useState, useMemo } from 'react'
import { useStudy } from '../context/StudyContext'
import { getSubjectColor, formatDate, formatHours } from '../utils/helpers'

function Progress() {
  const { sessions } = useStudy()
  const [selectedSubject, setSelectedSubject] = useState('All')

  // Calculate overview statistics from completed sessions
  const stats = useMemo(() => {
    const completedSessions = sessions.filter(s => s.completed)
    const totalSessions = sessions.length
    const completedCount = completedSessions.length
    const totalHours = completedSessions.reduce((sum, s) => sum + parseFloat(s.hours), 0)
    const completionRate = totalSessions > 0 ? (completedCount / totalSessions * 100).toFixed(1) : 0

    return { completedSessions, totalSessions, completedCount, totalHours, completionRate }
  }, [sessions])

  // Aggregate total and completed hours per subject
  const subjectStats = useMemo(() => {
    const stats = {}
    sessions.forEach(session => {
      if (!stats[session.subject]) {
        stats[session.subject] = { total: 0, completed: 0 }
      }
      stats[session.subject].total += parseFloat(session.hours)
      if (session.completed) {
        stats[session.subject].completed += parseFloat(session.hours)
      }
    })
    return Object.entries(stats).map(([subject, data]) => ({
      subject,
      totalHours: data.total.toFixed(1),
      completedHours: data.completed.toFixed(1),
      percentage: data.total > 0 ? ((data.completed / data.total) * 100).toFixed(0) : 0
    }))
  }, [sessions])

  // Extract unique subjects for filter dropdown
  const subjects = useMemo(() => {
    const uniqueSubjects = [...new Set(sessions.map(s => s.subject))]
    return ['All', ...uniqueSubjects]
  }, [sessions])

  // Filter completed sessions by selected subject
  const filteredSessions = useMemo(() => {
    if (selectedSubject === 'All') {
      return stats.completedSessions
    }
    return stats.completedSessions.filter(s => s.subject === selectedSubject)
  }, [stats.completedSessions, selectedSubject])

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

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-600 mb-2">
              {stats.totalSessions}
            </div>
            <div className="text-gray-600 text-sm uppercase tracking-wide">
              Total Sessions
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {stats.completedCount}
            </div>
            <div className="text-gray-600 text-sm uppercase tracking-wide">
              Completed
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">
              {stats.totalHours.toFixed(1)}
            </div>
            <div className="text-gray-600 text-sm uppercase tracking-wide">
              Hours Studied
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {stats.completionRate}%
            </div>
            <div className="text-gray-600 text-sm uppercase tracking-wide">
              Completion Rate
            </div>
          </div>
        </div>
      </div>

      {/* Hours by Subject */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Study Hours by Subject
        </h3>
        {subjectStats.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No study data available yet</p>
        ) : (
          <div className="space-y-4">
            {subjectStats.map(({ subject, totalHours, completedHours, percentage }) => {
              const colors = getSubjectColor(subject)
              return (
                <div key={subject} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${colors.badge}`}></span>
                      <span className={`font-medium ${colors.text}`}>{subject}</span>
                    </div>
                    <span className="text-sm text-gray-600 font-medium">
                      {completedHours} / {totalHours} hours ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`${colors.badge} h-3 rounded-full transition-all duration-500 ease-out`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Completed Sessions List with Filter */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Completed Sessions ({filteredSessions.length})
          </h3>
          
          {/* Subject Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Filter:</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>

        {filteredSessions.length === 0 ? (
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-lg font-medium text-gray-600">
                No completed sessions yet
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Complete some study sessions to track your progress
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSessions.map((session) => {
              const colors = getSubjectColor(session.subject)
              return (
                <div
                  key={session.id}
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 ${colors.bg} border-2 ${colors.border} rounded-lg transition-all duration-200 hover:shadow-md hover:scale-[1.01]`}
                >
                  <div className="flex items-center gap-4 mb-3 sm:mb-0">
                    <div className={`flex-shrink-0 w-10 h-10 ${colors.badge} rounded-full flex items-center justify-center`}>
                      <svg
                        className="w-6 h-6 text-white"
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
                    <div>
                      <h4 className={`font-semibold ${colors.text}`}>{session.subject}</h4>
                      <p className="text-sm text-gray-600">{session.topic}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6 text-sm text-gray-600 ml-14 sm:ml-0">
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {formatDate(session.date)}
                    </span>
                    <span className={`flex items-center gap-1 font-medium ${colors.text}`}>
                      <svg
                        className="w-4 h-4 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {formatHours(session.hours)}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Progress
