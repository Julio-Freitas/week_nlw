import { useHistory } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth";
import { Button } from "../../components/button";
import { database } from "../../services/firebase";

import googleIncon from "../../assets/images/google-icon.svg";
import ilustrationImage from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";

import "../../styles/auth.scss";
import { FormEvent, useState } from "react";

type ErrosType = {
    hasError: boolean;
    message: string;
};
const Home = () => {
    const history = useHistory();

    const { user, signWithGoogle } = UseAuth();
    const [codeRoom, setCodeRoom] = useState("");
    const [erros, setErros] = useState<ErrosType>({
        hasError: false,
        message: "",
    });

    const _handleCreateRoom = async () => {
        if (!user) await signWithGoogle();
        history.push("/rooms/new");
    };

    const _handleGoToRoom = (event: FormEvent) => {
        event.preventDefault();
        if (!codeRoom.trim()) {
            setErros({ hasError: true, message: "Please, digit any code!" });
            return;
        }
        database.ref("rooms").on(
            "value",
            (snap) => {
                if (!Object.keys(snap.val()).includes(codeRoom)) {
                    setErros({
                        hasError: true,
                        message: "This room don't exist!",
                    });
                    return;
                }
                setErros({
                    hasError: false,
                    message: "",
                });
                history.push(`rooms/${codeRoom}`);
            },
            (err) => console.log(err)
        );
    };

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
                    <div>
                        <img src={logoImg} alt="Letmeask" />
                    </div>
                    <Button
                        type="button"
                        className="create-room"
                        onClick={_handleCreateRoom}
                    >
                        <img
                            src={googleIncon}
                            alt="Logo Google"
                            title="Google icon"
                        />
                        Crie sua sala com o Google
                    </Button>

                    <div className="separator">Ou entre em uma sala</div>
                    <form onSubmit={_handleGoToRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={({ target }) => setCodeRoom(target.value)}
                        />
                        <span>{erros.hasError && erros.message}</span>
                        <Button className="button" type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Home;
