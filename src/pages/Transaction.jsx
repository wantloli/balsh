import React, { useState, useEffect } from "react";
import { useCustomers } from "../contexts/CustomerContext";
import { useTransactions } from "../contexts/TransactionContext";
import AuthLayout from "../components/AuthLayout";
import TransactionForm from "../components/TransactionForm";
import SearchBar from "../components/SearchBar";

const Transaction = () => {
  const { customers, fetchCustomers } = useCustomers();
  const { transactions, fetchTransactions, isLoading } = useTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  useEffect(() => {
    if (customers.length > 0) {
      fetchTransactions(customers);
    }
  }, [customers, fetchTransactions]);

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = transactions.filter((transaction) =>
      transaction.customerName.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredTransactions(filtered);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    if (timestamp instanceof Date) return timestamp.toLocaleDateString();
    if (timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleDateString();
    }
    return "Invalid Date";
  };

  return (
    <AuthLayout>
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Transactions</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            New Transaction
          </button>
        </div>

        {/* Reusable Search Bar */}
        <SearchBar
          placeholder="Search transactions by customer name..."
          onSearch={handleSearch}
        />

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-4">
            <p className="text-gray-600">Loading transactions...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Animals
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatDate(transaction.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {transaction.customerName}
                      </td>
                      <td className="px-6 py-4">
                        {transaction.animals.map((animal, index) => {
                          const details = [];
                          if (animal.heads)
                            details.push(`${animal.heads} heads`);
                          if (animal.kilos) details.push(`${animal.kilos}kg`);

                          return (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <span className="font-medium">{animal.name}</span>
                              {details.length > 0 && (
                                <span className="text-gray-500">
                                  ({details.join(", ")})
                                </span>
                              )}
                              <span>- ₱{animal.price}</span>
                            </div>
                          );
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ₱{transaction.totalAmount}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Transaction Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">New Transaction</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <TransactionForm onClose={() => setIsModalOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </AuthLayout>
  );
};

export default Transaction;
