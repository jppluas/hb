document.addEventListener('DOMContentLoaded', () => {
    const keys = document.querySelectorAll('.key');
    const background = document.getElementById('background');
    const container = document.querySelector('.container');
    const piano = document.getElementById('piano');
    const imagePaths = [
        'images/20240504_113818.jpg',
        'images/20240505_231626.jpg',
        'images/IMG-20240504-WA0150.jpg',
        'images/20240430_014048.jpg',
        'images/IMG-20240509-WA0060.jpg',
        'images/20240503_173235.jpg',
        'images/20240504_121657.jpg',
        'images/IMG-20240503-WA0060.jpg',

    ];
    
    const posicionesx = [ -500, -300, -600, -270, -600, -300, -800, -800];
    const posicionesy = [ 20, 350, 550, 70, 300, 600, 20, 600];
    const audio = new Audio('hbsong.m4a');

    imagePaths.forEach((path, index) => {
        const img = document.createElement('img');
        img.src = path;
        img.style.width = 'auto'; // Mantener la relación de aspecto de la imagen
        img.style.height = 'auto'; // Establecer la altura de la imagen
        img.style.position = 'absolute';
        let x = posicionesx[index];	
        let y = posicionesy[index];
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        background.appendChild(img);

        // Mover la imagen cada 50 milisegundos
        setInterval(() => {
            x += 1;
            y += 0;
            if (x > window.innerWidth-240) {
                x = posicionesx[index] -100;
            }
            if (y > window.innerHeight) {
                y = 0;
            }
            img.style.left = `${x}px`;
            img.style.top = `${y}px`;
        }, 50);
    });

    const keyPositions = calculateKeyPositions();
    let delay = 0;
    keys.forEach((key, index) => {
        setTimeout(() => {
            key.style.top = '0';
            key.style.left = `${keyPositions[index]}px`;
            key.addEventListener('transitionend', () => {
                if (index === keys.length - 1) {
                    setTimeout(playHappyBirthdaySong, 1); // Esperar un segundo antes de comenzar la canción
                }
            });
        }, delay);
        delay += 200;
    });

    function calculateKeyPositions() {
        let positions = [];
        let currentPosition = 20;
        keys.forEach(key => {
            if (key.classList.contains('white')) {
                positions.push(currentPosition);
                currentPosition += 35; // Ancho de la tecla blanca con margen
            } else {
                positions.push(currentPosition - 2); // Posición ajustada para teclas negras
            }
        });
        return positions;
    }

    

    function playHappyBirthdaySong() {
        audio.play();
    }
});
