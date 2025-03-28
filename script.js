function openSidebar() {
    document.getElementById("sidebar").style.width = "250px";
}

function closeSidebar() {
    document.getElementById("sidebar").style.width = "0";
}

const questions = document.querySelectorAll('.question');
  questions.forEach(question => {
  question.addEventListener('click', () => {
  const answer = question.nextElementSibling;
                question.classList.toggle('active');
  answer.classList.toggle('show');
            });
        });