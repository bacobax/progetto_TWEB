//the pages must lazy load
import {Route, Routes} from "react-router-dom";
import {lazy, Suspense} from "react";

import Loading from "./components/animations/Loading";
import Gallery from "./pages/gallery/Gallery";

const AuthPage = lazy(() => import("./pages/auth/AuthPage"));
const HomePage = lazy(() => import("./pages/home/HomePage"));

function App() {


  return (
    <>
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path={"auth"} element={<AuthPage />}/>
                <Route path={"gallery"} element={<Gallery />} />
                <Route path={"/"} element={<HomePage />} />
                <Route path={"*"} element={<h1 style={{color:"white"}}>Not Found</h1>} />
            </Routes>
        </Suspense>
    </>
  );
}

export default App;
