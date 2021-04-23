document.addEventListener('DOMContentLoaded', () => {
     getTasksAsync();
});

//GET fetch ///////////////////

getTasksAsync = async function () {

    const response = await fetch('/api/todo', {
        method: 'GET',
        headers:
        {
            'Accept': 'application/json'
        }
    })
    var data = await response.json();
    //console.log(data);
    showTasks(data);

};

//Show tasks//////////////
    
    function showTasks(data) {
      

        const ulList = document.querySelector('#myUL');

        for (var i = 0; i < data.length; i++) {


            const liItem = document.createElement('li');

            liItem.dataset.id = data[i].id;
            liItem.innerHTML = 'Title:' + data[i].title;
            ulList.appendChild(liItem);


            const buttonDelete = document.createElement('button');
            buttonDelete.id = data[i].id;
            buttonDelete.innerText = "Delete this task";
            liItem.appendChild(buttonDelete);
            let temp = liItem.dataset.id;
            buttonDelete.setAttribute('class', 'btn');
            buttonDelete.addEventListener('click', () => deleteItemAsync(temp));

            const buttonUpdate = document.createElement('button');
            buttonUpdate.id = data[i].id;
            buttonUpdate.innerText = "Change this task";
            liItem.appendChild(buttonUpdate);
            buttonUpdate.setAttribute('class', 'btn');
            buttonUpdate.addEventListener('click', (temp, Item) => updateItemAsync(temp,Item));

        }
        
    }

////////////////////////////
function ToDoItem(title) {
    this.Id = 0;
    this.Title = title;
    this.Checked = false;


}

function StorageInMemory() {
    var _itemList = new Array();

    function getItems() {
        return _itemList;
    }
}

///////////////////////////////
// POST 

var addButton = document.getElementById('addButton');
var form = document.getElementById('myForm');
form.addEventListener('submit', (item) => insertItemAsync(item));


insertItemAsync = function (item) {
    event.preventDefault();

    const newTitle = document.querySelector('#myInput').value;


        return fetch('/api/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                title: newTitle,
                closed: false
            })
        })
            .then(res => res.json())
            .then(data => {
                const dataArr = [];
                dataArr.push(data);
                showTasks(dataArr);
              
            });

   
    }
///////////////////////////
//DELETE
deleteItemAsync = function (Id) {

    fetch('/api/todo/' + Id, {
        method: 'DELETE',

    }).then(() => location.reload());
        
};

getItemAsync = function (Id) {

    fetch('/api/todo/' + Id, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => console.log(data));


}
//////////////////////////
//UPDATE
updateItemAsync = function (Id, Item) {
    var liItem = document.getElementsByTagName('li');
    //liItem.contentEditable = true;
    fetch('/api/todo/' + Id, {

        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'PUT',
        body: JSON.stringify(Item)
    })
        .then(response => response.json())
        .then(data => console.log(data))


    
}
/////////////////
var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);


/*
function ShowTasks(task) {
    const taskLi = document.createElement('li');
    taskLi.dataset.id = task.id;
    taskLi.innerHTML = `<p>${task.title}</p>`
    tasks.appendChild(taskLi);

    const buttonDelete = document.createElement('button');
    buttonDelete.dataset.id = task.id;
    buttonDelete.setAttribute("id", `delete-button-${task.id}`)
    buttonDelete.innerText = "Delete this task";
    tasks.appendChild(buttonDelete);
    buttonDelete.addEventListener('click', () => deleteTask(task));

}
*/

/*
function StorageRemoteXhr() {

    this.getItems = function () {

        var items;
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log('o.k.');
                    console.log(xhr.responseText);
                    // ...
                } else {
                    console.log('error occured!');
                    // handling error
                }

            }
        }

        xhr.open('GET', '/api/todo', false);
        xhr2.setRequestHeader("Content-Type", "application/json");
        xhr.send();

        items = xhr.responseText;

        return JSON.parse(items);
    }
}

function StorageSetItems(Item) {
        var xhr2 = new XMLHttpRequest();

        var newTask = document.getElementById('myInput').value;
        var newItem = {
            "title": newTask,
            "closed": false
        };

        xhr2.onreadystatechange = function () {
            if (xhr2.readyState === 4) {
                if (xhr2.status === 200) {
                    console.log('o.k.');
                    console.log(xhr2.responseText);
                    // ...
                } else {
                    console.log('error occured!');
                    // handling error
                }

            }
        }
        xhr2.open('POST', '/api/todo', false);
        xhr2.send(JSON.stringify(Item));
        return Item;

    }
*/







