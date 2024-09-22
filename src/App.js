import { useEffect, useRef, useState } from 'react'
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';


function App() {

  // const [transactionData, setTransactionData] = useState(dummyData);
  // const initialRender = useRef(true);

  // useEffect(()=>{
  //   if(initialRender.current)  onLoad();

  //   return(() => {
  //     initialRender.current = false;
  //   })
  // }, [])

  // useEffect(()=> {
  //   //save data to local storage and if it is initial render skip saving
  //   if(!initialRender.current) localStorage.setItem("allData", JSON.stringify({money, transactionData}));
  // }, [money, transactionData])

  // const onLoad = () => {
  //   //load data from local storage if present
  //   const localData = localStorage.getItem("allData");
  //   if(localData){
  //     const {money, transactionData} = JSON.parse(localData);
  //     setMoney(money);
  //     setTransactionData(transactionData);
  //   }
  // }

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <Dashboard />
    </div>
  );
}

export default App;
