import { useEffect } from "react";
import { fetchData } from "./utils/api"
import { getApiConf } from "./store/homeSlice";

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

    </div>
  )
}

export default App
