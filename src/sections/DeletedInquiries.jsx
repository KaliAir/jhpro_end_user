import React from 'react'
import Button from 'react-bootstrap/Button';
import {useAuth} from '../context/AuthContext'
import {useState,useEffect} from 'react'
import ReactPaginate from 'react-paginate';



const DeletedInquiries = ()=>{

//================================STATES AND CONTEXT=========================	
	const {trash, forceDelete, setSearch, restore} = useAuth()


  
//==============================PAGINATION===========================
	  const [currentItems, setCurrentItems] = useState([])
	  const [pageCount, setPageCount]= useState(0)
	  const [itemOffset, setItemOffset] = useState(0);
	  const itemsPerPage = 10;

	  useEffect(()=>{
	  const endOffset = itemOffset + itemsPerPage;
	  setCurrentItems (trash.slice(itemOffset, endOffset));
	  setPageCount (Math.ceil(trash.length / itemsPerPage));
	},[trash, itemOffset, itemsPerPage])
	

	  const handlePageClick = (event) => {
	  const newOffset = (event.selected * itemsPerPage) %  trash.length;
	  setItemOffset(newOffset);
  };
//=============================END of PAGINATION====================== 

    

	return(
	<>
		<div className="inquiry-container">
          <h4 className="mt-0 header-title">DELETED INQUIRIES</h4>
          <label htmlFor='search' className="searchContainer">  
    		<input type='text' name="search"  placeholder='Search...' className='search' onChange={e => setSearch(e.target.value)}/>
    	  </label>
    
	        <table id="datatable" className="table table-bordered" cellSpacing="0" width="100%">
	    
	            <thead>
	                <tr>
	                    <th>#</th>
	                    <th>Name</th>
	                    <th>Last Name</th>
	                    <th>Email</th>
	                    <th>Inquiry</th>
	                    <th>Phone Number</th>
	                    <th>Status</th>
	                    <th></th>
	                </tr>
	            </thead>
	    
	    
	            <tbody>
	                
	                {currentItems.map((inq)=> (
		                <tr key={inq.id}>

		                    <td>{inq.id}</td>
		                    <td>{inq.name}</td>
		                    <td>{inq.last_name}</td>
		                    <td>{inq.email}</td>
		                    <td>{inq.inquiry}</td>
		                    <td>{inq.phone_number}</td>
		                    <td>{inq.pending === 0? 'Pending': inq.pending === 1? 'Answered': 'Closed Client'}</td>
		                    <td>
		                    	<Button variant="danger"  onClick={() => forceDelete(inq.id)}>Delete Trash</Button>
		                    </td>
		                    <td>
		                    	<Button variant="success"  onClick={() => restore(inq.id)}>Restore Trash</Button>
		                    </td>

		                </tr>
	                	))}
	                      
	            </tbody>
	        </table>
        
        </div>

	    {/*==============PAGINATION COMPONENT INCLUDE HERE==================*/}
	      <ReactPaginate
	        breakLabel="..."
	        nextLabel="next >"
	        onPageChange={handlePageClick}
	        pageRangeDisplayed={3}
	        pageCount={pageCount}
	        previousLabel="< previous"
	        renderOnZeroPageCount={null}
	        containerClassName='pagination'
	        pageLinkClassName='page-num'
	        previousLinkClassName='page-num'
	        nextLinkClassName = 'page-num'
	        activeLinkClassName= 'active'
	      />
	    {/*==============PAGINATION COMPONENT END HERE==================*/} 

	</>
		)
}

export default DeletedInquiries