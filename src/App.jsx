import { useEffect } from "react";
import { fetchData } from "./utils/api"
import { Header, Footer } from "./Components";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getApiConf, getGenres, getGenresByType } from "./store/homeSlice";

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
    const genresCall = async () => {
      const promises = []
      const endPoints = ['tv', 'movie']
      const genresObj = {}

      endPoints.forEach(item => {
        promises.push(fetchData(`genre/${item}/list`))
      })

      const data = await Promise.all(promises)
      data.map(({ genres }) => genres.map(item => genresObj[item.id] = item.name))
      dispatch(
        getGenresByType({
          tv: data[0].genres,
          movie: data[1].genres,
        })
      )
      dispatch(getGenres(genresObj))
    }

    genresCall()
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
