import { useState } from 'react'
import "./styles.css";
import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './utils/AppRouter';
import { UserContextProvider } from './utils/UserContext';

function App() {

  return (
    <div className='w-full sm:w-1/2 bg-orange-200 min-w-screen-sm mx-auto h-screen my-8'>
      <UserContextProvider>
        <RouterProvider router={AppRouter}></RouterProvider>
      </UserContextProvider>
    </div>
  )
}

export default App
