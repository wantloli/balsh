import React, { createContext, useContext, useState, useCallback } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  getDoc,
} from "firebase/firestore";

const TransactionContext = createContext();

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [lastFetchTime, setLastFetchTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const CACHE_DURATION = 5 * 60 * 1000;

  const fetchTransactions = useCallback(
    async (customers, force = false) => {
      if (
        !force &&
        lastFetchTime &&
        Date.now() - lastFetchTime < CACHE_DURATION
      ) {
        return;
      }

      setIsLoading(true);
      try {
        const transactionsData = [];
        for (const customer of customers) {
          const q = query(
            collection(db, "customers", customer.id, "transactions"),
            orderBy("timestamp", "desc")
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            transactionsData.push({
              id: doc.id,
              customerName: customer.name,
              customerId: customer.id,
              ...doc.data(),
            });
          });
        }
        setTransactions(transactionsData);
        setLastFetchTime(Date.now());
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [lastFetchTime]
  );

  const addTransaction = async (customerId, animals) => {
    try {
      const timestamp = serverTimestamp();
      const totalAmount = animals.reduce(
        (sum, animal) => sum + (Number(animal.price) || 0),
        0
      );

      // Get customer name
      const customerRef = doc(db, "customers", customerId);
      const customerSnap = await getDoc(customerRef);
      const customerName = customerSnap.data()?.name;

      const transactionRef = collection(
        db,
        "customers",
        customerId,
        "transactions"
      );
      const newTransactionDoc = await addDoc(transactionRef, {
        animals,
        timestamp,
        totalAmount,
      });

      setTransactions((prev) => [
        {
          id: newTransactionDoc.id,
          customerId,
          customerName,
          animals,
          totalAmount,
          timestamp: {
            seconds: Math.floor(Date.now() / 1000),
            nanoseconds: 0,
          },
        },
        ...prev,
      ]);

      await updateDoc(customerRef, {
        lastTransactionDate: timestamp,
      });

      return true;
    } catch (error) {
      console.error("Error adding transaction:", error);
      return false;
    }
  };

  const value = {
    transactions,
    fetchTransactions,
    addTransaction,
    isLoading,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
