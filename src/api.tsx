import { NoteData } from "./types";

const API_URL = "http://localhost:5000/notes";

export async function fetchNotes() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Something went wrong when fetching data");
  }
  const data: NoteData[] = await response.json();

  return data;
}

export async function addNote(data: { title: string; content: string }) {
  const id = crypto.randomUUID();

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      title: data.title,
      content: data.content,
    }),
  });

  if (!response.ok) {
    throw new Error("Something went wrong when adding a note");
  }

  return { id, ...data };
}

export async function deleteNote(id: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Something went wrong when deleting a note");
  }
}

export async function editNote(
  id: string,
  editData: { title: string; content: string }
) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: editData.title,
      content: editData.content,
    }),
  });
  if (!response.ok) {
    throw new Error("Something went wrong when deleting a note");
  }
}
