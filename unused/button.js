
const openBtn = document.getElementById('openModal');
const backbtn = document.getElementById('backbtn');
const modal = document.getElementById('modal');

const gachaBtn = document.getElementById('Gacha');
const backbtn2 = document.getElementById('backbtn2');
const starmodal = document.getElementById('starmodal');

const inventoryBtn = document.getElementById('Inventory');
const backbtn3 = document.getElementById('backbtn3');
const inventorymodal = document.getElementById('inventorymodal');

openBtn.addEventListener('click', () => {modal.classList.add('open');});
backbtn.addEventListener('click', () => {modal.classList.remove('open');}); 
gachaBtn.addEventListener('click', () => {starmodal.classList.add('open');});

backbtn2.addEventListener('click', () => {starmodal.classList.remove('open');});
inventoryBtn.addEventListener('click', () => {inventorymodal.classList.add('open');});
backbtn3.addEventListener('click', () => {inventorymodal.classList.remove('open');});

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            // Create a new list item element
            const li = document.createElement('li');
            li.innerHTML = taskText; // Add the task text to the list item

            // Append the new list item to the unordered list
            taskList.appendChild(li);

            // Clear the input field after adding the task
            taskInput.value = '';

             // Add click listener to toggle completion
            li.addEventListener("click", function() {
                li.classList.toggle("completed");
            });

            // Append to the list
            taskList.appendChild(li);

            // Clear the input field
            taskInput.value = "";
        } else {
            alert('Please enter a task!');
        }
    }

    // Add event listener to the "Add" button for click events
    addButton.addEventListener('click', addTask);

    // Add event listener to the input field for the "Enter" key press
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});
