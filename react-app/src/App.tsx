
import AuthPage from "./pages/auth/AuthPage";
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import {useEffect} from "react";
import useFetch from "./hooks/useFetch";
function App() {

    const {fetchData, loading, error} = useFetch<[{
        userId: number;
        id: number;
        title: string;
        completed: boolean;
    }]>()

    useEffect(() => {
        console.log("App mounted")

        fetchData({url: "https://jsonplaceholder.typicode.com/todos/"} , (data) => {
            console.log(data)
        });


        return () => {
            console.log("App unmounted")
        }

    } , [ fetchData]);

  return (
    <>
        <Navbar onSearch={ (e) => { console.log(e) } } />
      <Routes>
        <Route path={"auth"} element={<AuthPage />} />

          <Route path={"*"} element={<h1 style={{color:"white"}}>Not Found</h1>} />
      </Routes>

    </>
  );
}

export default App;
