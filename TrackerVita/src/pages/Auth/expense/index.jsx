import React, { useState, useTransition } from 'react'
import {  useAddTransaction } from '../../../hookd/useAddTransaction'
import { useGetTransactions } from '../../../hookd/useGetTransactions';
import { useGetUserInfo } from '../../../hookd/useGetUserInfo';
import { auth } from '../../../config/firebaseConfig';
import { Navigate, useNavigate } from 'react-router-dom';


export default function ExpenseTracker(){
    const navigate = useNavigate();
       const[descript , setDescript] = useState("")
       const [transAmount , setTransAmount] = useState(0);
       const [transType  , setTransType] = useState("expense");
       const {addTransaction} = useAddTransaction();
       const {transactions , transactionTotal} = useGetTransactions();
    const {name , profilePhoto} = useGetUserInfo();
    console.log(name)
     const onSubmit=(e)=>{
         e.preventDefault();
         addTransaction({
            description:descript , transactionAmount:transAmount,transactionType:transType});

            setDescript("");
            setTransAmount(0)
     }

      const signOut=async()=>{
         try{
             await signOut(auth)
             localStorage.clear();
             navigate("/");
         } catch(err){ 
            console.log(err)
         }
      }

    return(<>
    
         <div className="expense-tracker">
            <div className="container">
   {profilePhoto &&     <img src={profilePhoto}/>}
    <button onClick={signOut}> SignOut</button>
                <h2> {name}'s Expense Tracker </h2>
                <div className="balance">
                    <h3> Your balance </h3>
  {transactionTotal.balance >0?<h1>${transactionTotal.balance}</h1>:<h1> -$ {(transactionTotal.balance)* -1}</h1>}
                </div>
                  <div className="summary">
                    <div className="income">
                        <h4>Income</h4>
                         <p> $ {transactionTotal.income}</p>
                    </div>
                    <div className="expenses">
                    <h4>Expenses</h4>
                         <p>${transactionTotal.expense}</p>
                    </div>
                  </div>
              <form className='add-transaction' onSubmit={onSubmit}> 
      <input type="text" placeholder='Description' value={descript} required
       onChange={(e)=> setDescript(e.target.value)}
      />
      <input type="number" placeholder='Amount'
       value={transAmount}required 
       onChange={(e)=> setTransAmount(e.target.value)}
      />
      <input type="radio"
       id='expense' 
      value="expense" 
      checked = {transType === "expense"}
       onChange={(e)=> setTransType(e.target.value)}
         />
      <label htmlFor='expense'> Expense</label>
      <input
       type="radio" 
      id='income'
       value="income"
       checked = {transType === "income"}
       onChange={(e)=> setTransType(e.target.value)}
       />
      <label htmlFor='income'> Income</label>

                <button type='submit'> Add transaction</button>
              </form>
            </div>
         </div>
         <div className="transactions">
            <h3> Transaction</h3>
             <ul>
                {transactions.map((transaction)=>{
        //  const {descript ,transAmount,transType} = transaction;
                    return (<li> 
                        <h4> {transaction.description} </h4>
                        <p>${transaction.transactionAmount} .<label
        style={{color : transaction.transactionType==="expense"?"red":"green"}}                >{transaction.transactionType}</label></p>
                        </li>)
                })}
             </ul>
         </div>
    </>
    )
}