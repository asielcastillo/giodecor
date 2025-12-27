document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica do Slideshow de Fundo ---
    // Seleciona todas as imagens dentro do contêiner do slideshow de fundo
    const images = document.querySelectorAll('#background-slideshow img');
    let currentIndex = 0; // Índice da imagem atualmente exibida
    const fadeDuration = 1500; // Duração da transição (fade) em milissegundos (1.5 segundos)
    const displayDuration = 5000; // Duração que cada imagem fica visível em milissegundos (5 segundos)

    // Função para mostrar uma imagem específica e esconder as outras
    function showImage(index) {
        images.forEach((img, i) => {
            if (i === index) {
                img.classList.add('active'); // Adiciona a classe 'active' para torná-la visível
            } else {
                img.classList.remove('active'); // Remove a classe 'active' das outras imagens
            }
        });
    }

    // Função para avançar para a próxima imagem no slideshow
    function nextImage() {
        // Remove 'active' da imagem atual, permitindo que a transição CSS de fade ocorra
        images[currentIndex].classList.remove('active');
        // Calcula o índice da próxima imagem (volta para 0 se for a última)
        currentIndex = (currentIndex + 1) % images.length;
        // Pequeno atraso para garantir que a classe 'active' seja removida antes de adicionar à próxima
        setTimeout(() => {
            showImage(currentIndex);
        }, 50); 
    }

    // Inicializa o slideshow se houver imagens
    if (images.length > 0) {
        showImage(currentIndex); // Mostra a primeira imagem imediatamente
        // Configura um intervalo para trocar de imagem periodicamente
        setInterval(nextImage, displayDuration + fadeDuration);
    }

    // --- Lógica de Animação ao Scroll (Intersection Observer) ---
    // Seleciona todos os elementos que têm a classe 'animate-on-scroll'
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    // Opções para o Intersection Observer
    const observerOptions = {
        root: null, // 'null' significa que o elemento será observado em relação à viewport (janela do navegador)
        rootMargin: '0px', // Margem em torno do root. '0px' significa que a detecção começa na borda da viewport.
        threshold: 0.1 // Um elemento é considerado visível quando 10% dele está dentro da viewport
    };

    // Cria uma nova instância do Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        // Percorre todas as 'entries' (elementos observados) que tiveram sua visibilidade alterada
        entries.forEach(entry => {
            // Se o elemento está visível (intersecção com o root)
            if (entry.isIntersecting) {
                // Adiciona a classe 'is-visible' para acionar a animação definida no CSS
                entry.target.classList.add('is-visible');
                // Para que a animação ocorra apenas uma vez, paramos de observar este elemento
                observer.unobserve(entry.target);
            } 
            /*
            // Se você quisesse que os elementos desaparecessem ao sair da tela, poderia usar um 'else' aqui:
            else {
                entry.target.classList.remove('is-visible');
            }
            */
        });
    }, observerOptions); // Passa as opções para o observador

    // Inicia a observação de cada elemento selecionado
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});
