let form = document.getElementById('add-form');
let items = document.getElementById('items');
let filter = document.getElementById('filter')

let myItemsArr = []

let listStored = JSON.parse(localStorage.getItem('itemsList'));

if(listStored){
    myItemsArr = listStored
    myItemsArr.forEach(el=>{
        let li = document.createElement("li");
        //Add class
        // li.classList.add("list-group-item")
        li.className = "list-group-item";
        // Add text Node woh input value
        li.appendChild(document.createTextNode(el));
    
        // Add delete btn
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete");
        deleteBtn.innerHTML = "&Cross;";
    
        //Append deleteBtn to li & li to items
        li.appendChild(deleteBtn);
        
    
        items.appendChild(li);
    })
}

// Form submit event

form.addEventListener('submit', addItem);

// Delete Items

items.addEventListener('click', deleteItem);

// Filter Items

filter.addEventListener("keyup", filterItems)

//Add Item

function addItem(e){
    e.preventDefault();

    //Get INput Value
    let newItem = document.querySelector(".control-2").value;
    if(!newItem) return;
    
    myItemsArr.push(newItem);

    localStorage.setItem('itemsList', JSON.stringify(myItemsArr))
    let storedLocally = localStorage.getItem('itemsList')

    console.log(storedLocally);
    
     
    // Create new Li Item
    let li = document.createElement("li");
    //Add class
    // li.classList.add("list-group-item")
    li.className = "list-group-item";
    // Add text Node woh input value
    li.appendChild(document.createTextNode(newItem));

    // Add delete btn
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.innerHTML = "&Cross;";

    //Append deleteBtn to li & li to items
    li.appendChild(deleteBtn);
    

    items.appendChild(li);
    document.querySelector(".control-2").value = ""

};

// Remove Items

function deleteItem(e){
    if(e.target.classList.contains("delete")){
        if(confirm("Are you Sure???")){
            let targetedItem = e.target.parentNode;
            console.log(targetedItem.firstChild)
            items.removeChild(targetedItem)
           
            let storedLocally2 = JSON.parse(localStorage.getItem('itemsList'))
            console.log(storedLocally2)
            let str = targetedItem.textContent
            let stored = storedLocally2.filter(el => el !== str.split('').splice(0, [str.length - 1]).join(''))
            
    
    console.log(stored)
    localStorage.setItem('itemsList', JSON.stringify(stored))
    

        }
    }
}

// Filter Items
function filterItems(e){
    //convert to lowercase
    let text = e.target.value.toLowerCase();
    let items2 = items.getElementsByTagName('li');
    // console.log(items2)
    //Convert to Array
    Array.from(items2).forEach(item => {
        // console.log(item.firstChild)
        let itemName = item.firstChild.textContent;
        if(itemName.toLowerCase().indexOf(text) != -1){
            item.style.display = 'grid';
        }else{
            item.style.display = 'none';
        }
    })
}


