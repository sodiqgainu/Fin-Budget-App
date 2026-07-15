import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BudgetChart = ({data}) => {

    if (data.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '30px', color: '#888', fontStyle: 'italic' }}>
        No expenses tracked yet. Add an expense to see your spending breakdown!
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 300, marginTop: '20px', marginBottom: '20px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
           
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60} /* Makes it a beautiful donut shape */
            outerRadius={80}
            paddingAngle={4}
            dataKey="value"

              style={{ outline: 'none' }}
              tabIndex={-1} 
  activeShape={false} 
             >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value}`} />
          <Legend iconType="circle" layout="horizontal" verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BudgetChart