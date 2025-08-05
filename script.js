document.addEventListener('DOMContentLoaded', function () {

    // --- Lógica de Interatividade do Quiz ---
    const quizOptions = document.querySelectorAll('.quiz-options li');

    quizOptions.forEach(option => {
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
                // Opcional: Mostra a resposta correta se o usuário errar
                const correctOption = questionDiv.querySelector('li[data-correct="true"]');
                if (correctOption) {
                    correctOption.classList.add('correct');
                }
            }
        });
    });

    // --- Lógica para Navegação com Caneta de Apresentação / Teclado ---
    const slides = document.querySelectorAll('.slide');

    document.addEventListener('keydown', function (event) {
        // Verifica as teclas para "Próximo Slide" (Seta Direita, Page Down)
        if (event.key === 'ArrowRight' || event.key === 'PageDown') {
            event.preventDefault(); // Previne a rolagem padrão do navegador
            const currentScroll = window.scrollY;

            for (const slide of slides) {
                // Encontra o primeiro slide que está abaixo da posição atual da tela
                if (slide.offsetTop > currentScroll + 5) { // +5 é uma pequena margem de tolerância
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