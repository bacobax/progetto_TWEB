import SmartForm from "../../components/common/form/SmartForm";
import {GlobalNavbar} from "../../components/common/navbar/GlobalNavbar";

/**
 * AuthPage is a functional component in React.
 * It does not accept any props.
 *
 * The component returns a main element styled with CSS properties. The main element includes:
 * - A GlobalNavbar component for displaying the global navigation bar.
 * - A SmartForm component for displaying the authentication form.
 *
 * The main element is styled to fill the viewport and align its children in a column in the center.
 */
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