function openSidebar() {
    document.getElementById("sidebar").style.width = "250px";
}

function closeSidebar() {
    document.getElementById("sidebar").style.width = "0";
}

function toggleAnswer(clickedElement) {
    // Tutup semua jawaban yang sedang terbuka kecuali yang diklik
    const allQuestions = document.querySelectorAll('.question');
    allQuestions.forEach((question) => {
        if (question !== clickedElement) {
            question.classList.remove('active');
            const otherAnswer = question.nextElementSibling;
            otherAnswer.classList.remove('show');
        }
    });

    // Toggle jawaban yang diklik
    const currentAnswer = clickedElement.nextElementSibling;
    clickedElement.classList.toggle('active');
    currentAnswer.classList.toggle('show');
}
        
