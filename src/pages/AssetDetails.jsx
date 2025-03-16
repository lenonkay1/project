import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { FiEdit, FiTrash2, FiArrowLeft, FiSave, FiX } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { format } from 'date-fns'

function AssetDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [asset, setAsset] = useState(null)
  const [categories, setCategories] = useState([])
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    asset_code: '',
    category_id: '',
    status: '',
    acquisition_date: '',
    acquisition_cost: '',
    location: '',
    department_id: '',
    notes: ''
  })
  
  useEffect(() => {
    fetchAsset()
    fetchCategories()
    fetchDepartments()
  }, [id])
  
  async function fetchAsset() {
    try {
      setLoading(true)
      
      const { data, error } = await supabase
        .from('assets')
        .select(`
          *,
          categories(id, name),
          departments(id, name)
        `)
        .eq('id', id)
        .single()
      
      if (error) throw error
      
      setAsset(data)
      setFormData({
        name: data.name || '',
        description: data.description || '',
        asset_code: data.asset_code || '',
        category_id: data.category_id || '',
        status: data.status || '',
        acquisition_date: data.acquisition_date || '',
        acquisition_cost: data.acquisition_cost || '',
        location: data.location || '',
        department_id: data.department_id || '',
        notes: data.notes || ''
      })
    } catch (error) {
      toast.error('Error loading asset: ' + error.message)
      navigate('/assets')
    } finally {
      setLoading(false)
    }
  }
  
  async function fetchCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .order('name')
      
      if (error) throw error
      
      setCategories(data || [])
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }
  
  async function fetchDepartments() {
    try {
      const { data, error } = await supabase
        .from('departments')
        .select('id, name')
        .order('name')
      
      if (error) throw error
      
      setDepartments(data || [])
    } catch (error) {
      console.error('Error loading departments:', error)
    }
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const { error } = await supabase
        .from('assets')
        .update(formData)
        .eq('id', id)
      
      if (error) throw error
      
      toast.success('Asset updated successfully')
      setEditing(false)
      fetchAsset() // Refresh asset data
    } catch (error) {
      toast.error('Error updating asset: ' + error.message)
    }
  }
  
  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('assets')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      toast.success('Asset deleted successfully')
      navigate('/assets')
    } catch (error) {
      toast.error('Error deleting asset: ' + error.message)
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
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/assets" className="mr-4 text-gray-500 hover:text-gray-700">
            <FiArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">
            {editing ? 'Edit Asset' : asset.name}
          </h1>
        </div>
        
        <div className="flex space-x-2">
          {editing ? (
            <>
              <button
                onClick={() => setEditing(false)}
                className="btn btn-outline flex items-center"
              >
                <FiX className="mr-2" />
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="btn btn-primary flex items-center"
              >
                <FiSave className="mr-2" />
                Save
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditing(true)}
                className="btn btn-outline flex items-center"
              >
                <FiEdit className="mr-2" />
                Edit
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="btn btn-danger flex items-center"
              >
                <FiTrash2 className="mr-2" />
                Delete
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {editing ? (
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Asset Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="input"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="asset_code" className="block text-sm font-medium text-gray-700 mb-1">
                  Asset Code *
                </label>
                <input
                  type="text"
                  id="asset_code"
                  name="asset_code"
                  required
                  className="input"
                  value={formData.asset_code}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  id="category_id"
                  name="category_id"
                  required
                  className="input"
                  value={formData.category_id}
                  onChange={handleInputChange}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <select
                  id="status"
                  name="status"
                  required
                  className="input"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="available">Available</option>
                  <option value="assigned">Assigned</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="retired">Retired</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="department_id" className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  id="department_id"
                  name="department_id"
                  className="input"
                  value={formData.department_id || ''}
                  onChange={handleInputChange}
                >
                  <option value="">Select a department</option>
                  {departments.map(department => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="acquisition_date" className="block text-sm font-medium text-gray-700 mb-1">
                  Acquisition Date
                </label>
                <input
                  type="date"
                  id="acquisition_date"
                  name="acquisition_date"
                  className="input"
                  value={formData.acquisition_date || ''}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="acquisition_cost" className="block text-sm font-medium text-gray-700 mb-1">
                  Acquisition Cost
                </label>
                <input
                  type="number"
                  id="acquisition_cost"
                  name="acquisition_cost"
                  step="0.01"
                  className="input"
                  value={formData.acquisition_cost || ''}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="input"
                  value={formData.location || ''}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  className="input"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows="3"
                  className="input"
                  value={formData.notes || ''}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
          </form>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailItem label="Asset Code" value={asset.asset_code} />
              <DetailItem label="Category" value={asset.categories?.name} />
              <DetailItem label="Status">
                <StatusBadge status={asset.status} />
              </DetailItem>
              <DetailItem label="Department" value={asset.departments?.name} />
              <DetailItem 
                label="Acquisition Date" 
                value={asset.acquisition_date ? format(new Date(asset.acquisition_date), 'MMMM d, yyyy') : 'N/A'} 
              />
              <DetailItem 
                label="Acquisition Cost" 
                value={asset.acquisition_cost ? `$${parseFloat(asset.acquisition_cost).toFixed(2)}` : 'N/A'} 
              />
              <DetailItem label="Location" value={asset.location} />
              <DetailItem 
                label="Created At" 
                value={asset.created_at ? format(new Date(asset.created_at), 'MMMM d, yyyy') : 'N/A'} 
              />
              
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-1 text-sm text-gray-900">{asset.description || 'No description provided'}</p>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                <p className="mt-1 text-sm text-gray-900">{asset.notes || 'No notes provided'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FiTrash2 className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Delete Asset
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this asset? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="btn btn-danger sm:ml-3"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-outline mt-3 sm:mt-0"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function DetailItem({ label, value, children }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500">{label}</h3>
      {children ? (
        <div className="mt-1">{children}</div>
      ) : (
        <p className="mt-1 text-sm text-gray-900">{value || 'N/A'}</p>
      )}
    </div>
  )
}

function StatusBadge({ status }) {
  let bgColor = 'bg-gray-100 text-gray-800'
  
  if (status === 'available') {
    bgColor = 'bg-green-100 text-green-800'
  } else if (status === 'assigned') {
    bgColor = 'bg-blue-100 text-blue-800'
  } else if (status === 'maintenance') {
    bgColor = 'bg-yellow-100 text-yellow-800'
  } else if (status === 'retired') {
    bgColor = 'bg-red-100 text-red-800'
  }
  
  return (
    <span className={`px-2 py-1 text-xs rounded-full ${bgColor}`}>
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  )
}

export default AssetDetails