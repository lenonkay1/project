import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiFilter, FiEdit2, FiX } from 'react-icons/fi'

function Assets() {
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [newAsset, setNewAsset] = useState({
    name: '',
    asset_code: '',
    status: 'available',
    acquisition_date: '',
    category: '',
    department: ''
  })
  const [editingAsset, setEditingAsset] = useState(null)
  
  // Demo data
  const [assets, setAssets] = useState([
    {
      id: 1,
      name: 'Dell Laptop XPS 15',
      asset_code: 'LAP-001',
      status: 'available',
      acquisition_date: '2024-01-15',
      categories: { name: 'Electronics' },
      departments: { name: 'IT Department' }
    },
    {
      id: 2,
      name: 'Office Desk',
      asset_code: 'FUR-001',
      status: 'assigned',
      acquisition_date: '2024-01-10',
      categories: { name: 'Furniture' },
      departments: { name: 'HR Department' }
    },
    {
      id: 3,
      name: 'HP Printer',
      asset_code: 'PRN-001',
      status: 'maintenance',
      acquisition_date: '2024-01-05',
      categories: { name: 'Electronics' },
      departments: { name: 'Operations' }
    },
    {
      id: 4,
      name: 'MacBook Pro',
      asset_code: 'LAP-002',
      status: 'available',
      acquisition_date: '2024-01-20',
      categories: { name: 'Electronics' },
      departments: { name: 'Marketing' }
    },
    {
      id: 5,
      name: 'Conference Table',
      asset_code: 'FUR-002',
      status: 'assigned',
      acquisition_date: '2024-01-12',
      categories: { name: 'Furniture' },
      departments: { name: 'Finance' }
    }
  ])

  const handleAddAsset = (e) => {
    e.preventDefault()
    const newId = assets.length + 1
    const formattedAsset = {
      id: newId,
      ...newAsset,
      categories: { name: newAsset.category },
      departments: { name: newAsset.department }
    }
    setAssets([...assets, formattedAsset])
    setNewAsset({
      name: '',
      asset_code: '',
      status: 'available',
      acquisition_date: '',
      category: '',
      department: ''
    })
    setShowAddModal(false)
  }

  const handleEditClick = (asset) => {
    const editAsset = {
      ...asset,
      category: asset.categories.name,
      department: asset.departments.name
    }
    setEditingAsset(editAsset)
    setShowEditModal(true)
  }

  const handleEditAsset = (e) => {
    e.preventDefault()
    const updatedAsset = {
      ...editingAsset,
      categories: { name: editingAsset.category },
      departments: { name: editingAsset.department }
    }
    const updatedAssets = assets.map(asset => 
      asset.id === editingAsset.id ? updatedAsset : asset
    )
    setAssets(updatedAssets)
    setShowEditModal(false)
    setEditingAsset(null)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800'
      case 'assigned':
        return 'bg-blue-100 text-blue-800'
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
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
        <h1 className="text-2xl font-semibold text-gray-900">Assets</h1>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="btn-outline"
          >
            <FiFilter className="h-5 w-5 mr-2" />
            Filters
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            <FiPlus className="h-5 w-5 mr-2" />
            Add Asset
          </button>
        </div>
      </div>

      {/* Add Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Add New Asset</h2>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowAddModal(false)}
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleAddAsset} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 input"
                  value={newAsset.name}
                  onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="asset_code" className="block text-sm font-medium text-gray-700">
                  Asset Code
                </label>
                <input
                  type="text"
                  id="asset_code"
                  className="mt-1 input"
                  value={newAsset.asset_code}
                  onChange={(e) => setNewAsset({ ...newAsset, asset_code: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  className="mt-1 input"
                  value={newAsset.status}
                  onChange={(e) => setNewAsset({ ...newAsset, status: e.target.value })}
                  required
                >
                  <option value="available">Available</option>
                  <option value="assigned">Assigned</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  className="mt-1 input"
                  value={newAsset.category}
                  onChange={(e) => setNewAsset({ ...newAsset, category: e.target.value })}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Software">Software</option>
                  <option value="Vehicles">Vehicles</option>
                  <option value="Office Supplies">Office Supplies</option>
                </select>
              </div>
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  id="department"
                  className="mt-1 input"
                  value={newAsset.department}
                  onChange={(e) => setNewAsset({ ...newAsset, department: e.target.value })}
                  required
                >
                  <option value="">Select a department</option>
                  <option value="IT Department">IT Department</option>
                  <option value="HR Department">HR Department</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>
              <div>
                <label htmlFor="acquisition_date" className="block text-sm font-medium text-gray-700">
                  Acquisition Date
                </label>
                <input
                  type="date"
                  id="acquisition_date"
                  className="mt-1 input"
                  value={newAsset.acquisition_date}
                  onChange={(e) => setNewAsset({ ...newAsset, acquisition_date: e.target.value })}
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
                  Add Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Asset Modal */}
      {showEditModal && editingAsset && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Edit Asset</h2>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={() => {
                  setShowEditModal(false)
                  setEditingAsset(null)
                }}
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleEditAsset} className="space-y-4">
              <div>
                <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="edit-name"
                  className="mt-1 input"
                  value={editingAsset.name}
                  onChange={(e) => setEditingAsset({ ...editingAsset, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="edit-asset-code" className="block text-sm font-medium text-gray-700">
                  Asset Code
                </label>
                <input
                  type="text"
                  id="edit-asset-code"
                  className="mt-1 input"
                  value={editingAsset.asset_code}
                  onChange={(e) => setEditingAsset({ ...editingAsset, asset_code: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="edit-status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="edit-status"
                  className="mt-1 input"
                  value={editingAsset.status}
                  onChange={(e) => setEditingAsset({ ...editingAsset, status: e.target.value })}
                  required
                >
                  <option value="available">Available</option>
                  <option value="assigned">Assigned</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              <div>
                <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="edit-category"
                  className="mt-1 input"
                  value={editingAsset.category}
                  onChange={(e) => setEditingAsset({ ...editingAsset, category: e.target.value })}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Software">Software</option>
                  <option value="Vehicles">Vehicles</option>
                  <option value="Office Supplies">Office Supplies</option>
                </select>
              </div>
              <div>
                <label htmlFor="edit-department" className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  id="edit-department"
                  className="mt-1 input"
                  value={editingAsset.department}
                  onChange={(e) => setEditingAsset({ ...editingAsset, department: e.target.value })}
                  required
                >
                  <option value="">Select a department</option>
                  <option value="IT Department">IT Department</option>
                  <option value="HR Department">HR Department</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>
              <div>
                <label htmlFor="edit-acquisition-date" className="block text-sm font-medium text-gray-700">
                  Acquisition Date
                </label>
                <input
                  type="date"
                  id="edit-acquisition-date"
                  className="mt-1 input"
                  value={editingAsset.acquisition_date}
                  onChange={(e) => setEditingAsset({ ...editingAsset, acquisition_date: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => {
                    setShowEditModal(false)
                    setEditingAsset(null)
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

      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select className="input">
                <option value="">All</option>
                <option value="available">Available</option>
                <option value="assigned">Assigned</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select className="input">
                <option value="">All</option>
                <option value="electronics">Electronics</option>
                <option value="furniture">Furniture</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select className="input">
                <option value="">All</option>
                <option value="it">IT Department</option>
                <option value="hr">HR Department</option>
                <option value="finance">Finance</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acquisition Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/assets/${asset.id}`}
                      className="text-sm font-medium text-primary-600 hover:text-primary-900"
                    >
                      {asset.name}
                    </Link>
                    <div className="text-sm text-gray-500">{asset.asset_code}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {asset.categories?.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {asset.departments?.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                      ${getStatusColor(asset.status)}`}
                    >
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(asset.acquisition_date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      type="button"
                      className="text-primary-600 hover:text-primary-900 mr-4"
                      onClick={() => handleEditClick(asset)}
                    >
                      <FiEdit2 className="h-5 w-5" />
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

export default Assets