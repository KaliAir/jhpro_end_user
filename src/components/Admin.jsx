import React from 'react'
import Sidebar from './Sidebar'
import Footer from './Footer'
import Topbar from './Topbar'
import {Outlet} from 'react-router-dom'


const Admin = ()=>{
	return (
		<div className='wrapper'>
			<Sidebar/>
			<div className='content-page'>
				<div className="content">
				<Topbar/>
				 <Outlet/>
				</div>
				<Footer/>
			</div>
		</div>
		)
}

export default Admin