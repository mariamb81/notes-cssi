let googleUser; //display name
let googleUserId; //uid
window.onload = event => {
  // Firebase authentication goes here.
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Console log the user to confirm they are logged in
      console.log("Logged in as: " + user.displayName);

      googleUserId = user.uid;
      googleUser = user.displayName;

      getNotes(googleUserId);
    } else {
      // If not logged in, navigate back to login page.
      window.location = "index.html";
    }
  });
};

const getNotes = userId => {
  const notesRef = firebase.database().ref(`users/${userId}`);
  //refreshes
  notesRef.on("value", snapshot => {
    const data = snapshot.val();
    renderDataAsHtml(data);
  });
};

//Given a list of notes, render them in HTML
const renderDataAsHtml = data => {
  let cards = "";
  let unorderedNotes = [];
  let items = 0;
  for (const noteItem in data) {
    unorderedNotes.push(data[noteItem].title);
    items++;
  }
  unorderedNotes.sort();
  console.log(unorderedNotes);
  let x = 0;
  for (let i = 0; i < items; i++) {
    for (const noteItem in data) {
      if (data[noteItem].title === unorderedNotes[x]) {
        const note = data[noteItem];
        cards += createCard(note, noteItem);
        x++;
      }
    }
  }
  document.querySelector("#app").innerHTML = cards;
};

// const deleteUser = noteId => {

//   firebase
//     .database()
//     .ref(`users/${googleUserId}/${noteId}`)
//     .remove();
// };

const deleteNote = noteId => {
  const modal = document.getElementById("modal-1");
  const cancelDeletion = document.getElementById("cancel-delete");
  const deleteConfirm = document.getElementById("note-delete");

  modal.classList.add("is-active"); //show modal

  deleteConfirm.addEventListener("click", e => {
    //deleted
    firebase
      .database()
      .ref(`users/${googleUserId}/${noteId}`)
      .remove();
    modal.classList.remove("is-active"); //hide modal
  });
  cancelDeletion.addEventListener("click", e => {
    //cancel
    modal.classList.remove("is-active");
  });
};

let numOfCards = 0;
// Return a note object converted into an HTML card
const createCard = (note, noteId) => {
  let colors = ["red", "blue", "green", "yellow", "orange"];
  numOfCards++;
  var randomItem = colors[Math.floor(Math.random() * colors.length)];
  const dateFormatted = new Date(note.created).toUTCString();
  const searchKey = note.label + numOfCards;
  // var element = document.getElementById("delete");
  return `
         <div class="column is-one-quarter">
         <div class="card" id="${numOfCards}" style="background-color:${randomItem}">
           <header class="card-header">
             <p class="card-header-title is-4">${note.title}</p>
           </header>
           <div class="card-content">
             <div class="content">${note.text}</div>
             <p id="username">${googleUser}</p>
             <p id="created">Created: ${dateFormatted}</p>
             <p >Category: <span class="tag" id="${searchKey}">${note.label}</span>
             </p>  
             <button id="${noteId}" type="button" onclick="deleteNote(this.id)">Delete</button>
           </div>
         </div>
       </div> `;
};

const searchButton = document.querySelector("#search");

const searchLabels = searchKey => {
  const searchResults = document.getElementById("app-search");
  console.log("searching...");
  let cardHasKey = {};
  let numOfMatches = 0;
  for (let i = 1; i <= numOfCards; i++) {
    let x = searchKey + i;
    let element = document.getElementById(x);
    if (element != null) {
      cardHasKey[numOfMatches] = document.getElementById(i); //card with search key
      cardHasKey[numOfMatches].style.backgroundColor = "white";
      //sending a copy of HTML DIV
      searchResults.innerText =
        String(cardHasKey[numOfMatches]);
      console.log(cardHasKey[numOfMatches]);
      numOfMatches++;
    }
  }
  if (numOfMatches === 0) searchResults.innerHTML = "No matches found";
};
searchButton.addEventListener("click", e => {
  const searchText = document.querySelector("#label");
  document.querySelector("#label-subtitle").innerHTML = searchText.value;
  searchLabels(searchText.value.toLowerCase());
  searchText.value = "";
});
