import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) =>{
    const notesInitials = [
        {
          "_id": "66fb872227a550b66e92547e",
          "user": "66f99eea070861578b1cefbf",
          "title": "Save this file",
          "description": "It is a doc file",
          "tag": "Personal Notes",
          "date": "2024-10-01T05:22:42.385Z",
          "__v": 0
        },
        {
            "_id": "66fb872227a550b66e92547e",
            "user": "66f99eea070861578b1cefbf",
            "title": "Save this file",
            "description": "It is a doc file",
            "tag": "Personal Notes",
            "date": "2024-10-01T05:22:42.385Z",
            "__v": 0
          },
          {
            "_id": "66fb872227a550b66e92547e",
            "user": "66f99eea070861578b1cefbf",
            "title": "Save this file",
            "description": "It is a doc file",
            "tag": "Personal Notes",
            "date": "2024-10-01T05:22:42.385Z",
            "__v": 0
          },
          {
            "_id": "66fb872227a550b66e92547e",
            "user": "66f99eea070861578b1cefbf",
            "title": "Save this file",
            "description": "It is a doc file",
            "tag": "Personal Notes",
            "date": "2024-10-01T05:22:42.385Z",
            "__v": 0
          },
          {
            "_id": "66fb872227a550b66e92547e",
            "user": "66f99eea070861578b1cefbf",
            "title": "Save this file",
            "description": "It is a doc file",
            "tag": "Personal Notes",
            "date": "2024-10-01T05:22:42.385Z",
            "__v": 0
          },
          {
            "_id": "66fb872227a550b66e92547e",
            "user": "66f99eea070861578b1cefbf",
            "title": "Save this file",
            "description": "It is a doc file",
            "tag": "Personal Notes",
            "date": "2024-10-01T05:22:42.385Z",
            "__v": 0
          },
          {
            "_id": "66fb872227a550b66e92547e",
            "user": "66f99eea070861578b1cefbf",
            "title": "Save this file",
            "description": "It is a doc file",
            "tag": "Personal Notes",
            "date": "2024-10-01T05:22:42.385Z",
            "__v": 0
          },
          {
            "_id": "66fb872227a550b66e92547e",
            "user": "66f99eea070861578b1cefbf",
            "title": "Save this file",
            "description": "It is a doc file",
            "tag": "Personal Notes",
            "date": "2024-10-01T05:22:42.385Z",
            "__v": 0
          },
          {
            "_id": "66fb872227a550b66e92547e",
            "user": "66f99eea070861578b1cefbf",
            "title": "Save this file",
            "description": "It is a doc file",
            "tag": "Personal Notes",
            "date": "2024-10-01T05:22:42.385Z",
            "__v": 0
          },
          {
            "_id": "66fb872227a550b66e92547e",
            "user": "66f99eea070861578b1cefbf",
            "title": "Save this file",
            "description": "It is a doc file",
            "tag": "Personal Notes",
            "date": "2024-10-01T05:22:42.385Z",
            "__v": 0
          },
      ];
      const [notes, setNotes] = useState(notesInitials);
    const state = {
        "name" : "Harry",
        "class" : "5b"
    }
    return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;