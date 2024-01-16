import SmartForm from "../../components/common/form/SmartForm";
import {GlobalNavbar} from "../../components/common/navbar/GlobalNavbar";

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