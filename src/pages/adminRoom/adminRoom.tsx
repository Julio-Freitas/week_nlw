import { useCallback, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import UserRoom from "../../hooks/UserRoom";
import logoImg from "../../assets/images/logo.svg";
import { Button } from "../../components/button";
import { RoomCode } from "../../components/roomCode";
import { Question } from "../../components/question";
import { Modal } from "../../components/modal";
import { ModalConfirm } from "../../components/modalConfirm";
import UseAuth from "../../hooks/UseAuth";
import { database } from "../../services/firebase";

import "../../styles/room.scss";

type RoomParams = {
    roomId: string;
};

const AdminRoom = () => {
    const history = useHistory();
    const { roomId } = useParams<RoomParams>();
    const [openModal, setModal] = useState<any>(false);
    const { user } = UseAuth();
    const { title, questions } = UserRoom(roomId);
    const [questionIdDelete, setQuestionIdDelete] = useState<string>("");
    const [confirmModal, setConfirmModal] = useState(false);

    const _handleDeleteQuestion = (questionCurrent: string) => {
        setModal(true);
        setQuestionIdDelete(questionCurrent);
    };

    useEffect(() => {
        return () => {
            database.ref(`rooms/${roomId}`).off();
        };
    }, [roomId]);

    const _handleConfirmDelete = async (questionId: string) => {
        try {
            const pathLike = `rooms/${roomId}/questions/${questionId}`;
            await database.ref(`${pathLike}/`).remove();
            setModal(false);
            setConfirmModal(true);
        } catch (error) {
            setModal(false);
        } finally {
            setModal(false);
        }
    };

    const _handleHighlighted = async (
        questionId: string,
        isHighlighted: boolean
    ) => {
        const pathLike = `rooms/${roomId}/questions/${questionId}`;
        await database.ref(`${pathLike}/`).update({
            isHighlighted: !isHighlighted,
        });
    };

    const _handleAnswered = useCallback(
        (questionId: string, isAnswered: boolean) => {
            return { isAnswered: !isAnswered };
        },
        []
    );

    const _handleTerminateRoom = async () => {
        try {
            await database.ref(`rooms/${roomId}`).remove();
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button
                            type="submit"
                            disabled={!user}
                            isOutline={true}
                            onClick={_handleTerminateRoom}
                        >
                            Encerrar sala
                        </Button>
                    </div>
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>{title}</h1>
                    {!!questions && questions?.length > 0 && (
                        <span>{questions?.length} pergunta(s) </span>
                    )}
                </div>
                {!!questions &&
                    questions.map((question) => (
                        <Question
                            key={question.id}
                            author={question.author}
                            content={question.content}
                            isHighlighted={question.isHighlighted}
                            isAnswered={question.isAnswered}
                            onClickCheck={() =>
                                _handleHighlighted(
                                    question.id,
                                    question.isHighlighted
                                )
                            }
                            onClickDelete={() =>
                                _handleDeleteQuestion(question.id)
                            }
                            onClickAnswer={() =>
                                _handleAnswered(
                                    question.id,
                                    question.isAnswered
                                )
                            }
                            isAdmin={true}
                        />
                    ))}
                {openModal && (
                    <Modal
                        onClickCloseModal={setModal}
                        onClickDelete={() =>
                            _handleConfirmDelete(questionIdDelete)
                        }
                        onClickCancel={() => setModal(false)}
                    />
                )}

                <ModalConfirm
                    open={confirmModal}
                    timeClose={5000}
                    content="Questão deletada com sucesso!"
                    fallbackCloseModal={(close) => setConfirmModal(close)}
                />
            </main>
        </div>
    );
};

export default AdminRoom;
