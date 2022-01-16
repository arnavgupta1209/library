let library = []

function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    let newbook = new book(title, author, pages, read);
    library.push(newbook);
}

function updateDisplay() {


    // first remove all cards from dom
    document.querySelectorAll(".card").forEach(e => e.remove());


    // add cards from array books into dom
    for (let i in library) {

        let newdiv = document.createElement("div");
        newdiv.classList.add("card");
        //newdiv.dataset.index = i;

        //make divs to add content using cardtitle and cardcontent
        let cardtitle = document.createElement("div");
        cardtitle.classList.add("cardtitle");
        cardtitle.textContent = `${library[i].title}`
        newdiv.appendChild(cardtitle);

        //make content, first author
        let cardauthor = document.createElement("div");
        cardauthor.classList.add("cardcontent");
        cardauthor.textContent = `by ${library[i].author}`
        newdiv.appendChild(cardauthor);

        //make content, pages
        let cardpages = document.createElement("div");
        cardpages.classList.add("cardcontent");
        cardpages.textContent = `${library[i].pages} pages long`
        newdiv.appendChild(cardpages);

        //make content, read or not
        let cardread = document.createElement("div");
        cardread.classList.add("cardcontent");
        if (library[i].read === true) {
            cardread.textContent = `already read`
        } else {
            cardread.textContent = `not read`
        }
        newdiv.appendChild(cardread);

        //make the buttoncontainer div with cardcontent class
        let buttoncontainer = document.createElement("div");
        buttoncontainer.classList.add("cardcontent");
        //make the removebutton and readbutton
        let removebutton = document.createElement("button");
        removebutton.classList.add("removebutton");
        removebutton.textContent = "remove";

        let readbutton = document.createElement("button");
        readbutton.textContent = "toggle read";
        if (library[i].read === true) {
            readbutton.classList.add("readbutton");
        } else {
            readbutton.classList.add("notreadbutton");
        }


        //append buttons to container
        buttoncontainer.appendChild(readbutton);
        buttoncontainer.appendChild(removebutton);

        //append container to newdiv
        newdiv.appendChild(buttoncontainer);

        //append completed content into card
        document.querySelector(".content").appendChild(newdiv);

        // making event listener for remove
        removebutton.addEventListener("click", () => {
            library.splice(i,1);
            updateDisplay();
        });

    }
}


// make function to take data from form and use addbooktolibrary 
function addFromForm() {
    let btitle = document.forms["inputForm"]["btitle"].value;
    let bauthor = document.forms["inputForm"]["bauthor"].value;
    let bpages = document.forms["inputForm"]["bpages"].value;
    let checkbox = document.querySelector("#bread");
    if (checkbox.checked) {
        addBookToLibrary(btitle, bauthor, bpages, true);
    } else {
        addBookToLibrary(btitle, bauthor, bpages, false);
    }
    updateDisplay();
    return false;
}

updateDisplay();