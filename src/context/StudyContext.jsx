import { createContext, useContext, useState, useEffect } from 'react'

const StudyContext = createContext()

// Seed data
const seedData = [
  {
    id: '1',
    subject: 'Mathematics',
    topic: 'Calculus - Derivatives',
    date: '2025-12-20',
    hours: 2,
    completed: true,
  },
  {
    id: '2',
    subject: 'Physics',
    topic: 'Quantum Mechanics',
    date: '2025-12-21',
    hours: 1.5,
    completed: true,
  },
  {
    id: '3',
    subject: 'Computer Science',
    topic: 'Data Structures - Trees',
    date: '2025-12-22',
    hours: 3,
    completed: false,
  },
  {
    id: '4',
    subject: 'Chemistry',
    topic: 'Organic Chemistry - Reactions',
    date: '2025-12-23',
    hours: 2.5,
    completed: false,
  },
  {
    id: '5',
    subject: 'Mathematics',
    topic: 'Linear Algebra',
    date: '2025-12-24',
    hours: 2,
    completed: false,
  },
]

const STORAGE_KEY = 'study-planner-sessions'

export function StudyProvider({ children }) {
  const [sessions, setSessions] = useState(() => {
    // Load from localStorage on initial mount
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (error) {
        console.error('Failed to parse stored sessions:', error)
        return seedData
      }
    }
    return seedData
  })

  // Persist to localStorage whenever sessions change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
  }, [sessions])

  const addSession = (sessionData) => {
    const newSession = {
      id: Date.now().toString(),
      ...sessionData,
      completed: false,
    }
    setSessions((prev) => [...prev, newSession])
  }

  const editSession = (id, updates) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === id ? { ...session, ...updates } : session
      )
    )
  }

  const deleteSession = (id) => {
    setSessions((prev) => prev.filter((session) => session.id !== id))
  }

  const toggleComplete = (id) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === id
          ? { ...session, completed: !session.completed }
          : session
      )
    )
  }

  const value = {
    sessions,
    addSession,
    editSession,
    deleteSession,
    toggleComplete,
  }

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>
}

export function useStudy() {
  const context = useContext(StudyContext)
  if (!context) {
    throw new Error('useStudy must be used within a StudyProvider')
  }
  return context
}

export default StudyContext
