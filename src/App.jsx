import { useEffect } from "react";
import { fetchData } from "./utils/api"
import { Header, Footer } from "./Components";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getApiConf } from "./store/homeSlice";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const getApiConfiguration = () => {
      fetchData(`configuration`).then(res => {
        const url = {
          backdrop: res?.images?.base_url + 'original',
          poster: res?.images?.base_url + 'original',
          profile: res?.images?.base_url + 'original',
        }
        dispatch(getApiConf(url))
      })
        .catch(err => {
          console.log(err);
        })
    }

    getApiConfiguration()
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
