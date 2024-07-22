const myQuotes = [
    { text: "First quote", category: "1" },
    { text: "Second quote", category: "2" },
    { text: "Third quote", category: "3" },
    { text: "Fourth quote", category: "4" },
    { text: "fith quote", category: "5" }
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuote = document.getElementById("newQuote");

//event-listeners
newQuote.addEventListener("click", showRandomQuote);

//function to display a random quote
function showRandomQuote() {
    // console.log(myQuotes[Math.floor(Math.random() * myQuotes.length)]);
    quoteDisplay.textContent = myQuotes[Math.floor(Math.random() * myQuotes.length)].text;
}


//function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText");
    const newQuoteCategory = document.getElementById("newQuoteCategory");
    isValid = true;
    const newArr = { text: "", category: "" };
    if (newQuoteText.value.trim() === "" || newQuoteCategory.value.trim() === "") {
        isValid = false;
    }
    if (isValid) {
        newArr.text = newQuoteText.value.trim();
        newArr.category = newQuoteCategory.value.trim();
        quoteDisplay.textContent = newArr.text;
        myQuotes.push(newArr);
        newQuoteText.value = "";
        newQuoteCategory.value = "";
    } else {
        alert("Please! Enter something");
    }

}