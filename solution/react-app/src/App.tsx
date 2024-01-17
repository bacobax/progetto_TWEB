//the pages must lazy load
import {Route, Routes} from "react-router-dom";
import {lazy, Suspense} from "react";

import Loading from "./components/animations/Loading";
import Gallery from "./pages/clubs/Gallery";
import {ROUTES} from "./constants/constants";
import ProtectedRoute from "./auth/ProtectedRoute";
import PlayersPage from "./pages/players/PlayersPage";

const GamesPage = lazy(() => import("./pages/games/GamesPage"));
const PlayerInfoPage = lazy(() => import("./pages/playerinfo/PlayerInfoPage"));
const ClubInfoPage = lazy(() => import("./pages/clubinfo/ClubInfoPage"));
const AuthPage = lazy(() => import("./pages/auth/AuthPage"));
const HomePage = lazy(() => import("./pages/home/HomePage"));
const Chat = lazy(() => import("./pages/chat/Chat"));
const ForgotPasswordPage = lazy(() => import("./pages/auth/ForgotPasswordPage"));


function App() {

  return (
    <>
        <Suspense fallback={<Loading />}>

            <Routes>
                <Route path={ROUTES.AUTH("_")} element={<AuthPage />}/>
                <Route path={ROUTES.AUTH("_")+"/forgot"} element={<ForgotPasswordPage />}/>
                <Route path={ROUTES.CLUBS} element={<Gallery />} />
                <Route path={ROUTES.PLAYERS} element={<PlayersPage />} />
                <Route path={ROUTES.HOME} element={<HomePage />} />
                <Route path={ROUTES.CHAT} element={<ProtectedRoute>
                    <Chat />
                </ProtectedRoute>} />
                <Route path={ROUTES.GAMES} element={<GamesPage />} />
                <Route path={ROUTES.PLAYER_INFO} element={<PlayerInfoPage />}/>
                <Route path={ROUTES.CLUB_INFO} element={<ClubInfoPage />} />
                <Route path={ROUTES.DEFAULT} element={<h1 style={{color:"white"}}>Not Found</h1>} />
            </Routes>
        </Suspense>
    </>
  );
}

export default App;
