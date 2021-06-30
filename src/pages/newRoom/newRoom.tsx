import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth";

import { Button } from "../../components/button";

import ilustrationImage from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";

import "../../styles/auth.scss";
import { database } from "../../services/firebase";

const NewRoom = () => {
    const { user } = UseAuth();
    const [newRoom, setNewRoom] = useState("");

    const _handleSubmitCreateRoom = async (event: FormEvent) => {
        event.preventDefault();
        if (!newRoom.trim()) return;
        const roomRef = database.ref("rooms");
        await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        });
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
                        <h2> Criar uma nova sala</h2>
                    </div>
                    {user?.name}
                    <form onSubmit={_handleSubmitCreateRoom}>
                        <input
                            type="text"
                            placeholder="nome da sala"
                            onChange={({ target }) => setNewRoom(target.value)}
                        />
                        <Button className="button" type="submit">
                            Criar uma nova sala
                        </Button>
                    </form>
                    <div>
                        <p>
                            Quer entra em uma nova sala{" "}
                            <Link to="/">Clique aqui</Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default NewRoom;
