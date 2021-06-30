import { useState, useEffect } from "react"
import { database } from "../services/firebase";
import UseAuth from "./UseAuth";



type Questions = {
    id: string;
    author: {
        name: string;
        avatar: string;
    };
    content: string;
    isHighlighted: boolean;
    isAnswered: boolean;
    likesCount?: number;
    likeId?: string | undefined;

};


type ObjetTypeQuestion = {
    author: {
        name: string;
        avatar: string;
    };
    content: string;
    isHighlighted: boolean;
    isAnswered: boolean;
    likes: Record<string, {
        authorId: string
    }>;
    likesCount?: number;
    hasLiked?: boolean;   
}

type FirebaseQuestions = Record <string, ObjetTypeQuestion>;



export default function UserRoom(roomId:string ) {
    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState<Questions[]>();
    const {user} = UseAuth();

    useEffect(()=> {
        const dbRef = database.ref(`rooms/${roomId}`);
  
        dbRef.on('value', room => {
            const databaseRoom = room.val();
            const questions:FirebaseQuestions = databaseRoom?.questions ?? {};
         
            const parsetQuestions = Object.entries(questions).map(
                ([
                    key,
                    { author, content, isHighlighted, isAnswered, likes },
                ]) => ({
                    id: key,
                    author,
                    content,
                    isHighlighted,
                    isAnswered,
                    likesCount: Object.values(likes ?? {}).length,
                    likeId:Object.entries(likes ?? {}).find(([key, like])=> like.authorId === user?.id)?.[0]
                })
            );

            setQuestions(parsetQuestions);
            setTitle(databaseRoom?.title);
      

        }, error=> {
            console.log(error)
        })


        return () => dbRef.off('value');

    },[roomId, user?.id]);


    return {title, questions}

    
}