const dino = document.querySelector ('.dino');
const background = document.querySelector ('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

// Lidar com o keyup
// (https://keycode.info/) 32 é a tecla espaço 
function handleKeyUp (event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump ();
        }
    }
}
// Resposavel pelo pulo do Dino
function jump () {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 250) // Para de subir 
        { 
            clearInterval (upInterval);
            
            // Descendo

            let downInterval = setInterval (() => {
                if (position <= 0) {
                    clearInterval (downInterval);
                    isJumping = false;

                } else {
                    position -= 20; 
                    dino.style.bottom = position + 'px';
                }
            } , 30); // Velocidade com que o Dino sobe ou desce. Será executado a cada 20 Milessegundos 
            } else {

            // Subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 30);

}

function createCactus () {
    const cactus = document.createElement ('div');
    let cactusPosition = 1100;
    let randomTime = Math.random() * 6000; // Gera número aleatório e multiplica por 6000. Gera novo cactus

    if (isGameOver) return;

    cactus.classList.add ('cactus');
    background.appendChild (cactus);
    cactus.style.left = cactusPosition + 'px';

    let leftTimer = setInterval (() => {
        if (cactusPosition < -80) // 80 é a largura do cactus 
        {
            //Saiu da tela
            clearInterval (leftTimer);
            background.removeChild (cactus);
        } else  if (cactusPosition > 0 && cactusPosition < 80 && position < 80) {
             //Game over
             clearInterval (leftTimer);
             isGameOver = true;
             document.body.innerHTML = '<h1 class="game-over"> Fim do Jogo </h1>';
         } else {
             cactusPosition -= 5; // Velocidade do cactus
             cactus.style.left = cactusPosition + 'px';
         }
    }, 20);

    setTimeout (createCactus, randomTime);
}

createCactus();
document.addEventListener ('keyup', handleKeyUp);