import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import {Home , Details , Explore ,Page404 , SearchResult} from './Pages'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home />} />
      <Route path='/:type/:id' element={<Details />} />
      <Route path='/explore/:type' element={<Explore />} />
      <Route path='/search/:query' element={<SearchResult />} />
      <Route path='*' element={<Page404 />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
)
