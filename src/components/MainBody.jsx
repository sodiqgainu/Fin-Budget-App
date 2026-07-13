import { LuCar, LuCheck, LuCirclePlus, LuHouse, LuPencilLine, LuScale, LuTrendingUp, LuTv, LuUtensils, LuWallet } from "react-icons/lu"
import HistoryCards from "./HistoryCards"

import { useBudgetStore } from "../useStore"
import { useState } from "react"
import ProgressBarAlert from "./ProgressBarAlert"




const MainBody = () => {


     
const budget = useBudgetStore((state) => state.budget)
const expenses = useBudgetStore((state) => state.expenses)
const addExpense = useBudgetStore((state) => state.addExpense)
const description = useBudgetStore((state) => state.description)
const setDescription = useBudgetStore((state) => state.setDescription)
const errors = useBudgetStore((state) => state.errors)
const amount = useBudgetStore((state) => state.amount);
const setAmount = useBudgetStore((state) => state.setAmount)
const category = useBudgetStore((state) => state.category)
const setCategory = useBudgetStore((state) => state.setCategory)
const changeBudget = useBudgetStore((state) => state.changeBudget)

const [isEditClick, setIsEditClick] = useState(false)
const [editBudget, setEditBudget] = useState(budget)


  const totalSpent = expenses.reduce((acc, curr) => {
    return acc + curr.cost
  }, 0)

  const remainingBalance = budget - totalSpent




  return (
    <main className='my-4 py-5  '>
        <div className='  grid md:grid-cols-[1fr_1fr_1fr] sm:grid-cols-2 grid-cols-1  gap-4'>
            {/* budget box card */}

            <div className='bg-white border-gray-200 flex justify-between p-4 border-[1px] rounded-2xl shadow-sm'>
                <div className='flex flex-col gap-2'>
                    <div className="flex items-center gap-1.5">
                        <h2 className='text-brand-muted text-lg '>Monthly Budget</h2>
                        {
                            !isEditClick && (
                            <button onClick={() => {setIsEditClick(true)}} className="text-budget bg-blue-50 hover:bg-blue-100 p-1.5 rounded-lg border border-blue-100 transition-colors"><LuPencilLine/></button> )
                        }
                        
                    </div>
                   
                    <h1 className='text-2xl text-budget font-bold'>{budget.toFixed(2)}$</h1>
                    {/* edit field */}
                    {
                        isEditClick ?
                         <div className="flex item-center gap-1.5">
                          <input onChange={(e) => {
                            setEditBudget(parseFloat(e.target.value) || 0)
                          
                          }} type="number" 
                          value={editBudget === 0 ? "" : editBudget}
                          onFocus={(e) => {
                         if (parseFloat(e.target.value) === 0) {
                             setEditBudget("");
                             }
                        }}
                          className="w-full bg-brand-bg border border-gray-200 rounded-xl px-3 py-2 text-sm font-medium text-brand-dark placeholder-gray-400 outline-none"/>
                          <button onClick={() => {
                            changeBudget(parseFloat(editBudget) || 0)
                            setIsEditClick(false)
                            }} className="bg-budget text-lg hover:bg-blue-700 font-bold text-white p-2 rounded-xl shrink-0"><LuCheck/></button> 
                    </div> : null

                  }
                   
                </div>
                
                {/* icon */}

       <span className="bg-blue-50 h-8 w-8 p-1 text-budget rounded-full">
                    <LuWallet className="w-full h-full" />
                </span>
            </div>

            {/* spent box card */}
             
             <div className='bg-white border-gray-200 flex justify-between p-4 border-[1px] rounded-2xl shadow-sm'>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-brand-muted text-lg '>Total Spent</h2>
                    <h1 className='text-2xl text-spent font-bold'>${totalSpent.toFixed(2)}</h1>
                </div>
                
                {/* icon */}
                <span className="bg-gray-50 text-spent h-8 w-8 p-1 rounded-full">
                    <LuTrendingUp className="w-full h-full" />
                </span>
            </div>

           {/* balance box  carde */}

           <div className='bg-white border-gray-200 flex justify-between p-4 border-[1px] rounded-2xl shadow-sm'>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-brand-muted text-lg '>Remaining Balance</h2>
                    <h1 className='text-2xl text-success font-bold'>${remainingBalance.toFixed(2)}</h1>
                </div>
                
                {/* icon */}
                <span className="bg-emerald-50 text-success h-8 w-8 p-1 rounded-full">
                    <LuScale className="w-full h-full" />
                </span>
            </div>

        </div>

        {/* progression Bar */}

    
         <ProgressBarAlert monthlyBudget={budget}  totalSpent={totalSpent} />


        {/* forms container */}

        <form onSubmit={(e) => {
              e.preventDefault()
            addExpense()
            }} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col mt-6">
          
          <h2 className="text-sm font-bold uppercase tracking-wider text-brand-muted">Log New Expense</h2>
            
               {/* form wrapper ROW 1 */}
            <div className="grid grid-cols-1 items-end md:grid-cols-3  gap-4 ">
               {/* field 1: Description */}
                
                <div className="flex flex-col md:col-span-2   mt-6 gap-1.5">
                    <label className="text-brand-dark text-xs font-bold">Expense Description</label>

                    <input 
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g., Grocery Shopping" 
                    className="w-full bg-brand-bg border border-gray-200 rounded-xl px-3 py-2 text-sm font-medium text-brand-dark placeholder-gray-400 outline-none"
                 
                     />
                    <span className="text-red-500 text-xs font-bold  h-5">{errors.description || ''}</span>
                </div>

                {/* field 2 : Amount */}
                 
                 <div className="flex flex-col gap-1.5 ">
                     <label className="text-brand-dark text-xs font-bold"> Amount  ($)</label>
                     <input 
                     type="number"
                     value={amount}
                     onChange={(e) => setAmount(e.target.value)}
                     placeholder="0.00"
                     className="w-full bg-brand-bg border border-gray-200 rounded-xl px-3 py-2 text-sm font-medium text-brand-dark placeholder-gray-400 outline-none"
                     
                     />

                     <span className="text-xs font-bold text-red-500  h-5">{errors.amount || ''}</span>
                 </div>
            </div>

            {/* row 2  category */}

            <div className="flex flex-col gap-1.5 mt-6">
                <label className="text-xs font-bold text-brand-dark">Select Category</label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
                    
                     {/* Tag 1: Food */}
                        <button type="button" onClick={() => setCategory("Food")} className={` ${category ==='Food' ? 'border-2 border-amber-400 bg-amber-50' : 'border-2 border-gray-200 bg-brand-bg'} flex items-center gap-2 justify-center  text-brand-muted hover:text-amber-700 p-3 rounded-xl hover:border-amber-300 font-bold text-xs cursor-pointer transition-all`}>
                            <LuUtensils className="w-4 h-4 shrink-0" />
                            <span className="truncate">Food</span>
                        </button>


                        {/* Tag 2: Transport */}
                        <button type="button" onClick={() => setCategory("Transport")} className={` ${category ==='Transport' ? 'border-2 border-sky-400 bg-sky-50' : 'border-2 border-gray-200 bg-brand-bg'} flex items-center gap-2 justify-center  text-brand-muted hover:text-sky-700 p-3 rounded-xl hover:border-sky-300 font-bold text-xs cursor-pointer transition-all`}>
                            <LuCar className="w-4 h-4 shrink-0" />
                            <span className="truncate">Transport</span>
                        </button>


                         {/* Tag 3: Entertainment */}
                        <button type="button" onClick={() => setCategory("Entertainment")} className={` ${category ==='Entertainment' ? 'border-2 border-pink-400 bg-amber-50' : 'border-2 border-gray-200 bg-brand-bg'} flex items-center gap-2 justify-center  text-brand-muted hover:text-pink-700 p-3 rounded-xl hover:border-pink-300 font-bold text-xs cursor-pointer transition-all`}>
                            <LuTv className="w-4 h-4 shrink-0" />
                            <span className="truncate">Entertainment</span>
                        </button>


                         {/* Tag 4: Bills */}
                        <button type="button" onClick={() => setCategory("Bills")} className={` ${category ==='Bills' ? 'border-2 border-purple-400 bg-purple-50' : 'border-2 border-gray-200 bg-brand-bg'} flex items-center gap-2 justify-center  text-brand-muted hover:text-purple-700 p-3 rounded-xl hover:border-purple-300 font-bold text-xs cursor-pointer transition-all`}>
                            <LuHouse className="w-4 h-4 shrink-0" />
                            <span className="truncate">Bills & Rent</span>
                        </button>
                       
                </div>

               <span className="text-red-500 text-xs font-bold mt-1 h-5 block">{errors.category || ""}</span>
            </div>

             {/* ROW 3: THE ACTION SUBMIT BUTTON */}
            <button 
                type="submit"
                className="bg-budget hover:bg-blue-700 text-white font-bold text-sm px-4 py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all w-full mt-2 shadow-sm shadow-blue-100"
            >
                <LuCirclePlus className="w-4 h-4" />
                <span>Add Expense</span>
            </button>
        </form>


        {/* THE TRANSACTION HISTORY SECTION */}
<div className="flex flex-col gap-3 mt-6">
  
  {/* Section Header */}
  <div className="flex items-center justify-between">
    <h2 className="text-sm font-bold uppercase tracking-wider text-brand-muted">Recent Transactions</h2>
    <span className="text-xs font-bold bg-gray-200 text-gray-700 px-2.5 py-0.5 rounded-full">{expenses.length} {expenses.length === 1 ? 'Items' : 'Items'}</span>
  </div>


     {expenses.length === 0 ? (
    <div className="text-center py-8 text-brand-muted text-sm border-2 border-dashed border-gray-200 rounded-2xl">
      No transactions logged yet. Add your first expense above!
    </div>
  ) : (
    expenses.map((item) => (
       <HistoryCards key={item.id} id={item.id} />
    ))
  )}

</div>

    </main>
  )
}

export default MainBody