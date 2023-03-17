import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
// import reportWebVitals from './reportWebVitals'
import router from './router'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <RouterProvider router={router} />
)

// reportWebVitals()
