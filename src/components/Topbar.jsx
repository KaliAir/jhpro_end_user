import React from 'react'
import {useAuth} from '../context/AuthContext'
import {Link} from 'react-router-dom'


const Topbar = ()=>{

    const {signOut, user, token,pending} = useAuth()

    const handleSignOut = ()=>{
       
        fetch(`${process.env.REACT_APP_API_URL}/logout/${user}`, {
            method: 'DELETE',
            headers: {
                 'Authorization': `Bearer ${token}`,
                 'Accept': 'application/json',
                 'X-Custom-Header': 'header value',
            }
        })
        .then((response)=>{
            
        }).catch((error)=>{
            console.log(error.message)
        })
        signOut()
        
    }

	return (
			<div className="topbar">

                    <nav className="navbar-custom">

                        <ul className="list-inline float-right mb-0">

                            <li className="list-inline-item dropdown notification-list">
                                <span className="nav-link dropdown-toggle arrow-none waves-effect" data-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false">
                                    <i className="mdi mdi-email-outline noti-icon"></i>
                                    <span className="badge badge-danger noti-icon-badge">{pending.length}</span>
                                </span>
                                <div className="dropdown-menu dropdown-menu-right dropdown-arrow dropdown-menu-lg">
                            
                                    <div className="dropdown-item noti-title">
                                        <h5><span className="badge badge-danger float-right">Please Update</span>Pending Inquiry</h5>
                                    </div>

                                    {pending.map((pnd)=> (
                                        <span  className="dropdown-item notify-item" key={pnd.id}>
                                            <p style={{borderBottom: '1px solid lightblue',cursor:'pointer'}} className="notify-details"><b>{pnd.name}</b><small className="text-muted">{`Inquiry: ${pnd.inquiry}`}</small></p>
                                        </span>

                                        ))}
                                    

                                  

                                    <span  className="dropdown-item notify-item">
                                            View All
                                        </span>

                                </div>
                            </li>
                
                            <li className="list-inline-item dropdown notification-list">
                                <span className="nav-link dropdown-toggle arrow-none waves-effect" data-toggle="dropdown"  role="button" aria-haspopup="false" aria-expanded="false">
                                    <i className="mdi mdi-bell-outline noti-icon"></i>
                                    <span className="badge badge-success noti-icon-badge">3</span>
                                </span>
                                <div className="dropdown-menu dropdown-menu-right dropdown-arrow dropdown-menu-lg">
                               
                                    <div className="dropdown-item noti-title">
                                        <h5><span className="badge badge-danger float-right">87</span>Notification</h5>
                                    </div>

                                  
                                    <span  className="dropdown-item notify-item">
                                        <div className="notify-icon bg-primary"><i className="mdi mdi-cart-outline"></i></div>
                                        <p className="notify-details"><b>Your order is placed</b><small className="text-muted">Dummy text of the printing and typesetting industry.</small></p>
                                    </span>

                                   
                                    <span  className="dropdown-item notify-item">
                                        <div className="notify-icon bg-success"><i className="mdi mdi-message"></i></div>
                                        <p className="notify-details"><b>New Message received</b><small className="text-muted">You have 87 unread messages</small></p>
                                    </span>

                              
                                    <span  className="dropdown-item notify-item">
                                        <div className="notify-icon bg-warning"><i className="mdi mdi-martini"></i></div>
                                        <p className="notify-details"><b>Your item is shipped</b><small className="text-muted">It is a long established fact that a reader will</small></p>
                                    </span>

                                    <span className="dropdown-item notify-item">
                                            View All
                                        </span>

                                </div>
                            </li>
                    

                            <li className="list-inline-item dropdown notification-list">
                                <span className="nav-link dropdown-toggle arrow-none waves-effect nav-user" data-toggle="dropdown"  role="button" aria-haspopup="false" aria-expanded="false">
                                    <img src="assets/images/users/my_pp.jpg" alt="user" className="rounded-circle"/>
                                </span>
                                <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                                    
                                    <Link to='/admin'  className="dropdown-item"  onClick={handleSignOut}><i className="mdi mdi-logout m-r-5 text-muted"></i> Logout</Link>
                                </div>
                            </li>

                        </ul>
     
                        <ul className="list-inline menu-left mb-0">
                 
                            <li className="list-inline-item">
                                <button type="button" className="button-menu-mobile open-left waves-effect">
                                    <i className="ion-navicon"></i>
                                </button>
                            </li>
                   
                            <li className="hide-phone list-inline-item app-search">
                                <h3 className="page-title">Dashboard</h3>
                            </li>
                        </ul>
        

                        <div className="clearfix"></div>

                    </nav>

                </div>
		)
}

export default Topbar