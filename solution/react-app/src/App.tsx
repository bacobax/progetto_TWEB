//the pages must lazy load
import {Route, Routes} from "react-router-dom";
import {lazy, Suspense} from "react";

import Loading from "./components/animations/Loading";
import Gallery from "./pages/gallery/Gallery";
import Background from "./components/Background";
import {ROUTES} from "./constants/constants";
import {useAuth} from "./hooks/useAuth";

const AuthPage = lazy(() => import("./pages/auth/AuthPage"));
const HomePage = lazy(() => import("./pages/home/HomePage"));

function App() {

    const {loggedIn} = useAuth();

  return (
    <>
        <Background />
        <Suspense fallback={<Loading />}>

            <Routes>
                <Route path={ROUTES.AUTH} element={<AuthPage />}/>
                <Route path={ROUTES.GALLERY} element={<Gallery />} />
                <Route path={ROUTES.HOME} element={<HomePage />} />
                <Route path={ROUTES.DEFAULT} element={<h1 style={{color:"white"}}>Not Found</h1>} />
            </Routes>
        </Suspense>
    </>
  );
}

export default App;
