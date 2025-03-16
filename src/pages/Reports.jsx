import { useState } from 'react';
import { FiDownload } from 'react-icons/fi';

function Reports() {
  const [loading, setLoading] = useState(false);
  
  // Demo data
  const reports = [
    {
      id: 1,
      name: 'Assets by Category',
      description: 'Distribution of assets across different categories',
      data: [
        { category: 'Electronics', count: 45 },
        { category: 'Furniture', count: 30 },
        { category: 'Software', count: 25 },
        { category: 'Vehicles', count: 10 },
        { category: 'Office Supplies', count: 40 }
      ]
    },
    {
      id: 2,
      name: 'Assets by Status',
      description: 'Current status of all assets',
      data: [
        { status: 'Available', count: 80 },
        { status: 'Assigned', count: 50 },
        { status: 'Maintenance', count: 20 }
      ]
    },
    {
      id: 3,
      name: 'Assets by Department',
      description: 'Asset distribution across departments',
      data: [
        { department: 'IT Department', count: 35 },
        { department: 'HR Department', count: 25 },
        { department: 'Finance', count: 30 },
        { department: 'Marketing', count: 20 },
        { department: 'Operations', count: 40 }
      ]
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{report.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{report.description}</p>
              
              <div className="space-y-3">
                {report.data.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {item.category || item.status || item.department}
                    </span>
                    <span className="text-sm font-medium text-gray-900">{item.count}</span>
                  </div>
                ))}
              </div>
              
              <button
                type="button"
                className="mt-4 w-full btn-outline flex items-center justify-center"
              >
                <FiDownload className="h-5 w-5 mr-2" />
                Export CSV
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reports;