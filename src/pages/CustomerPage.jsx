import { useState, useEffect } from "react";
import { CustomerForm } from "../components/CustomerForm";
import AuthLayout from "../components/AuthLayout";
import { useCustomers } from "../contexts/CustomerContext";
import SearchBar from "../components/SearchBar";

function CustomerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    customers,
    fetchCustomers,
    searchCustomers,
    currentPage,
    changePage,
    totalPages,
  } = useCustomers();

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleSearch = (query) => {
    searchCustomers(query);
  };

  const handleSuccess = () => {
    fetchCustomers(); // Refresh the customer list
    setIsModalOpen(false); // Close the modal
  };

  return (
    <AuthLayout>
      <div className="min-h-screen py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Customers</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add Customer
            </button>
          </div>

          {/* Reusable Search Bar */}
          <SearchBar
            placeholder="Search customers by name..."
            onSearch={handleSearch}
          />

          {/* Table */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer.name}
                    </td>
                    <td className="px-6 py-4">{customer.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer.contact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <CustomerForm
            onClose={() => setIsModalOpen(false)}
            onSuccess={handleSuccess} // Pass the handleSuccess function
          />
        </div>
      )}
    </AuthLayout>
  );
}

export { CustomerPage };
