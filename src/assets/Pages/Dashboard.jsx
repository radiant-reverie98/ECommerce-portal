import React from 'react'

import NavbarDashboard from '../Components/NavbarDashboard'
import SidebarDashboard from '../Components/SidebarDashboard'
import Dropdown from '../Components/Dropdown'
import Table from '../Components/Table'

function Dashboard() {
  return (
    <div>
      <NavbarDashboard/>
      <div className="flex">
        <SidebarDashboard/>
      
      <div className="flex justify-center items-center w-full h-screen mt-15 ">
        <Table/>
      </div>
  
      </div>
    </div>
  )
}

export default Dashboard
