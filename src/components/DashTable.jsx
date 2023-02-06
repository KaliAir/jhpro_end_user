import React from 'react'

const DashTable = ({val})=>{
	return(
			<table id="datatable-buttons" className="table table-striped table-bordered" cellSpacing="0" width="100%">
	    
	            <thead>
	                <tr>
	                    <th>#</th>
	                    <th>Name</th>
	                    <th>Last Name</th>
	                    <th>Email</th>
	                    <th>Inquiry</th>
	                    <th>Phone Number</th>
	                    <th>Status</th>
	                </tr>
	            </thead>
	    
	    
	            <tbody>
	                
	                {val.map((pnd)=> (
		                <tr key={pnd.id}>

		                    <td>{pnd.id}</td>
		                    <td>{pnd.name}</td>
		                    <td>{pnd.last_name}</td>
		                    <td>{pnd.email}</td>
		                    <td>{pnd.inquiry}</td>
		                    <td>{pnd.phone_number}</td>
		             		<td>{pnd.pending === 0? 'Pending': pnd.pending === 1? 'Answered': 'Closed Client'}</td>

		                </tr>
	                	))}
	                    
	            </tbody>

	        </table>
		)
}

export default DashTable