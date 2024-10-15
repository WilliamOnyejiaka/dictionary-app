import Module from "./module.js";

document.addEventListener("DOMContentLoaded",() => {

    const searchBtn = document.querySelector("#search-btn");
    const historyBtn = document.querySelector("#history-btn");
    const clearBtn = document.querySelector("#clear-btn");

    searchBtn.addEventListener("click", Module.displayResult);
    historyBtn.addEventListener("click", Module.displayHistory);
    clearBtn.addEventListener("click", Module.clearHistory);

    document.querySelector("#wordInput").addEventListener("keydown", (event) =>{
        if (event.key === "Enter" || event.keyCode === 13){
            searchBtn.click();
        }
    });
}); 