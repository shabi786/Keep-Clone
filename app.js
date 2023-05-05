const title = document.getElementById('title');
const noteText = document.getElementById('note');
const addButton = document.getElementById('addNote');
const listItems = document.querySelector('.notes-list');

const arrNotes = JSON.parse(localStorage.getItem('notes')) || [];


function handleNotes() {
    showNotes();
    title.value = "";
    noteText.value = "";
}

function showNotes() {

    const noteItem = {}
    noteItem.title = title.value === "" ? "Note" : title.value;
    noteItem.noteDesc = noteText.value;
    if (noteItem.noteDesc === "") {
        alert("Please add a Note")
        return;
    }
    arrNotes.push(noteItem);
    localStorage.setItem('notes', JSON.stringify(arrNotes))
    renderNotes();
}

function renderHtml(note, index) {
    return `
    <div class="notes">
      <p>${note.title}</p>
      <p>${note.noteDesc}</p>
      <div class="buttons">
        <button onclick="deleteNote(${index})" id="delete">Delete</button>
        <button onclick="handleArchive(${index})" id="archive">Archive</button>
      </div>
    </div>
  `;
}


function renderNotes() {
    if (arrNotes.length > 0) {
        const notesHTML = arrNotes.map((note, index) => renderHtml(note, index)).join("");
        listItems.innerHTML = notesHTML;
    }
}



addButton.addEventListener("click", handleNotes);
window.addEventListener('load', renderNotes);

function deleteNote(i) {
    let delNote = localStorage.getItem("deleted");
    if (delNote === null) {
        delNote = [];
    } else {
        delNote = JSON.parse(delNote);
    }
    delNote.push(arrNotes[i]);
    arrNotes.splice(i, 1);
    if (arrNotes.length === 0) {
        listItems.textContent = "";
    }
    localStorage.setItem('notes', JSON.stringify(arrNotes));
    localStorage.setItem("deleted", JSON.stringify(delNote));
    renderNotes();

}

function handleArchive(i) {
    let archived = localStorage.getItem("archived");
    if (archived === null) {
        archived = [];
    } else {
        archived = JSON.parse(archived);
    }
    archived.push(arrNotes[i]);
    arrNotes.splice(i, 1);
    if (arrNotes.length === 0) {
        listItems.textContent = "";
    }
    localStorage.setItem('notes', JSON.stringify(arrNotes));
    localStorage.setItem("archived", JSON.stringify(archived));
    renderNotes();
}

