
import Header from "./components/Header"
import MainBody from "./components/MainBody"

function App() {
 
  // Block A: The Variables (To read data onto the screen)


 

  // useEffect(() => {
  //   localStorage.setItem('expenses',JSON.stringify(expenses))
  // }, [expenses])

  // useEffect(() => {
  //   localStorage.setItem("budget", budget)
  // },[budget])

  return (
  <>
  <div className="min-h-svh bg-brand-bg  p-4 px-3">
    <div className="max-w-6xl mx-auto">
       <Header/>
       <MainBody/>
    </div>
  </div>
  
  </>
  )
}

export default App
