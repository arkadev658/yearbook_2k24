document.addEventListener("DOMContentLoaded", function() {
  const imageContainer = document.getElementById("image-container");
  const searchInput = document.getElementById("searchInput");

  // Fetch the CSV file
  fetch('students.csv')
    .then(response => response.text())
    .then(data => {
      // Parse CSV data
      const rows = data.split('\n').slice(1); // Remove header row

      rows.forEach(row => {
        const columns = row.split(',');
        if (columns.length >= 3) { // Check if there are at least 3 columns
          const name = columns[0].trim();
          const image = columns[1].trim();
          const department = columns[2].trim(); // Extract department information
          const bio= columns[3].trim()
          const profile=columns[4].trim()
          const detailsPageUrl = "student_details.html"; // Your details page URL

          // Create image element
          const img = document.createElement("img");
          img.src = image;
          img.alt = name;

          // Create name element
          const nameElement = document.createElement("p");
          nameElement.textContent = name;
          nameElement.classList.add("student-name");

          // Create card container
          const card = document.createElement("div");
          card.classList.add("card");

          // Append the image and name elements to the card container
          card.appendChild(img);
          card.appendChild(nameElement);

          // Add click event listener to the card
          card.addEventListener("click", function() {
          // Store the name and image in localStorage
            localStorage.setItem('selectedStudentName', name);
            localStorage.setItem('selectedStudentImage', image);
            localStorage.setItem('selectedStudentBio',bio)
            localStorage.setItem("selectedStudentProfile",profile)
            window.location.href = detailsPageUrl; // Redirect to details page
          });

          const target=localStorage.getItem('selectedDepartment')

          // Append card to the image container only if the department matches
          if (department === localStorage.getItem('selectedDepartment')) {
            imageContainer.appendChild(card);
          }

          // Add click event listener to the card
          card.addEventListener("click", function() {
            window.location.href = detailsPageUrl; // Redirect to details page
          });
        }
      });

      // Function to handle search
      function searchNames() {
        const filter = searchInput.value.toUpperCase();
        const cards = imageContainer.getElementsByClassName("card");
        Array.from(cards).forEach(card => {
          const name = card.querySelector(".student-name").textContent.toUpperCase();
          if (name.includes(filter)) {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        });
      }

      // Attach search event listener to the input field for live search
      searchInput.addEventListener("keyup", searchNames);
    })
    .catch(error => console.error('Error fetching CSV:', error));
});
