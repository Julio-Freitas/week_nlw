import { FormEvent, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import logoImg from "../../assets/images/logo.svg";
import { Button } from "../../components/button";
import { RoomCode } from "../../components/roomCode";
import { User } from "../../components/user";
import { Question } from "../../components/question";
import UseAuth from "../../hooks/UseAuth";
import { database } from "../../services/firebase";

import "../../styles/room.scss";
import UserRoom from "../../hooks/UserRoom";

type RoomParams = {
    roomId: string;
};

const Room = () => {
    const { roomId } = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState("");
    const { user } = UseAuth();
    const { title, questions } = UserRoom(roomId);

    const _handleSendNewQuestion = async (event: FormEvent) => {
        console.log("ol");
        event.preventDefault();

        if (!newQuestion.trim())
            throw new Error("You cannot submit an empty question.!");
        if (!user) throw new Error("User is not logged");

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false,
        };

        await database.ref(`rooms/${roomId}/questions`).push(question);
        setNewQuestion("");
    };

    const _handleClickLike = useCallback(
        async (questionId: string, likeId: string | undefined) => {
            const pathLike = `rooms/${roomId}/questions/${questionId}/likes`;

            if (!!likeId) {
                await database.ref(`${pathLike}/${likeId}`).remove();
                //remove this liked
            } else {
                await database.ref(pathLike).push({
                    authorId: user?.id,
                });
            }
        },
        [roomId, user]
    );

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="" />
                    <RoomCode code={roomId} />
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>{title}</h1>
                    {!!questions && questions?.length > 0 && (
                        <span>{questions?.length} pergunta(s) </span>
                    )}
                </div>

                <form onSubmit={_handleSendNewQuestion}>
                    <textarea
                        placeholder="O que quer pergutnar?"
                        onChange={({ target }) => setNewQuestion(target.value)}
                        value={newQuestion}
                    />
                    <div className="form-footer">
                        {!user ? (
                            <span>
                                Para enviar uma pergunta,{" "}
                                <button>faça login</button>.
                            </span>
                        ) : (
                            <User name={user.name} avatar={user.avatar} />
                        )}

                        <Button
                            type="submit"
                            className="button"
                            disabled={!user}
                        >
                            Enviar Pergunta
                        </Button>
                    </div>

                    {!!questions &&
                        questions.map((question) => (
                            <Question
                                key={question.id}
                                author={question.author}
                                content={question.content}
                                isHighlighted={question.isHighlighted}
                                isAnswered={question.isAnswered}
                                onClickLike={() =>
                                    _handleClickLike(
                                        question.id,
                                        question.likeId
                                    )
                                }
                                hasLiked={question.likeId}
                                likesCount={question?.likesCount}
                                isAdmin={false}
                            />
                        ))}
                </form>
            </main>
        </div>
    );
};

export default Room;
