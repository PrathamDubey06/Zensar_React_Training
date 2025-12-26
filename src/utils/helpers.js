// Color utilities for consistent subject-based color coding
const SUBJECT_COLORS = [
  { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-700', badge: 'bg-blue-500' },
  { bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-700', badge: 'bg-green-500' },
  { bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-purple-700', badge: 'bg-purple-500' },
  { bg: 'bg-orange-100', border: 'border-orange-300', text: 'text-orange-700', badge: 'bg-orange-500' },
  { bg: 'bg-pink-100', border: 'border-pink-300', text: 'text-pink-700', badge: 'bg-pink-500' },
  { bg: 'bg-indigo-100', border: 'border-indigo-300', text: 'text-indigo-700', badge: 'bg-indigo-500' },
  { bg: 'bg-teal-100', border: 'border-teal-300', text: 'text-teal-700', badge: 'bg-teal-500' },
]

const subjectColorMap = new Map()

export const getSubjectColor = (subject) => {
  if (!subjectColorMap.has(subject)) {
    const colorIndex = subjectColorMap.size % SUBJECT_COLORS.length
    subjectColorMap.set(subject, SUBJECT_COLORS[colorIndex])
  }
  return subjectColorMap.get(subject)
}

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export const formatHours = (hours) => {
  const h = parseFloat(hours)
  return `${h} ${h === 1 ? 'hour' : 'hours'}`
}
