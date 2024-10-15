
export default class Module {

    static #setHistory(item) {
        localStorage.setItem("history", JSON.stringify(item));
    }

    static #getCurrentDate(){
        const date = new Date();
        const timeString = date.toTimeString().split(" ")[0];
        const dateString = date.toDateString();
        return `${timeString} ${dateString}` ;
    }

    static #saveWord(word) {
        const words = JSON.parse(localStorage.getItem("history"));
        const date = Module.#getCurrentDate();
        word = word + " - " + date;
        if (words) {
            words.push(word);
            Module.#setHistory(words);
        } else {
            Module.#setHistory([word]);
        }
    }

    static #getWords() {
        const words = JSON.parse(localStorage.getItem("history")) ?? "Search history is empty.";
        return words;
    }

    static #create(word) {
        const h6 = document.createElement('h6');
        h6.textContent = word;
        document.querySelector("#historyContentBody").append(h6);
    }

    static #clearHistoryContentBody() {
        document.querySelector("#historyContentBody").innerHTML = "";
    }

    static clearHistory(event){
        localStorage.removeItem("history");
        Module.#clearHistoryContentBody();
        Module.#create("Search history is empty.");
    }

    static displayHistory(event) {
        Module.#clearHistoryContentBody();
        const words = Module.#getWords();
        if (Array.isArray(words)){
            words.forEach(word => {
                Module.#create(word);
            });
        }else {
            Module.#create(words);
        }
        
    }

    static async #search(word) {
        const url = "./dictionary.json";
        const fetchData = await fetch(url);
        const data = await fetchData.json();
        return data[word];
    }


    static async displayResult(event) {
        const word = (document.querySelector("#wordInput")).value;
        const searchResult = await Module.#search(word.toLowerCase());
        document.querySelector("#searchContentLabel").textContent = searchResult ? word : "Not Found";
        document.querySelector("#searchContentBody").textContent = searchResult ?? "Word was not found.";

        if (searchResult) {
            Module.#saveWord(word);
        }
    }
}