const title = document.querySelector("#title");
const content = document.querySelector("#content");
const addBtn = document.querySelector("#addBtn");
const noteForm = document.querySelector("#note_form");
const colorPicker = document.querySelector("#color_picker");
const rootDiv = document.querySelector("#root");

const LS_KEY = 'notes';
const defaultNotes = JSON.parse(localStorage.getItem(LS_KEY));
let notes = defaultNotes || [];
let deleteBtns;

const onDeleteClick = (e) => {
	deleteNote(e.target.dataset.id);
}

const renderNotes = () => {rootDiv.innerHTML = `${notes.map(
(note) =>
`<div style="background-color: ${note.color};" class= "rendered_note">
	<div class="renderedDate">${note.createDate}</div>
	<div class="renderedTitle">${note.title}</div>
	<div class="renderedContent">${note.content}</div>
	<button class="delete_button" data-id="${note.id}">delete</button>
</div>
`
).join("")}`;
deleteBtns = document.querySelectorAll(".delete_button");
deleteBtns.forEach((btn) => btn.addEventListener("click", onDeleteClick));
renderedNotes = document.querySelectorAll(".rendered_note");
};

renderNotes();

const addNote = () => {
	const note = {
		id: "" + Date.now(),
		title: title.value,
		content: content.value,
		createDate: new Date(),
		color : colorPicker.value
	}
	
	notes.push(note);
	localStorage.setItem(LS_KEY, JSON.stringify(notes));
	renderNotes();
}

const deleteNote = (id) => {
	notes = notes.filter(item => item.id !== id);
	localStorage.setItem(LS_KEY, JSON.stringify(notes));
	renderNotes();
	deleteBtns.forEach((btn) => btn.addEventListener("click", onDeleteClick));
}

deleteBtns.forEach((btn) => btn.addEventListener("click", onDeleteClick));
addBtn.addEventListener("click", addNote);
