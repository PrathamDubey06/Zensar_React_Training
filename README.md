# Study Planner & Progress Tracker

A modern, full-featured study planner application built with React, featuring real-time progress tracking, data visualization, and persistent storage.

## 🚀 Features

- **Dashboard**: Visual analytics with interactive charts (Pie & Line charts)
- **Study Planner**: Add, edit, delete, and manage study sessions
- **Progress Tracking**: Monitor completion rates and study hours by subject
- **Data Persistence**: Automatic localStorage synchronization
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Subject Color Coding**: Consistent visual identity across the app
- **Confirmation Modals**: Safe deletion with user confirmation

## 🛠️ Tech Stack

- **React 19** - Modern React with functional components and hooks
- **React Router v6** - Client-side routing
- **Recharts** - Data visualization library
- **Tailwind CSS v4** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Context API** - State management

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.jsx      # Main layout with navigation
│   └── Modal.jsx       # Confirmation modal component
├── pages/              # Page components
│   ├── Dashboard.jsx   # Overview with charts
│   ├── Planner.jsx     # Session management
│   └── Progress.jsx    # Progress tracking
├── context/            # React Context for state
│   └── StudyContext.jsx
├── utils/              # Helper functions
│   └── helpers.js      # Color coding and formatting
├── App.jsx             # Root component with routes
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## 🎯 Core Functionality

### State Management
- Centralized state using React Context API
- CRUD operations: Add, Edit, Delete, Toggle Complete
- Automatic localStorage persistence
- Initial seed data for demonstration

### Data Visualization
- **Pie Chart**: Hours distribution by subject
- **Line Chart**: Study hours timeline
- Real-time updates on data changes
- Interactive tooltips and legends

### User Experience
- Form validation with error messages
- Delete confirmation modal
- Subject-based color coding
- Smooth transitions and hover effects
- Empty state placeholders
- Mobile-responsive navigation

## 🚦 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 💾 Data Persistence

The application uses localStorage to persist data:
- Key: `study-planner-sessions`
- Automatic save on every change
- Fallback to seed data if localStorage is empty

## 🎨 Design Patterns

- **Component Composition**: Reusable components with props
- **Custom Hooks**: `useStudy()` for context access
- **Memoization**: `useMemo` for performance optimization
- **Derived State**: Calculate stats from source data
- **Controlled Components**: Forms with validation

## 📱 Responsive Features

- Mobile hamburger menu
- Flexible grid layouts
- Touch-friendly buttons
- Adaptive text sizing
- Collapsible form sections

## 🔑 Key Components

### StudyContext
Provides global state management with actions:
- `addSession(data)`
- `editSession(id, updates)`
- `deleteSession(id)`
- `toggleComplete(id)`

### Modal Component
Reusable confirmation dialog with:
- Customizable title and message
- Danger/info variants
- Keyboard support (ESC to close)
- Backdrop click handling

### Helper Utilities
- `getSubjectColor(subject)` - Consistent color mapping
- `formatDate(dateString)` - Date formatting
- `formatHours(hours)` - Hour display formatting

## 📊 Demo Data

The app includes 5 sample study sessions covering:
- Mathematics
- Physics
- Computer Science
- Chemistry

## 🎓 Interview Highlights

- **Clean Architecture**: Separation of concerns with clear folder structure
- **Performance**: Optimized with React.memo and useMemo
- **Accessibility**: Semantic HTML and ARIA labels
- **Modern React**: Hooks, Context API, functional components
- **Code Quality**: Consistent naming, minimal comments, DRY principles
- **User Experience**: Intuitive UI with visual feedback

## 📝 License

MIT

---

**Built with ❤️ using React + Vite + Tailwind CSS**
