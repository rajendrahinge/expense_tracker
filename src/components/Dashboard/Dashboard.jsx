import { useEffect, useRef, useState } from 'react'
import WalletExpenses from "../WalletExpenses/WalletExpenses";
import ExpenseTable from "../ExpenseTable/ExpenseTable";
import LinebarChart from "../LinebarChart/LinebarChart";
import "./Dashboard.css";
import { dummyData } from '../dummyTransations';

const Dashboard = () => {  
  
  // localStorage.clear();

  const [walletBalance, setWalletBalance] = useState(
    localStorage.getItem("walletBalance")?.length > 0 ? JSON.parse(localStorage.getItem("walletBalance")) : 5000
  );

  const [transactionData, setTransactionData] = useState(dummyData);
  const initialRender = useRef(true);

  // const checkExpenseData = () => {
  //   if(localStorage.getItem("expenses")?.length > 0) {
  //     let expenseArray = JSON.parse(localStorage.getItem("expenses"));
  //     if(expenseArray.length > 0) {
  //       JSON.parse(localStorage.getItem("expenses"));
  //     } else {
  //       transactionData
  //     }
  //   }
  // }

  

useEffect(()=>{
    if(initialRender.current)  onLoad();

    if (window.performance) {
      if (performance.navigation.type == 1) {
        localStorage.clear();
      }
    }

    return(() => {
      initialRender.current = false;
    })
  }, [])

  useEffect(()=> {
    //save data to local storage and if it is initial render skip saving
    if(!initialRender.current) localStorage.setItem("allData", JSON.stringify({walletBalance, transactionData}));
  }, [walletBalance, transactionData])

  

  const [expenses, setExpenses] = useState(
    (localStorage.getItem("expenses")?.length > 0 ? JSON.parse(localStorage.getItem("expenses")) : transactionData)
  );

  const handleExpensesListUpdate = (expenses) => {

    setExpenses(expenses);
    const totalBalance = localStorage.getItem("totalBalance") - getTotalExpenses();

    setWalletBalance(totalBalance);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  };

  const getTotalExpenses = () => {
    return expenses.reduce(
      (total, expense) => total + parseInt(expense.price, 10),
      0
    );
  };

  const categories = [
    "Food",
    "Entertainment",
    "Travel"
  ];

  const onLoad = () => {
    //load data from local storage if present
    const localData = localStorage.getItem("allData");
    // console.log(localData);
        
    if(localData){
      console.log(localStorage.getItem("expenses"))      
      const {walletBalance, transactionData} = JSON.parse(localData);
      setWalletBalance(walletBalance);
      setTransactionData(transactionData);
      setExpenses(transactionData);
    }
  }

  

  return (
    <div className="dashboard-container">
      <WalletExpenses
        handleExpenseListUpdate={handleExpensesListUpdate}
        categories={categories}
        expenses={expenses}
        setExpenses={setExpenses}
        getTotalExpenses={getTotalExpenses}
        walletBalance={walletBalance}
        setWalletBalance={setWalletBalance}
      />
      {expenses.length > 0 && (
        <div className="dashboard-info-container">
          <ExpenseTable
            expenseData={expenses}
            handleExpenseListUpdate={handleExpensesListUpdate}
            categories={categories}
          />
          <LinebarChart data={expenses} categories={categories} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
