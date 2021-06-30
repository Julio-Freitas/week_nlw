import Routes from "./routes/routes";
import AuthProvider from "./context/AuthProvider";

import "./App.css";
import "./styles/global.scss";

function App() {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
}

export default App;
