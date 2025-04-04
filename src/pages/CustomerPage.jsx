import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { CustomerForm } from "../components/CustomerForm";
import AuthLayout from "../components/AuthLayout";

function CustomerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const STORAGE_KEY = "cached_customers";

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      // Check local storage first
      const cachedData = localStorage.getItem(STORAGE_KEY);
      if (cachedData) {
        setCustomers(JSON.parse(cachedData));
      }

      // Fetch fresh data from Firestore
      const querySnapshot = await getDocs(collection(db, "customers"));
      const customersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Update state and cache
      setCustomers(customersList);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customersList));
    } catch (error) {
      console.error("Error fetching customers:", error);
      // If error occurs and we have cached data, use that
      const cachedData = localStorage.getItem(STORAGE_KEY);
      if (cachedData) {
        setCustomers(JSON.parse(cachedData));
      }
    }
  };

  const handleSuccess = async () => {
    await fetchCustomers();
    setIsModalOpen(false);
  };

  return (
    <AuthLayout>
      <div className="min-h-screen bg-gray-100 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Customers</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add Customer
            </button>
          </div>

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
        </div>
      </div>
      
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <CustomerForm
            onClose={() => setIsModalOpen(false)}
            onSuccess={handleSuccess}
          />
        </div>
      )}
    </AuthLayout>
  );
}

export { CustomerPage };
