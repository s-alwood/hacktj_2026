let tokens = 0
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');
    const token_disp = document.getElementById('token_display');
    const clearButton = document.getElementById('resetButton');

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            // Create a new list item element

            // i want to somehow wrap the element into a javascript class
            const li = document.createElement('li');
            li.innerHTML = taskText; // Add the task text to the list item

            // Append the new list item to the unordered list
            taskList.appendChild(li);

            // Clear the input field after adding the task
            taskInput.value = '';

             // Add click listener to toggle completion
            li.addEventListener("click", function() {
                li.classList.toggle("completed");
                if(li.classList.contains('completed')){
                    tokens += 1
                }
                else{
                    tokens -= 1
                }
                token_disp.textContent = tokens
                // add to some sort of tracker of tasks completed during a pomo
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
    })

    clearButton.addEventListener('click',
        function clear_completed(){
            to_remove = []
            for(const child of taskList.children){
                if(child.classList.contains('completed')){
                    to_remove.push(child)
                    //taskList.removeChild(child);
                }
            }
            for (const child of to_remove) {
                taskList.removeChild(child);
            }
            
        }

    )

})


// add button to clear toggled tasks