import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './notes.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { API, graphqlOperation } from 'aws-amplify';
import { createNote, deleteNote, updateNote } from '../../graphql/mutations';
import { listNotes } from '../../graphql/queries';
import { Auth } from 'aws-amplify';

const Notes = () => {
  const initialNotes = [];
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState(initialNotes);
  const { register, handleSubmit, errors, reset, setValue } = useForm();
  const [noteEditing, setNoteEditing] = useState(null);

  useEffect(() => {
    const getAuthUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: false
      });
      setUser(authUser.username);
    };
    getAuthUser();

    const getNotes = async () => {
      const result = await API.graphql(
        graphqlOperation(listNotes, { owner: user })
      );
      const allNotes = result.data.listNotes.items;
      setNotes(allNotes);
    };
    getNotes();
  }, [user]);

  const onSubmit = async data => {
    if (noteEditing) {
      const updatedNote = { note: data.noteText, id: noteEditing };
      await API.graphql(
        graphqlOperation(updateNote, {
          input: updatedNote,
          owner: user
        })
      );
      const noteIndex = notes.findIndex(n => n.id === updatedNote.id);
      const newNotes = [...notes];
      newNotes[noteIndex] = updatedNote;
      setNotes(newNotes);
      setNoteEditing(null);
    } else {
      const result = await API.graphql(
        graphqlOperation(createNote, { input: { note: data.noteText } })
      );
      const newNote = result.data.createNote;
      setNotes([...notes, newNote]);
    }

    reset();
  };
  const deleteNoteHandler = async id => {
    const input = { id };
    await API.graphql(graphqlOperation(deleteNote, { input, owner: user }));
    const indexToRemove = notes.findIndex(n => n.id === id);
    const newNotes = [...notes];
    newNotes.splice(indexToRemove, 1);

    setNotes(newNotes);
  };

  const noteSelected = note => {
    // const { val } = e.target;
    setValue('noteText', note.note);
    setNoteEditing(note.id);
  };

  return (
    <div className="notes-wrapper">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            rows="3"
            name="noteText"
            ref={register({ required: true })}
          />
          {errors.noteText && (
            <span className="form-error">This field is required</span>
          )}

          <input
            value={noteEditing ? 'Update Note' : 'Add Note'}
            type="submit"
          />
        </form>
      </div>
      <div className="notes">
        {notes.map(n => (
          <div key={n.id} className="note-item">
            <div>
              <span
                className="note-text"
                onClick={() => {
                  noteSelected(n);
                }}
              >
                {n.note}
              </span>
              <FontAwesomeIcon
                onClick={() => deleteNoteHandler(n.id)}
                icon={faTimes}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
