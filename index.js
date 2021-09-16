let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const deletIptBtn = document.getElementById("delete-ipt-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

deletIptBtn.addEventListener("dblclick",function(){
    let remove=inputEl.value
    for (var i = 0; i < myLeads.length; i++) {
        if (myLeads[i] === remove || i==remove) {
            var spliced = myLeads.splice(i, 1);
        }
    }
    render(myLeads)
    inputEl.value = ""
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})

// document.querySelector('#txtSearch').addEventListener('keypress', function () {
//     if (inputEl.value === 'Enter') {
//       // code for enter
//       myLeads.push(inputEl.value)
//       inputEl.value = ""
//       localStorage.setItem("myLeads", JSON.stringify(myLeads) )
//       render(myLeads)
//     }
// });
document.addEventListener("keypress", function() {

    if(inputEl.value==="Enter"||inputEl.value===13)
    {
        myLeads.push(inputEl.value)
        inputEl.value = ""
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    }
  
  });