import { useHistory } from "react-router-dom";

import ilustrationImage from "../../assets/images/illustration.svg";

import "../../styles/auth.scss";

const NotFound = () => {
    const history = useHistory();
    return (
        <div id="page-auth">
            <aside>
                <img
                    src={ilustrationImage}
                    alt="Itulstração simbolizando perguntas e respostas"
                    title="Google icon"
                />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <h2>Página não encontrada</h2>
                    <a href="/" onClick={() => history.push("/")}>
                        voltar página inicio
                    </a>
                </div>
            </main>
        </div>
    );
};

export default NotFound;
