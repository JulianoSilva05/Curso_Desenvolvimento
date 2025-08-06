document.addEventListener('DOMContentLoaded', function () {

    // --- Lógica de Interatividade do Quiz ---
    const quizContainers = document.querySelectorAll('.quiz-container');

    quizContainers.forEach(container => {
        const options = container.querySelectorAll('.quiz-options li');
        const summaryButton = container.querySelector('.summary-button');
        const summaryArea = container.querySelector('.quiz-summary');
        const summaryContent = container.querySelector('.summary-content');

        options.forEach(option => {
            option.addEventListener('click', function () {
                const questionDiv = this.closest('.quiz-question');
                // Impede que a mesma questão seja respondida várias vezes
                if (questionDiv.classList.contains('answered')) {
                    return;
                }
                questionDiv.classList.add('answered');

                const isCorrect = this.getAttribute('data-correct') === 'true';

                if (isCorrect) {
                    this.classList.add('correct');
                } else {
                    this.classList.add('incorrect');
                    // Mostra a resposta correta se o usuário errar
                    const correctOption = questionDiv.querySelector('li[data-correct="true"]');
                    if (correctOption) {
                        correctOption.classList.add('correct');
                    }
                }
            });
        });

        // Lógica para o botão de resumo
        if (summaryButton) {
            summaryButton.addEventListener('click', function () {
                const questions = container.querySelectorAll('.quiz-question');
                let summaryHTML = '<ul>';
                let allAnswered = true;

                questions.forEach((q, index) => {
                    // Verifica se todas as perguntas foram respondidas
                    if (!q.classList.contains('answered')) {
                        allAnswered = false;
                    }

                    const questionText = q.querySelector('p').textContent;
                    const incorrectOption = q.querySelector('li.incorrect');
                    const correctOption = q.querySelector('li.correct');
                    const studyTip = q.getAttribute('data-tip');

                    summaryHTML += `<li><strong>Questão ${index + 1}:</strong> ${questionText}<br>`;

                    // Monta o resumo com base na resposta
                    if (incorrectOption) { // Se o usuário errou
                        summaryHTML += `<span class="summary-incorrect">Sua resposta estava incorreta.</span><br>`;
                        summaryHTML += `<strong>Dica de Estudo:</strong> ${studyTip}`;
                    } else if (correctOption && q.classList.contains('answered')) { // Se acertou
                        summaryHTML += `<span class="summary-correct">Você acertou! Parabéns!</span>`;
                    } else { // Se não respondeu
                        summaryHTML += `<span class="summary-neutral">Você ainda não respondeu esta questão.</span>`;
                    }
                    summaryHTML += '</li>';
                });

                // Alerta se alguma questão não foi respondida
                if (!allAnswered) {
                    alert('Por favor, responda todas as perguntas antes de ver o resumo.');
                    return;
                }

                // Exibe o resumo
                summaryHTML += '</ul>';
                summaryContent.innerHTML = summaryHTML;
                summaryArea.style.display = 'block';
                summaryButton.style.display = 'none'; // Esconde o botão após clicar
            });
        }
    });
});