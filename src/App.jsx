import { useEffect } from "react";
import { fetchData } from "./utils/api"
import { getApiConf } from "./store/homeSlice";
import {Header , Footer} from "./Components";
import { Outlet } from "react-router-dom";

function App() {

  useEffect(() => {
    const getData = () => {
      fetchData(`discover/movie`).then(res => {
        console.log(res);
      })
        .catch(err => {
          console.log(err);
        })
    }

    getData()
  }, [])

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
