import {useContext, createContext, useEffect, useState} from 'react'

const AuthContext = createContext()

export const useAuth = ()=>{
	return useContext(AuthContext)
}

export const AuthProvider = ({children})=>{
	const [token, setToken] = useState(localStorage.getItem('token'))
	const [user, setUser] = useState('')
	const [pending, setPending]= useState([])
	let [counter, setCounter] = useState(0)
	const [error,setError] = useState('')
	const [trash, setTrash] = useState([])

//=========================================SEARCH STATE AREA===================
	const [inquiry, setInquiry]=useState([])
	const [search, setSearch]=useState("") 

	
//=========================LOCAL STORAGE TOKEN=======
useEffect(()=>{
	localStorage.setItem('token', token)
},[token])
//===============================SHOW PENDING'S================
useEffect(()=>{

	fetch(`${process.env.REACT_APP_API_URL}/index`,{
		method:'GET',
		headers:{
	
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
		}
	})
	.then(res=> res.json())
	.then((response)=>{
		const {data}=response
		setPending(data.pending)
	}).catch((error)=>{
		console.log(error.message)
	})
},[token,counter])
//===============================Realtime LOADER============
const loader = ()=>{
	if(counter < 10){
		setCounter(counter += 1)
	}else{
		setCounter(0)
	}
}
//==========================SIGN UP==================
const signUp = (data)=>{
	console.log(data)
}
//===========================SIGN IN=================
const signIn = (val)=>{
	fetch(`${process.env.REACT_APP_API_URL}/login`,{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(val)
	})
	.then(res=> res.json())
	.then((response)=>{
		const {data} = response
	    setToken(data.token)
	    setUser(data.user.id)
	    setError('')
	}).catch((error)=>{
		setError('Credentials do not match please check your Email & Password')
	})
} 

//==========================SIGN OUT===============
const signOut = ()=> {
	localStorage.removeItem('token')
	setToken('')
}

//==========================================SEARCh FILTER QUERY===========

	const searchVal = search.length > 3?search:''
//==============================================SEARCH======================

	  useEffect(()=>{
	  	fetch(`${process.env.REACT_APP_API_URL}/search`,{
	  		method:'POST',
	  		headers:{
	  			'Authorization': `Bearer ${token}`,
	            'Content-Type': 'application/json',
	            'Accept': 'application/json'
	  		},
	  		body:JSON.stringify({search: searchVal}) 
	  	})
	  	.then(res=> res.json())
	  	.then((response)=>{
	  		const {data} = response
	  		setInquiry(data.inquiry)
	  	}).catch((error)=>{
	  		console.log(error.message)
	  	})
	  },[token,searchVal,counter])
//===============================SOFT DELETE INQUIRIES====================
	  const deleteInquiry = (id)=>{
	  	fetch(`${process.env.REACT_APP_API_URL}/delete/${id}`,{
	  		method: 'DELETE',
	  		headers:{
	  			'Authorization': `Bearer ${token}`,
	            'Content-Type': 'application/json',
	            'Accept': 'application/json'
	  		}
	  	})
	  	.then(res=> res.json())
	  	.then((response)=>{

	  	}).catch((error)=>{
	  		console.log(error.message)
	  	})
	  }
//===============================FORCE DELETE INQUIRIES TO DATABASE====================
	  const forceDelete = (id)=>{
	  	fetch(`${process.env.REACT_APP_API_URL}/forceDelete/${id}`,{
	  		method: 'DELETE',
	  		headers:{
	  			'Authorization': `Bearer ${token}`,
	            'Content-Type': 'application/json',
	            'Accept': 'application/json'
	  		}
	  	})
	  	.then(res=> res.json())
	  	.then((response)=>{
	  		const {data} = response
	  		console.log(data.message)
	  		setCounter()
	  		
	  	}).catch((error)=>{
	  		console.log(error.message)
	  	})
	  }
//===============================SHOW DELETED INQUIRIES====================
	  useEffect(()=>{
	  	fetch(`${process.env.REACT_APP_API_URL}/showdelete`,{
	  		method: 'GET',
	  		headers:{
	  			'Authorization': `Bearer ${token}`,
	            'Content-Type': 'application/json',
	            'Accept': 'application/json'
	  		}
	  	})
	  	.then(res=> res.json())
	  	.then((response)=>{
	  		const {data} = response
	  		setTrash(data.trash)
	  	}).catch((error)=>{
	  		console.log(error.message)
	  	})
	  },[token,counter])
//====================================RESTORE SOFT DELETES=================
	  const restore = (id)=>{
	  	fetch(`${process.env.REACT_APP_API_URL}/restore/${id}`,{
	  		method:'POST',
	  		headers:{
	  			'Authorization': `Bearer ${token}`,
	            'Content-Type': 'application/json',
	            'Accept': 'application/json'
	  		}
	  	})
	  	.then(res=> res.json())
	  	.then((response)=>{
	  		const {data} = response
	  		console.log(data.message)
	  		setCounter()
	  	})
	  }
	  
//===============================VALUE'S=======================
const value = {
signUp,
signIn,
signOut,
error,
token,
user,
pending,
loader,
deleteInquiry,
trash,
forceDelete,
setSearch,
inquiry,
setInquiry,
restore

}
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}