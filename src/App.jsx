import React from 'react'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import SignIn from './sections/SignIn'
import Admin from './components/Admin'
import {RequireAuth} from './components/RequireAuth'
import {AuthProvider} from './context/AuthContext'
import {Fullback} from './components/Fullback'
import ManageInquiries from './sections/ManageInquiries'
import DeletedInquiries from './sections/DeletedInquiries'
const LazyDashboard = React.lazy(()=> import('./sections/Dashboard'))






const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path='/' element={<Fullback><SignIn/></Fullback>}/>
      <Route path='/admin' element={<RequireAuth><Admin/></RequireAuth>}>
         <Route index element={<React.Suspense fallback='Loading...'><LazyDashboard/></React.Suspense>}/>
         <Route path='manage' element={<ManageInquiries/>}/>
         <Route path='forcedelete' element={<DeletedInquiries/>}/>
      </Route>
      </>

      )
    )
  return (
    <AuthProvider>
     <RouterProvider router={router}/>
    </AuthProvider>
  );
};

export default App;