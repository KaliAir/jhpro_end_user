import React from 'react'
import {Link} from 'react-router-dom'

const Sidebar = ()=>{
	return (
			<div className="left side-menu">
            <button type="button" className="button-menu-mobile button-menu-mobile-topbar open-left waves-effect">
                <i className="ion-close"></i>
            </button>

           
            <div className="topbar-left">
                <div className="text-center">
                
                    <Link  className="logo"><img src="assets/images/logoping.png" height="33" alt="logo"/></Link>
                </div>
            </div>
            <div className="sidebar-inner slimscrollleft">

                <div className="user-details">
                    <div className="text-center">
                        <img src="assets/images/users/my_pp.jpg" alt="" className="rounded-circle"/>
                    </div>
                    <div className="user-info">
                            <h4 className="font-16 text-white">jhon juben mallari</h4>
                            <span className="text-white"><i className="fa fa-dot-circle-o text-success"></i> Online</span>
                    </div>
                </div>
            <div id="sidebar-menu">
                <ul>
                       
                        <li className="menu-title text-white">General</li>

                        <li>
                            <Link to='/admin' className="waves-effect">
                                <i className="ti-home"></i>
                                <span> Dashboard <span className="badge badge-primary pull-right">3</span></span>
                            </Link>
                        </li>

                        <li className="has_sub">
                            <Link to='/admin/manage' className="waves-effect"><i className="ti-layout-tab"></i> <span>
                                    Manage Inquiries
                                </span> <span className="pull-right"><i className="mdi mdi-chevron-right"></i></span>
                            </Link>    
                        </li>

                        <li className="has_sub">
                            <Link to='/admin/forcedelete'  className="waves-effect"><i className="ti-trash"></i> <span>
                                    Deleted Inquiries
                                </span> <span className="pull-right"><i className="mdi mdi-chevron-right"></i></span>
                            </Link>    
                        </li>

            
                    </ul>    
            </div>
                <div className="clearfix"></div>
            </div>
        </div>
		)
}

export default Sidebar