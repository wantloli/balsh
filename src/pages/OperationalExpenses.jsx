import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import ExpenseForm from "../components/ExpenseForm";
import AuthLayout from "../components/AuthLayout";

const OperationalExpenses = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchExpenses = async () => {
    const querySnapshot = await getDocs(collection(db, "expenses"));
    const expensesData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setExpenses(expensesData);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSubmit = async () => {
    if (!description || !amount) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      if (editId) {
        const expenseDoc = doc(db, "expenses", editId);
        await updateDoc(expenseDoc, {
          description,
          amount: parseFloat(amount),
        });
        alert("Expense updated successfully!");
      } else {
        await addDoc(collection(db, "expenses"), {
          description,
          amount: parseFloat(amount),
          timestamp: serverTimestamp(),
        });
        alert("Expense added successfully!");
      }
      setDescription("");
      setAmount("");
      setEditId(null);
      setIsModalOpen(false);
      fetchExpenses();
    } catch (error) {
      console.error("Error saving expense: ", error);
      alert("Failed to save expense.");
    }
  };

  const handleEdit = (expense) => {
    setDescription(expense.description);
    setAmount(expense.amount);
    setEditId(expense.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "expenses", id));
      alert("Expense deleted successfully!");
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense: ", error);
      alert("Failed to delete expense.");
    }
  };

  return (
    <AuthLayout>
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Operational Expenses</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Expense
        </button>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {expense.description}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {expense.amount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEdit(expense)}
                    className="mr-2 bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(expense.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <ExpenseForm
              description={description}
              setDescription={setDescription}
              amount={amount}
              setAmount={setAmount}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsModalOpen(false);
                setDescription("");
                setAmount("");
                setEditId(null);
              }}
              isEditing={!!editId}
            />
          </div>
        )}
      </div>
    </AuthLayout>
  );
};

export default OperationalExpenses;
