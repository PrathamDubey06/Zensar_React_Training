import { useState } from 'react'
import { useStudy } from '../context/StudyContext'
import Modal from '../components/Modal'
import { getSubjectColor, formatDate, formatHours } from '../utils/helpers'

function Planner() {
  const { sessions, addSession, editSession, deleteSession, toggleComplete } = useStudy()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    subject: '',
    topic: '',
    date: '',
    hours: '',
  })
  const [errors, setErrors] = useState({})
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, sessionId: null, sessionName: '' })

  const validateForm = () => {
    const newErrors = {}
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.topic.trim()) newErrors.topic = 'Topic is required'
    if (!formData.date) newErrors.date = 'Date is required'
    if (!formData.hours || formData.hours <= 0) newErrors.hours = 'Valid hours required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    if (editingId) {
      editSession(editingId, formData)
      setEditingId(null)
    } else {
      addSession(formData)
    }

    setFormData({ subject: '', topic: '', date: '', hours: '' })
    setShowForm(false)
    setErrors({})
  }

  const handleEdit = (session) => {
    setFormData({
      subject: session.subject,
      topic: session.topic,
      date: session.date,
      hours: session.hours,
    })
    setEditingId(session.id)
    setShowForm(true)
  }

  const handleCancel = () => {
    setFormData({ subject: '', topic: '', date: '', hours: '' })
    setEditingId(null)
    setShowForm(false)
    setErrors({})
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleDeleteClick = (session) => {
    setDeleteModal({
      isOpen: true,
      sessionId: session.id,
      sessionName: `${session.subject} - ${session.topic}`
    })
  }

  const handleDeleteConfirm = () => {
    deleteSession(deleteModal.sessionId)
    setDeleteModal({ isOpen: false, sessionId: null, sessionName: '' })
  }

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, sessionId: null, sessionName: '' })
  }

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

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {editingId ? 'Edit Session' : 'Add New Session'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.subject ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Mathematics"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Topic
                </label>
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.topic ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Calculus - Derivatives"
                />
                {errors.topic && (
                  <p className="text-red-500 text-sm mt-1">{errors.topic}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hours
                </label>
                <input
                  type="number"
                  name="hours"
                  value={formData.hours}
                  onChange={handleChange}
                  step="0.5"
                  min="0"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.hours ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 2.5"
                />
                {errors.hours && (
                  <p className="text-red-500 text-sm mt-1">{errors.hours}</p>
                )}
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {editingId ? 'Update' : 'Add'} Session
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sessions List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Your Study Sessions ({sessions.length})
          </h3>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              + Add Session
            </button>
          )}
        </div>

        {sessions.length === 0 ? (
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
              <p className="text-lg font-medium text-gray-600">No sessions yet</p>
              <p className="text-sm text-gray-500 mt-1">
                Get started by creating your first study session
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {sessions.map((session) => {
              const colors = getSubjectColor(session.subject)
              return (
                <div
                  key={session.id}
                  className={`border-2 rounded-lg p-4 transition-all duration-200 ${
                    session.completed
                      ? 'bg-green-50 border-green-300 opacity-75'
                      : `${colors.bg} ${colors.border} hover:shadow-lg hover:scale-[1.01]`
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <input
                          type="checkbox"
                          checked={session.completed}
                          onChange={() => toggleComplete(session.id)}
                          className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer flex-shrink-0"
                        />
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4
                            className={`text-lg font-semibold ${
                              session.completed
                                ? 'text-gray-500 line-through'
                                : colors.text
                            }`}
                          >
                            {session.subject}
                          </h4>
                          <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${colors.badge}`}>
                            {formatHours(session.hours)}
                          </span>
                        </div>
                      </div>
                      <p className={`ml-8 mb-2 ${session.completed ? 'text-gray-500' : 'text-gray-700'} truncate`}>
                        {session.topic}
                      </p>
                      <div className="flex flex-wrap gap-3 ml-8 text-sm text-gray-600">
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
                      </div>
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(session)}
                        disabled={session.completed}
                        className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-110"
                        title="Edit"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(session)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200 hover:scale-110"
                        title="Delete"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Session"
        message={`Are you sure you want to delete "${deleteModal.sessionName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  )
}

export default Planner
