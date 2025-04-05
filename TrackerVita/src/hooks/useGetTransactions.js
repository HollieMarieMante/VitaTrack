import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import { useGetUserInfo } from "./useGetUserInfo";


export const useGetTransactions=()=>{
    const [transactions , setTransactions] = useState([]);
    const [transactionTotal , setTransactionTotal] = useState({
        balance:0.0,
        income:0.0,
        expense:0.0,
    })
    const transactionCollectionRef = collection(db , "transactions");
    
    const {userID} = useGetUserInfo();
    const getTransactions = async()=>{
        
        let unsubscribe;
        try{

             const queryTransactions = 
             query(transactionCollectionRef ,
                 where("userID" ,"==" , userID),
               orderBy("createdAt")
            );
 unsubscribe =   onSnapshot(queryTransactions , (snapshot)=>{
              let docs = [];
              let totalIncome = 0;
              let totalExpense = 0;

            snapshot.forEach((doc)=>{
                const data = doc.data();
                const id = doc.id;

                 docs.push({...data , id});
         if( data.transactionType === "expense"){
            totalExpense += Number(data.transactionAmount);
         }
          else{
             totalIncome += Number(data.transactionAmount);
          }
            });
              setTransactionTotal({
                balance:totalIncome  - totalExpense ,
                expense:totalExpense,
                 income:totalIncome

              })
            setTransactions(docs);
          })
        } catch(err){
            console.log(err);
        }
         return ()=>unsubscribe(); 
      }
      useEffect(()=>{
         getTransactions();
      },[]);
    return {transactions , transactionTotal};
}