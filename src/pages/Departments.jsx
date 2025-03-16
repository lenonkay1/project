import { useState } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi'

function Departments() {
  const [loading, setLoading] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [newDepartment, setNewDepartment] = useState({ name: '', description: '' })
  const [editingDepartment, setEditingDepartment] = useState(null)
  
  // Demo data
  const [departments, setDepartments] = useState([
    { id: 1, name: 'IT Department', description: 'Information Technology team' },
    { id: 2, name: 'HR Department', description: 'Human Resources management' },
    { id: 3, name: 'Finance', description: 'Financial operations and accounting' },
    { id: 4, name: 'Marketing', description: 'Marketing and communications' },
    { id: 5, name: 'Operations', description: 'General operations and logistics' }
  ])

  const handleAddDepartment = (e) => {
    e.preventDefault()
    const newId = departments.length + 1
    setDepartments([...departments, { id: newId, ...newDepartment }])
    setNewDepartment({ name: '', description: '' })
    setShowAddModal(false)
  }

  const handleEditClick = (department) => {
    setEditingDepartment(department)
    setShowEditModal(true)
  }

  const handleEditDepartment = (e) => {
    e.preventDefault()
    const updatedDepartments = departments.map(dept => 
      dept.id === editingDepartment.id ? editingDepartment : dept
    )
    setDepartments(updatedDepartments)
    setShowEditModal(false)
    setEditingDepartment(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Departments</h1>
        <button
          type="button"
          className="btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          <FiPlus className="h-5 w-5 mr-2" />
          Add Department
        </button>
      </div>

      {/* Add Department Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Add New Department</h2>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowAddModal(false)}
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleAddDepartment} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 input"
                  value={newDepartment.name}
                  onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  className="mt-1 input"
                  value={newDepartment.description}
                  onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Add Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Department Modal */}
      {showEditModal && editingDepartment && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Edit Department</h2>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={() => {
                  setShowEditModal(false)
                  setEditingDepartment(null)
                }}
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleEditDepartment} className="space-y-4">
              <div>
                <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="edit-name"
                  className="mt-1 input"
                  value={editingDepartment.name}
                  onChange={(e) => setEditingDepartment({ ...editingDepartment, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="edit-description"
                  rows={3}
                  className="mt-1 input"
                  value={editingDepartment.description}
                  onChange={(e) => setEditingDepartment({ ...editingDepartment, description: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => {
                    setShowEditModal(false)
                    setEditingDepartment(null)
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {departments.map((department) => (
                <tr key={department.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {department.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {department.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      type="button"
                      className="text-primary-600 hover:text-primary-900 mr-4"
                      onClick={() => handleEditClick(department)}
                    >
                      <FiEdit2 className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-900"
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Departments