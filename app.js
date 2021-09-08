console.log('Welcome');
shownotes();
let addbtn = document.getElementById('add-btn');
addbtn.addEventListener('click', function (e) {

    let addtext = document.getElementById('floatingTextarea');
    let addtitle = document.getElementById('add-title');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    myobj={
        title:addtitle.value,
        text:addtext.value
    }
    notesobj.push(myobj);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addtext.value = ""
    addtitle.value=""
    // console.log(notesobj);
    shownotes();


})
function shownotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let html = ""
    notesobj.forEach(

        function (element, index) {
            html += ` <div class="notecard card mx-2 my-2" style="width: 18rem;">

    <div class="card-body">
        <h5 class="card-title"> ${element.title}</h5>
        <p class="card-text">${element.text}</p>
        <button id="${index}" onclick="deletenote(this.id)" class="btn btn-primary">Deletenote</button>
    </div>
</div>`
        });
    let noteselm = document.getElementById('notes');
    if (notesobj.length != 0) {
        noteselm.innerHTML = html;
    }
    else {
        noteselm.innerHTML = `Nothing to show! Use "add a note"`
    }
}
function deletenote(index) {
    // console.log("I am deleting",index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }

    notesobj.splice(index,1);
   
    localStorage.setItem("notes", JSON.stringify(notesobj));
    shownotes();
}
let search = document.getElementById('searchtxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('notecard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})

/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server 
*/ 

