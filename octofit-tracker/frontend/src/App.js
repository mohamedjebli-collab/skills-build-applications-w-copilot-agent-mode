import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const navItems = [
    { to: '/activities', label: 'Activities' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/teams', label: 'Teams' },
    { to: '/users', label: 'Users' },
    { to: '/workouts', label: 'Workouts' },
  ];

  return (
    <div className="app-shell min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark app-nav shadow-sm">
        <div className="container">
          <NavLink to="/" className="navbar-brand fw-bold d-flex align-items-center gap-2">
            <img
              src={`${process.env.PUBLIC_URL}/octofitapp-small.png`}
              alt="OctoFit logo"
              className="app-logo"
            />
            <span>OctoFit Tracker</span>
          </NavLink>

          <div className="navbar-nav ms-auto gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-link px-3 rounded-pill ${
                    isActive ? 'active bg-light text-dark fw-semibold' : 'text-white-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <main className="py-4">
        <div className="container mb-3">
          <div className="card border-0 shadow-sm app-intro-card">
            <div className="card-body py-3">
              <h1 className="h3 mb-1">Fitness Dashboard</h1>
              <p className="mb-0 text-secondary">
                Browse activities, leaderboard positions, teams, users, and workouts from the API.
              </p>
            </div>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
