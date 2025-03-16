import { NavLink } from 'react-router-dom'
import { 
  FiX, 
  FiHome, 
  FiBox, 
  FiTag, 
  FiUsers, 
  FiBriefcase,
  FiPieChart
} from 'react-icons/fi'

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
      >
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        ></div>
        
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 flex flex-col w-64 max-w-xs bg-primary-800 text-white">
          <div className="flex items-center justify-between h-16 px-4 border-b border-primary-700">
            <span className="text-xl font-semibold">JSC Assets</span>
            <button
              className="rounded-md p-1 hover:bg-primary-700"
              onClick={() => setSidebarOpen(false)}
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {renderNavLinks()}
          </nav>
        </div>
      </div>
      
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-primary-800 text-white">
            <div className="flex items-center h-16 px-4 border-b border-primary-700">
              <span className="text-xl font-semibold">JSC Assets</span>
            </div>
            
            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
              {renderNavLinks()}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

function renderNavLinks() {
  const links = [
    { to: '/', icon: <FiHome />, text: 'Dashboard' },
    { to: '/assets', icon: <FiBox />, text: 'Assets' },
    { to: '/categories', icon: <FiTag />, text: 'Categories' },
    { to: '/departments', icon: <FiBriefcase />, text: 'Departments' },
    { to: '/users', icon: <FiUsers />, text: 'Users' },
    { to: '/reports', icon: <FiPieChart />, text: 'Reports' },
  ]
  
  return links.map((link) => (
    <NavLink
      key={link.to}
      to={link.to}
      className={({ isActive }) =>
        `flex items-center px-2 py-2 text-sm font-medium rounded-md ${
          isActive
            ? 'bg-primary-700 text-white'
            : 'text-primary-100 hover:bg-primary-700'
        }`
      }
    >
      <span className="mr-3 h-5 w-5">{link.icon}</span>
      {link.text}
    </NavLink>
  ))
}

export default Sidebar