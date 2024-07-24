//document.addEventListener("DOMContentLoaded", () => {
//});
//localStorage.clear();
//localStorage.removeItem("option");

let myQuotes = [
    { text: "First quote", category: "1" },
    { text: "Second quote", category: "2" },
    { text: "Third quote", category: "3" }
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuote = document.getElementById("newQuote");
const myTable = document.createElement("table");
const myRow1 = document.createElement("tr");
const th1 = document.createElement("th");
th1.textContent = "Quote";
const th2 = document.createElement("th");
th2.textContent = "Category";
const myRow2 = document.createElement("tr");
const td1 = document.createElement("td");
const td2 = document.createElement("td");
myRow1.appendChild(th1);
myRow1.appendChild(th2);
myTable.appendChild(myRow1);

//localStorage.clear()
loadTasks();  // Load tasks from localStorage on page load
// Function to load tasks from localStorage
function loadTasks() {
    /*
        const filteredQuotes = myQuotes.filter(quote => quote.category == );
        removeRows();
        filteredQuotes.forEach(element => {
            const myRow2 = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            td1.textContent = element.text;
            td2.textContent = element.category;
            myRow2.appendChild(td1);
            myRow2.appendChild(td2);
            myTable.appendChild(myRow2);
        });
        quoteDisplay.appendChild(myTable);
    }else {
    
    }
    */
    const storedQuotes = JSON.parse(localStorage.getItem("localQuotes") || '[]');
    const lastSelected = JSON.parse(localStorage.getItem("option") || "[]");
    console.log(typeof storedQuotes);
    console.log(typeof lastSelected);
    if (storedQuotes == "") {
        if (lastSelected != "") {
            const filteredQuotes = lastSelected === 'all' ? myQuotes : myQuotes.filter(quote => quote.category === lastSelected);
            filteredQuotes.forEach(element => {
                const myRow2 = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                td1.textContent = element.text;
                td2.textContent = element.category;
                myRow2.appendChild(td1);
                myRow2.appendChild(td2);
                myTable.appendChild(myRow2);
            });
            quoteDisplay.appendChild(myTable);
        } else {
            myQuotes.forEach(element => {
                const myRow2 = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                td1.textContent = element.text;
                td2.textContent = element.category;
                myRow2.appendChild(td1);
                myRow2.appendChild(td2);
                myTable.appendChild(myRow2);
            });
            quoteDisplay.appendChild(myTable);
        }
    } else {
        myQuotes = [...storedQuotes];
        if (lastSelected != "") {
            const filteredQuotes = lastSelected === 'all' ? myQuotes : myQuotes.filter(quote => quote.category === lastSelected);
            filteredQuotes.forEach(element => {
                const myRow2 = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                td1.textContent = element.text;
                td2.textContent = element.category;
                myRow2.appendChild(td1);
                myRow2.appendChild(td2);
                myTable.appendChild(myRow2);
            });
            quoteDisplay.appendChild(myTable);
        } else {
            myQuotes.forEach(element => {
                const myRow2 = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                td1.textContent = element.text;
                td2.textContent = element.category;
                myRow2.appendChild(td1);
                myRow2.appendChild(td2);
                myTable.appendChild(myRow2);
            });
            quoteDisplay.appendChild(myTable);
        }
    }
}

//event-listeners
newQuote.addEventListener("click", showRandomQuote);

//function to clear existing data rows
function removeRows() {
    const myRemove = myTable.childNodes;
    while (myRemove[1]) {
        myRemove[1].remove();
    }
}

//function to display a random quote
function showRandomQuote() {
    removeRows();
    const currentIndex = myQuotes[Math.floor(Math.random() * myQuotes.length)];
    td1.textContent = currentIndex.text;
    td2.textContent = currentIndex.category;
    myRow2.appendChild(td1);
    myRow2.appendChild(td2);
    myTable.appendChild(myRow2);
    quoteDisplay.appendChild(myTable);
}


//function to add a new quote
function addQuote() {
    // removeRows();
    const myRow2 = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const newQuoteText = document.getElementById("newQuoteText");
    const newQuoteCategory = document.getElementById("newQuoteCategory");
    isValid = true;
    const newArr = { text: "", category: "" };

    if (newQuoteText.value.trim() === "" || newQuoteCategory.value.trim() === "") {
        isValid = false;
    }

    if (isValid) {
        td1.textContent = newQuoteText.value.trim();
        td2.textContent = newQuoteCategory.value.trim();
        myRow2.appendChild(td1);
        myRow2.appendChild(td2);
        myTable.appendChild(myRow2);
        quoteDisplay.appendChild(myTable);
        newArr.text = newQuoteText.value.trim();
        newArr.category = newQuoteCategory.value.trim();
        myQuotes.push(newArr);
        const selectedCategory = document.getElementById('categoryFilter');
        const option = document.createElement("option");
        option.textContent = newArr.category;;
        option.value = newArr.category;
        selectedCategory.appendChild(option);
        saveQuotes();                               //update local storage
        newQuoteText.value = "";
        newQuoteCategory.value = "";
    } else {
        alert("Please! Enter something");
    }
}

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem("localQuotes", JSON.stringify(myQuotes));
}

// Function to export quotes to a JSON file
function exportToJsonFile() {
    const jsonQuotes = JSON.stringify(myQuotes);
    const blob = new Blob([jsonQuotes], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
        const importedQuotes = JSON.parse(event.target.result);
        myQuotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// function to populate the dropdown menu unique categories of existing quotes
function myPopulate(arr) {
    const categoryFilter = document.getElementById("categoryFilter");
    const unique = [];
    arr.forEach(value => {
        if (!unique.includes(value.category)) {
            unique.push(value.category)
        }
    });
    unique.forEach(category => {
        const option = document.createElement("option");
        option.textContent = category;
        option.value = category;
        categoryFilter.appendChild(option);
    });
}
myPopulate(myQuotes);

// function to update the displayed quotes based on the selected category.
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredQuotes = selectedCategory === 'all' ? myQuotes : myQuotes.filter(quote => quote.category === selectedCategory);
    removeRows();
    filteredQuotes.forEach(element => {
        const myRow2 = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        td1.textContent = element.text;
        td2.textContent = element.category;
        myRow2.appendChild(td1);
        myRow2.appendChild(td2);
        myTable.appendChild(myRow2);
    });
    quoteDisplay.appendChild(myTable);
    localStorage.setItem("option", JSON.stringify(selectedCategory));
}