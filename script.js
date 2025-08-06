document.addEventListener('DOMContentLoaded', function () {

    // --- LÓGICA DO QUIZ E MODAL (JÁ EXISTENTE) ---

    const modal = document.getElementById('feedback-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.querySelector('.modal-close-btn');

    function closeModal() {
        if (modal) modal.style.display = 'none';
    }
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            closeModal();
        }
    });

    function showFeedbackModal(tipText) {
        if (modalBody) modalBody.textContent = tipText;
        if (modal) modal.style.display = 'block';
    }

    const allQuizOptions = document.querySelectorAll('.quiz-options li');
    allQuizOptions.forEach(option => {
        option.addEventListener('click', function () {
            const questionDiv = this.closest('.quiz-question');
            if (questionDiv.classList.contains('answered')) return;

            questionDiv.classList.add('answered');
            const isCorrect = this.getAttribute('data-correct') === 'true';

            if (isCorrect) {
                this.classList.add('correct');
            } else {
                this.classList.add('incorrect');
                const correctOption = questionDiv.querySelector('li[data-correct="true"]');
                if (correctOption) correctOption.classList.add('correct');

                const tipText = questionDiv.getAttribute('data-tip');
                if (tipText) showFeedbackModal(tipText);
            }
        });
    });

    const summaryButton = document.querySelector('.summary-button');
    if (summaryButton) {
        summaryButton.addEventListener('click', function () {
            const container = this.closest('.quiz-container');
            const questions = container.querySelectorAll('.quiz-question');
            let allAnswered = true;
            questions.forEach(q => {
                if (!q.classList.contains('answered')) allAnswered = false;
            });

            if (!allAnswered) {
                alert('Por favor, responda todas as perguntas antes de ver o resumo final.');
                return;
            }

            let correctCount = 0;
            questions.forEach(q => {
                const selectedCorrect = q.querySelector('li.correct.answered');
                if (selectedCorrect && selectedCorrect.getAttribute('data-correct') === 'true') {
                    correctCount++;
                }
            });

            const totalQuestions = questions.length;
            const summaryContent = container.querySelector('.summary-content');
            summaryContent.innerHTML = `<p>Você acertou <strong>${correctCount} de ${totalQuestions}</strong> questões.</p>`;
            container.querySelector('.quiz-summary').style.display = 'block';
            this.style.display = 'none';
        });
    }

    // --- NOVA LÓGICA PARA NAVEGAÇÃO COM CANETA DE APRESENTAÇÃO / TECLADO ---

    const slides = document.querySelectorAll('.slide');

    document.addEventListener('keydown', function (event) {
        // Verifica as teclas para "Próximo Slide" (Seta Direita, Page Down)
        if (event.key === 'ArrowRight' || event.key === 'PageDown') {
            event.preventDefault(); // Previne a rolagem padrão do navegador
            const currentScroll = window.scrollY;

            for (const slide of slides) {
                // Encontra o primeiro slide que está abaixo da posição atual da tela
                if (slide.offsetTop > currentScroll + 5) { // +5 é uma pequena margem
                    window.scrollTo({
                        top: slide.offsetTop,
                        behavior: 'smooth'
                    });
                    break; // Para a busca após encontrar o próximo slide
                }
            }
        }

        // Verifica as teclas para "Slide Anterior" (Seta Esquerda, Page Up)
        if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
            event.preventDefault(); // Previne a rolagem padrão do navegador
            const currentScroll = window.scrollY;

            // Itera de trás para frente para encontrar o slide anterior
            for (let i = slides.length - 1; i >= 0; i--) {
                const slide = slides[i];
                // Encontra o primeiro slide que está acima da posição atual da tela
                if (slide.offsetTop < currentScroll - 5) {
                    window.scrollTo({
                        top: slide.offsetTop,
                        behavior: 'smooth'
                    });
                    break; // Para a busca após encontrar o slide anterior
                }
            }
        }
    });

});