document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.transition-button');
    const departmentOptions = document.querySelectorAll('.dropdown-item');
    let index = 0;
    let timeoutId;

    function showButton() {
        buttons[index % buttons.length].style.display = 'block'; // Modulus operation ensures looping
        index++;
        timeoutId = setTimeout(hideButton, 3000); // 2 seconds delay
    }

    function hideButton() {
        buttons[(index - 1) % buttons.length].style.display = 'none'; // Modulus operation ensures looping
        showButton();
    }

    function stopTransition() {
        clearTimeout(timeoutId);
        const currentButton = buttons[(index - 1) % buttons.length];
        currentButton.style.animationPlayState = 'paused'; // Pause the animation
        currentButton.classList.add('full-opacity'); // Add class to set opacity to 100%
    }

    function resumeTransition() {
        const currentButton = buttons[(index - 1) % buttons.length];
        currentButton.style.animationPlayState = 'running'; // Resume the animation
        currentButton.classList.remove('full-opacity'); // Remove class to restore original opacity
        timeoutId = setTimeout(hideButton, 2000);
    }

    showButton();

    buttons.forEach(button => {
        button.addEventListener('click', function(event) {
            stopTransition(); // Stop transition on button click
            const department = event.target.dataset.department; // Get department value from button's data attribute
            localStorage.setItem('selectedDepartment', department); // Store department value in localStorage
            window.location.href = 'student_intro.html'; // Redirect to student intro page
        });
        button.addEventListener('mouseenter', stopTransition); // Pause transition on mouseenter
        button.addEventListener('mouseleave', resumeTransition); // Resume transition on mouseleave
    });

    departmentOptions.forEach(option => {
        option.addEventListener('click', function(event) {
            const department = event.target.dataset.department; // Get department value from option's data attribute
            localStorage.setItem('selectedDepartment', department); // Store department value in localStorage
            window.location.href = 'student_intro.html'; // Redirect to student intro page
        });
    });
});
