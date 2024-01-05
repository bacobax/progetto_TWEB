import SmartForm from "../../components/form/SmartForm";
import {GlobalNavbar} from "../../components/navbar/GlobalNavbar";

const AuthPage = () => {
    return (
        <main style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh",
            width: "100vw",
        }}>
            <GlobalNavbar />
            <SmartForm />
        </main>
    )
}

export default AuthPage;