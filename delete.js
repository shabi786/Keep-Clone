const deletedListItem = document.querySelector('.notes-list');

function restoreNote(index) {
    let deleted = JSON.parse(localStorage.getItem("deleted"));
    let notes = JSON.parse(localStorage.getItem("notes"));
    notes.push(deleted[index]);
    deleted.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("deleted", JSON.stringify(deleted));
    showDelNotes();

}

function removeNote(index) {
    let deleted = JSON.parse(localStorage.getItem("deleted"));
    deleted.splice(index, 1);
    localStorage.setItem("deleted", JSON.stringify(deleted));
    showDelNotes();

}

function showDelNotes() {
    let deleted = JSON.parse(localStorage.getItem("deleted"));
    let final = deleted.map((element, index) => {
        return ` <div class="notes">
      <p>${element.title}</p>
      <p>${element.noteDesc}</p>
      <div class="buttons">
        <button onclick="restoreNote(${index})" id="restore">Restore</button>
        <button onclick="removeNote(${index})" id="remove">Remove</button>
      </div>
    </div>`
    }).join("");
    deletedListItem.innerHTML = final;
}

showDelNotes();