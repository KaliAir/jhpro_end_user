import React from 'react'
import {useAuth} from '../context/AuthContext'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {useState,useEffect} from 'react'
import ReactPaginate from 'react-paginate';
import Button from 'react-bootstrap/Button';

const ManageInquiries = ()=>{
//================================STATES AND CONTEXT=========================	
	const {inquiry,setSearch, token, loader, deleteInquiry} = useAuth()
	const [show, setShow] = useState(false);
	const [deleteID, setDeleteID] = useState('')


	const[id,setID]=useState('')
    const[name,setName]=useState('')
	const[lastname,setLastName]=useState('')
	const[email,setEmail]=useState('')
	const[inquiries,setInquiry]=useState('')
	const[phonenumber, setPhoneNumber]=useState('')
	const[pendingInquiry, setPendingInquiry]=useState('')

//===============================onSubmit UPDATE INQUIRIES==============================
	const handleUpdate = (e)=>{
		e.preventDefault()
		const data = {name,lastname,email,inquiries,phonenumber,pendingInquiry}
		// console.log({name,lastname,email,inquiry,phonenumber})
		fetch(`${process.env.REACT_APP_API_URL}/update/${id}`,{
			method: 'PUT',
			headers:{
				'Authorization': `Bearer ${token}`,
	            'Accept': 'application/json',
	            'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		})
		.then(res=> res.json())
		.then((response)=>{

			loader()
			
		}).catch((error)=>{
			console.log(error.message)
		})

		setShow(false)

	}

//===============================EDIT=====================
		const handleShow = (id)=>{
			fetch(`${process.env.REACT_APP_API_URL}/edit/${id}`,{
				method:'GET',
				headers:{
					'Authorization': `Bearer ${token}`,
		            'Accept': 'application/json',
		            'Content-Type': 'application/json',
				}
			})
			.then(res=> res.json())
			.then((response)=>{
				const {data}= response
				//setEditID(data.editValue)
				setDeleteID(id)

				setID(data.editValue.id)
		    	setName(data.editValue.name)
		    	setLastName(data.editValue.last_name)
		    	setEmail(data.editValue.email)
		    	setInquiry(data.editValue.inquiry)
		    	setPhoneNumber(data.editValue.phone_number)
		    	setPendingInquiry(data.editValue.pending)

			}).catch((error)=>{
				console.log(error.message)
			})

			setShow(true)
		}

	//================CLOSE MODAL===========

    const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);

//=========================DELETE INQUIRIES==========================
    const handleDelete = ()=> {
    	if(window.confirm('Are you sure you want to Delete this?')){
    		
    		deleteInquiry(deleteID)
    		loader()
    		setShow(false)
    	}

    	setShow(false)
    }

//=======================Call a Value and Functions from Context API===============
	
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
          <h4 className="mt-0 header-title">MANAGE INQUIRIES</h4>
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
		                    	<Button variant="primary" onClick={()=>handleShow(inq.id)}>Details</Button>
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
     

		  <Modal show={show} onHide={handleClose}>
	        <Modal.Header>
	          <Modal.Title>Update Inquiries</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
	        {/*============================MODAL FORM====================================*/}
	          <Form onSubmit={handleUpdate}>

	            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
	              <Form.Label>Name</Form.Label>
	              <Form.Control
	              	defaultValue={name}
	                type="text"
	                placeholder="name"
	                autoFocus
	                onChange={(e)=> setName(e.target.value)}
	              />
	            </Form.Group>

	            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
	              <Form.Label>Last Name</Form.Label>
	              <Form.Control
	              	defaultValue={lastname}
	                type="text"
	                placeholder="last name"
	                autoFocus
	                onChange={(e)=> setLastName(e.target.value)}
	              />
	            </Form.Group>

	            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
	              <Form.Label>Email address</Form.Label>
	              <Form.Control
	              	defaultValue={email}
	                type="email"
	                placeholder="email"
	                autoFocus
	                onChange={(e)=> setEmail(e.target.value)}
	              />
	            </Form.Group>

	            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
	              <Form.Select size="lg" name='inquiry' required onChange={(e)=> setInquiry(e.target.value)}>
	              		<option value="Interior Design">Interior Design</option>
						<option value="Exterior Design">Exterior Design</option>
						<option value="Roofing">Roofing</option>
						<option value="Land Scaping">Land Scaping</option>
						<option value="Fencing">Fencing</option>
						<option value="Swimming Pools">Swimming Pools</option>
						<option value="Smart Home">Smart Home</option>
						<option value="Other">Other</option>
	              </Form.Select>
	            </Form.Group>

	            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
	              <Form.Label>Phone Number</Form.Label>
	              <Form.Control
	              	defaultValue={phonenumber}
	                type="text"
	                placeholder="Phone Number"
	                autoFocus
	                onChange={(e)=> setPhoneNumber(e.target.value)}
	              />
	            </Form.Group>

	            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
	              <Form.Select size="lg" name='pendingInquiry' defaultValue={pendingInquiry} required onChange={(e)=> setPendingInquiry(e.target.value)}>
	              		<option value="0">Pending Inquiry</option>
						<option value="1">Answered Inquiry</option>
						<option value="2">Close Client</option>
	              </Form.Select>
	            </Form.Group>

	            <Button variant="primary" type='submit'>
	            Save Changes
	          </Button>
	          </Form>
	         {/*============================End Form======================================*/}
	        </Modal.Body>
	        <Modal.Footer>
	          <Button variant="secondary" onClick={handleClose}>
	            Close
	          </Button>
	          <Button variant="danger" onClick={handleDelete}>
	            Delete
	          </Button>
	        </Modal.Footer>
	      </Modal>
	</>
		)
}

export default ManageInquiries