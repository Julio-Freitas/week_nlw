import { ReactComponent as CkeckIcon } from "../../assets/images/check.svg";
import { ReactComponent as LikeIcon } from "../../assets/images/like.svg";
import deleteIcon from "../../assets/images/delete.svg";
import answerIcon from "../../assets/images/answer.svg";

import "../../styles/question.scss";
import { memo, useEffect } from "react";

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    isHighlighted: boolean;
    isAnswered: boolean;
    isAdmin: boolean;
    onClickCheck?: () => void;
    onClickAnswer?: () => { isAnswered: boolean };
    onClickDelete?: () => void;
    onClickLike?: () => void;
    likesCount?: number;
    hasLiked?: string;
};
const Question = (props: QuestionProps) => {
    const {
        author,
        content,
        onClickCheck,
        onClickDelete,
        onClickAnswer,
        isAdmin,
        onClickLike,
        likesCount,
        hasLiked,
        isHighlighted,
    } = props;
    useEffect(() => {
        console.log(onClickAnswer);
    }, [onClickAnswer]);
    return (
        <div
            id="question-component"
            className={`${isHighlighted ? "isHighlighted" : ""}`}
        >
            <div className="content">
                <p>{content}</p>
                <div className="footer">
                    <div>
                        <p>{author.name}</p>
                        <img src={author.avatar} alt="" />
                    </div>

                    <div className="icons-footer">
                        {isAdmin ? (
                            <>
                                <button type="button" onClick={onClickCheck}>
                                    <CkeckIcon className="check-icon" />
                                </button>
                                <button type="button" onClick={onClickAnswer}>
                                    <img src={answerIcon} alt="" />
                                </button>
                                <button type="button" onClick={onClickDelete}>
                                    <img src={deleteIcon} alt="" />
                                </button>
                            </>
                        ) : (
                            <button
                                className={`like-button ${
                                    hasLiked ? "has-Like" : "no-like"
                                }`}
                                type="button"
                                aria-label="Marcar como gostei"
                                onClick={onClickLike}
                            >
                                <span>{likesCount}</span>
                                <LikeIcon />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Question);
