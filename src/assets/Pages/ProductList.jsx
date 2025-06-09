import React from 'react'
import NavbarDashboard from '../Components/NavbarDashboard'
import SidebarDashboard from '../Components/SidebarDashboard'

function ProductList() {
  return (
    <div>
      <NavbarDashboard/>
      <div className="flex">
        <SidebarDashboard/>
        <div>
            <form>
                
            </form>
        </div>
      </div>

    </div>
  )
}

export default ProductList
