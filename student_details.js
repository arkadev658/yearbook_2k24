document.addEventListener("DOMContentLoaded", function() {
  // Get the elements where you want to display the student details and comments
  const studentNameElement = document.getElementById("studentName");
  const studentImageElement = document.getElementById("studentImage");
  const studentBioElement = document.getElementById("studentBio")
  const studentProfileElement = document.getElementById("studentProfile")
  const studentCommentsElement = document.getElementById("studentComments");

  // Retrieve the stored name, image, bio, and profile from localStorage
  const selectedStudentName = localStorage.getItem('selectedStudentName');
  const selectedStudentImage = localStorage.getItem('selectedStudentImage');
  const selectedStudentBio = localStorage.getItem('selectedStudentBio');
  const selectedStudentProfile = localStorage.getItem('selectedStudentProfile');

  // Set the retrieved name, image, bio, and profile to the corresponding elements
  if (selectedStudentName && selectedStudentImage && selectedStudentBio && selectedStudentProfile) {
      studentNameElement.textContent = selectedStudentName;
      studentBioElement.textContent = selectedStudentBio;
      studentProfileElement.href = selectedStudentProfile;
      studentImageElement.src = selectedStudentImage;
      studentImageElement.alt = selectedStudentName;

      // Fetch comments from CSV file
      fetch('comments.csv')
          .then(response => response.text())
          .then(data => {
              const rows = data.split('\n').slice(1); // Exclude header row

              // Filter comments for the selected student
              const studentComments = rows.filter(row => {
                  const columns = row.split(',');
                  return columns.length >= 6 && columns[3].trim() === selectedStudentName;
              });

              // Generate HTML for each comment and append to studentCommentsElement
              studentComments.forEach(comment => {
                  const columns = comment.split(',');
                  const commentText = columns[4].trim();
                  const commenterName = columns[0].trim();

                  const commentBox = document.createElement('div');
                  commentBox.classList.add('comment-box');

                  const commentTextElement = document.createElement('p');
                  commentTextElement.textContent = commentText;
                  const commenterNameElement = document.createElement('p');
                  commenterNameElement.textContent = "-" + commenterName;
                  commenterNameElement.classList.add('commenter-name')

                  // Append elements to comment box
                  commentBox.appendChild(commentTextElement);
                  commentBox.appendChild(commenterNameElement);
                  

                  studentCommentsElement.appendChild(commentBox);
              });
          })
          .catch(error => {
              console.error('Error fetching comments:', error);
          });
  } else {
      // If there's no stored data, handle accordingly (e.g., redirect or display a message)
      console.error('No student data found.');
      // Example: Redirect to homepage
      // window.location.href = 'index.html';
  }
});
