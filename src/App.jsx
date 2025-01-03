import "./styles.css";
import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './utils/AppRouter';
import { UserContextProvider } from './utils/UserContext';
import { MessageContextProvider } from './utils/MessageContext';
function App() {
  return (
    <div className='w-full h-full min-h-screen sm:w-3/5 bg-orange-200 min-w-screen-sm mx-auto my-8'>
      <UserContextProvider>
        <MessageContextProvider>
        <RouterProvider router={AppRouter}></RouterProvider>
        </MessageContextProvider>
      </UserContextProvider>
    </div>
  )
}
export default App
