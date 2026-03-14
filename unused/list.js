
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');
    const token_disp = document.getElementById('token_display');
    const clearButton = document.getElementById('resetButton');
    const clearAllButton = document.getElementById('reset-allButton');

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
                    playerData.tokens += 1
                }
                else{
                    playerData.tokens -= 1
                }
                token_disp.textContent = playerData.tokens
                // add to some sort of tracker of tasks completed during a pomo
            });

            function handleKeydown(event) {
            if (event.key === "Backspace") {
                taskList.removeChild(li);
                document.removeEventListener("keydown", handleKeydown);
            }
            }

            li.addEventListener("mouseenter", () => {
                document.addEventListener("keydown", handleKeydown);
            });

            li.addEventListener("mouseleave", () => {
                document.removeEventListener("keydown", handleKeydown);
            });

            // Make the task draggable
            li.draggable = true;
            li.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', Array.from(taskList.children).indexOf(li));
            });
            li.addEventListener('dragover', (e) => {
                e.preventDefault();
            });
            li.addEventListener('drop', (e) => {
                e.preventDefault();
                const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
                const draggedElement = taskList.children[draggedIndex];
                const targetElement = e.target.closest('li');
                if (draggedElement && targetElement && draggedElement !== targetElement) {
                    const targetIndex = Array.from(taskList.children).indexOf(targetElement);
                    if (draggedIndex < targetIndex) {
                        taskList.insertBefore(draggedElement, targetElement.nextSibling);
                    } else {
                        taskList.insertBefore(draggedElement, targetElement);
                    }
                }
            });
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

    clearAllButton.addEventListener('click',
        function clear_all(){
            to_remove = []
            for(const child of taskList.children){
                to_remove.push(child)
            }
            for (const child of to_remove) {
                taskList.removeChild(child);
            }
            
        }

    )

})


// add button to clear toggled tasks