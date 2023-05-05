const archivedListItem = document.querySelector('.notes-list');


function restoreNote(index) {
    let archived = JSON.parse(localStorage.getItem("archived"));
    let notes = JSON.parse(localStorage.getItem("notes"));
    notes.push(archived[index]);
    archived.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("archived", JSON.stringify(archived));
    showArcNotes();
}

function removeNote(index) {
    let archived = JSON.parse(localStorage.getItem("archived"));
    archived.splice(index, 1);
    localStorage.setItem("archived", JSON.stringify(archived));
    showArcNotes();

}

function showArcNotes() {
    let archived = JSON.parse(localStorage.getItem("archived"));
    let final = archived.map((element, index) => {
        return ` <div class="notes">
      <p>${element.title}</p>
      <p>${element.noteDesc}</p>
      <div class="buttons">
        <button onclick="restoreNote(${index})" id="restore">Restore</button>
        <button onclick="removeNote(${index})" id="remove">Remove</button>
      </div>
    </div>`
    }).join("");
    archivedListItem.innerHTML = final;
}

showArcNotes();