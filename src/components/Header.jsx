import { FaDollarSign } from "react-icons/fa"
import { FaMoon } from "react-icons/fa6"



const Header = () => {
  return (
    <header className=" py-4 shadow-b-xl text-lg flex justify-between items-center font-bold border-b  border-gray-200">
        <div className="flex gap-1 items-center">
            <h2 className="text-brand-dark">FIN-<span className="italic">BUDGET</span></h2>
            <FaDollarSign/>
        </div>

  
    </header>
  )
}

export default Header