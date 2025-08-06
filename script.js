document.addEventListener('DOMContentLoaded', function () {

    const allQuizOptions = document.querySelectorAll('.quiz-options li');

    allQuizOptions.forEach(option => {
        option.addEventListener('click', function () {
            const questionDiv = this.closest('.quiz-question');

            if (questionDiv.classList.contains('answered')) {
                return;
            }
            questionDiv.classList.add('answered');

            const isCorrect = this.getAttribute('data-correct') === 'true';

            // Limpa feedbacks anteriores da mesma questão, caso existam
            const existingFeedback = questionDiv.querySelector('.feedback-tip');
            if (existingFeedback) {
                existingFeedback.remove();
            }

            if (isCorrect) {
                this.classList.add('correct');
            } else {
                this.classList.add('incorrect');
                const correctOption = questionDiv.querySelector('li[data-correct="true"]');
                if (correctOption) {
                    correctOption.classList.add('correct');
                }

                // **NOVA LÓGICA: MOSTRA O FEEDBACK IMEDIATO**
                const tipText = questionDiv.getAttribute('data-tip');
                if (tipText) {
                    const feedbackDiv = document.createElement('div');
                    feedbackDiv.className = 'feedback-tip';
                    feedbackDiv.innerHTML = `<strong>Dica:</strong> ${tipText}`;
                    questionDiv.appendChild(feedbackDiv);
                }
            }
        });
    });

    // Lógica para o botão de resumo final
    const summaryButton = document.querySelector('.summary-button');
    if (summaryButton) {
        summaryButton.addEventListener('click', function () {
            const container = this.closest('.quiz-container');
            const questions = container.querySelectorAll('.quiz-question');
            const summaryArea = container.querySelector('.quiz-summary');
            const summaryContent = container.querySelector('.summary-content');

            let allAnswered = true;
            questions.forEach(q => {
                if (!q.classList.contains('answered')) {
                    allAnswered = false;
                }
            });

            if (!allAnswered) {
                alert('Por favor, responda todas as perguntas antes de ver o resumo final.');
                return;
            }

            let correctCount = container.querySelectorAll('li.correct.answered').length;
            let totalQuestions = questions.length;
            let summaryHTML = `<p>Você acertou <strong>${correctCount} de ${totalQuestions}</strong> questões.</p>`;

            summaryContent.innerHTML = summaryHTML;
            summaryArea.style.display = 'block';
            this.style.display = 'none'; // Esconde o botão após clicar
        });
    }
});