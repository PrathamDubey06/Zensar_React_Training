import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStudy } from '../context/StudyContext'
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6']

function Dashboard() {
  const { sessions } = useStudy()
  const navigate = useNavigate()

  // Calculate summary statistics for overview cards
  const stats = useMemo(() => {
    const totalSessions = sessions.length
    const completedSessions = sessions.filter(s => s.completed).length
    const totalHours = sessions.reduce((sum, s) => sum + parseFloat(s.hours), 0)
    
    return { totalSessions, completedSessions, totalHours: totalHours.toFixed(1) }
  }, [sessions])

  // Aggregate hours by subject for pie chart
  const pieChartData = useMemo(() => {
    const subjectHours = {}
    sessions.forEach(session => {
      if (!subjectHours[session.subject]) {
        subjectHours[session.subject] = 0
      }
      subjectHours[session.subject] += parseFloat(session.hours)
    })
    
    return Object.entries(subjectHours).map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(1))
    }))
  }, [sessions])

  // Aggregate hours by date for line chart
  const lineChartData = useMemo(() => {
    const dateHours = {}
    sessions.forEach(session => {
      const date = session.date
      if (!dateHours[date]) {
        dateHours[date] = 0
      }
      dateHours[date] += parseFloat(session.hours)
    })
    
    return Object.entries(dateHours)
      .map(([date, hours]) => ({
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        hours: parseFloat(hours.toFixed(1))
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }, [sessions])

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{payload[0].name}</p>
          <p className="text-indigo-600">
            {payload[0].value} {payload[0].value === 1 ? 'hour' : 'hours'}
          </p>
        </div>
      )
    }
    return null
  }

  const LineTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{payload[0].payload.date}</p>
          <p className="text-indigo-600">
            {payload[0].value} {payload[0].value === 1 ? 'hour' : 'hours'}
          </p>
        </div>
      )
    }
    return null
  }

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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              {stats.completedSessions}
            </div>
            <div className="text-gray-600 text-sm uppercase tracking-wide">
              Completed
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">
              {stats.totalHours}h
            </div>
            <div className="text-gray-600 text-sm uppercase tracking-wide">
              Total Study Hours
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Hours by Subject
          </h3>
          {pieChartData.length === 0 ? (
            <div className="flex items-center justify-center h-80 text-gray-400">
              <p>No data available. Add study sessions to see the chart.</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Study Hours Over Time
          </h3>
          {lineChartData.length === 0 ? (
            <div className="flex items-center justify-center h-80 text-gray-400">
              <p>No data available. Add study sessions to see the chart.</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<LineTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={{ fill: '#6366f1', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate('/planner')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Create New Session
          </button>
          <button
            onClick={() => navigate('/progress')}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            View Progress
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
