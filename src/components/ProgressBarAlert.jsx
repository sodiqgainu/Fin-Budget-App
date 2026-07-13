

const ProgressBarAlert = ({monthlyBudget, totalSpent}) => {
      const rawPercentage = monthlyBudget > 0 ? (totalSpent / monthlyBudget) * 100 : 0

    const percentage = Math.min(Math.max(rawPercentage, 0), 100);

    const barColor = percentage >= 85 ? "#e74c3c" : ( percentage >= 50 ?  "#ff9f43" : "#2ecc71")
 
  return (
    <div className='my-3 h-3 w-full border border-gray-300 bg-gray-100 rounded-full'>
        <div style={{
            width: `${percentage}%`,
            backgroundColor: barColor,
            transition: 'width 0.4s ease, background-color 0.4s ease' 
        }} className='bg-emerald-600 rounded-full  w-full h-full'/>
    </div>
  )
}

export default ProgressBarAlert




