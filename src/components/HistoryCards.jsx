
import { LuCar, LuClock, LuHouse, LuTrash2, LuTv, LuUtensils } from 'react-icons/lu'
import { useBudgetStore } from '../useStore';

const HistoryCards = ({id}) => {


  const currentExpense = useBudgetStore((state) => 
    state.expenses.find((item) => item.id === id)
  );

   const handleDelete = useBudgetStore((state) => state.handleDelete)

  // 2. Safety Guard: If the item was just deleted, stop immediately so the app doesn't crash
  if (!currentExpense) return null;

  // 3. Unpack your clean string and number variables from that single object box!
  const { name, cost, category, dates } = currentExpense;

   

    const formattedName = name
  ? name
      .toLowerCase() // Optional: forces other letters lowercase so "sTaRBuCks" becomes clean
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  : "";

    


  


  return (
   
      <div 
        className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between transition-all hover:shadow-sm"
      >
        <div className="flex items-center gap-4">
          
          {/* Dynamic Icon Square Circle Box */}
          {/* We use conditions to swap background and icon colors matching the item's category */}
          <div className={`p-3 rounded-xl border shrink-0 ${
            category === 'Food' ? 'bg-food-bg text-food-text border-food-border' :
            category === 'Transport' ? 'bg-trans-bg text-trans-text border-trans-border' :
            category === 'Entertainment' ? 'bg-ent-bg text-ent-text border-ent-border' :
            'bg-bills-bg text-bills-text border-bills-border'
          }`}>
            {category === 'Food' && <LuUtensils className="w-5 h-5" />}
            {category === 'Transport' && <LuCar className="w-5 h-5" />}
            {category === 'Entertainment' && <LuTv className="w-5 h-5" />}
            {category === 'Bills' && <LuHouse className="w-5 h-5" />}
          </div>
          
          {/* Transaction Card Details */}
          <div className="flex flex-col">
            {/* Renders item name state string */}
            <h4 className="text-base font-bold text-brand-dark leading-tight">{formattedName}</h4>
            <div className="flex items-center gap-1 text-xs text-brand-muted mt-1">
              <LuClock className="w-3 h-3" />
              {/* Renders item creation date string */}
              <span>{dates}</span>
            </div>
          </div>
        </div>
        
        {/* Value and Actions */}
        <div className="flex items-center gap-4">
          {/* toFixed(2) forces number string to format with two trailing currency decimal slots (.00) */}
          <span className="text-lg font-black text-brand-dark">
            -${cost.toFixed(2)}
          </span>
          {/* Trash Can Button Trigger */}
          <button 
            type="button"
            className="text-brand-muted hover:text-danger p-2 rounded-xl hover:bg-red-50 transition-colors cursor-pointer shrink-0"
            onClick={ () => {handleDelete(id)}}
          >
            <LuTrash2 className="w-4 h-4" />
          </button>
        </div>
   </div>
  )
}
export default HistoryCards