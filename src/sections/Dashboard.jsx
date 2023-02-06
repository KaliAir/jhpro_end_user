import React from 'react'
import {useAuth} from '../context/AuthContext'
import {useEffect, useState } from 'react';
import DashTable from '../components/DashTable'


//==================PAGINATION from (npm install react-paginate --save) ============
import ReactPaginate from 'react-paginate';
//==================end===================

const Dashboard = ()=>{
		//=======================Call a Value and Functions from Context API===============
	  const {inquiry, setSearch} = useAuth()
	  //========================End of Call================================
	  
//==============================PAGINATION===========================
	  const [currentItems, setCurrentItems] = useState([])
	  const [pageCount, setPageCount]= useState(0)
	  const [itemOffset, setItemOffset] = useState(0);
	  const itemsPerPage = 10;

	  useEffect(()=>{
	  const endOffset = itemOffset + itemsPerPage;
	  setCurrentItems (inquiry.slice(itemOffset, endOffset));
	  setPageCount (Math.ceil(inquiry.length / itemsPerPage));
	},[inquiry, itemOffset, itemsPerPage])
	

	  const handlePageClick = (event) => {
	  const newOffset = (event.selected * itemsPerPage) %  inquiry.length;
	  setItemOffset(newOffset);
  };
//=============================END of PAGINATION======================  

	return(
	<>
		<div className="inquiry-container">
          <h4 className="mt-0 header-title">ALL INQUIRIES</h4>
        <label htmlFor='search' className="searchContainer">  
    		<input type='text' name="search"  placeholder='Search...' className='search' onChange={e => setSearch(e.target.value)}/>
    		</label>
	        
	        <DashTable val={currentItems}/>

        
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

export default Dashboard