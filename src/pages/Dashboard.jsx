import React from 'react'
import {dummyCreationData} from '../assets/assets'

const Dashboard = () => {
const [creations, setCreations] = useState([])

const getDashboardData = async ()=> {
  setCreations(dummyCreationData)
}

useEffect(()=>{
  getDashboardData()
}, [])


  return (
    <div className='p-6 h-full overflow-y-scroll'>
      <div className='flex justify-start gap-4 flex-wrap'>
        {/*Total Creations cards */}
        <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'>

        </div>

      </div>
    </div>
  )
}

export default Dashboard
