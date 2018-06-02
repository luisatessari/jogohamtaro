// Funcao para retornar um valor randomico 
function randomNumber (start, end) { return Phaser.Math.Between(start, end) }
function random (array) { return array[Math.floor(Math.random() * array.length)] }

const preload = function () {

    // Carrega os recursos de imagens para o jogo
    this.load.atlas('hamtaro_atlas', 'assets/sprites/hamtaro/hamham.png', 'assets/sprites/maps/hamtaro.json')
    this.load.atlas('comida_atlas', 'assets/sprites/assest/food.png', 'assets/sprites/maps/food.json')

}


function create () {

	this.score = 0;

    // Adiciona um texto para informar o score a jogadora
    pontuacao = this.add.text(10, 10, 'SCORE: 0', { 
        fontFamily: 'Arial', 
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0d2432'
    }) 

    cursors = this.input.keyboard.createCursorKeys()
   hamtaro = this.physics.add.sprite(150, 150, 'hamtaro_atlas')


    this.anims.create({ 
        key: 'direita', 
        frames: this.anims.generateFrameNames('hamtaro_atlas', { 
            prefix: 'hamtaro_', 
            start: 1,
            end: 3            
        }),
        repeat: -1,
        duration: 300
    });

    this.anims.create({ 
        key: 'esquerda', 
        frames: this.anims.generateFrameNames('hamtaro_atlas', { 
            prefix: 'hamtaro_', 
            start: 4,
            end: 6            
        }),
        repeat: -1,
        duration: 300
    });

	this.anims.create({ 
        key: 'cima', 
        frames: this.anims.generateFrameNames('hamtaro_atlas', { 
            prefix: 'hamtaro_', 
            start: 7,
            end: 8            
        }),
        repeat: -1,
        duration: 300
    });
	this.anims.create({ 
        key: 'baixo', 
        frames: this.anims.generateFrameNames('hamtaro_atlas', { 
            prefix: 'hamtaro_', 
            start: 9,
            end: 10            
        }),
        repeat: -1,
        duration: 300
    });
	this.anims.create({ 
        key: 'parado', 
        frames: this.anims.generateFrameNames('hamtaro_atlas', { 
            prefix: 'hamtaro_', 
            start: 11,
            end: 12            
        }),
        repeat: -1,
        duration: 300
    });

    // Cria um sprite de comida
    comida = this.physics.add.sprite(10, 60, 'comida_atlas', 'sprite92');
    //informa que o hamtaro e a comida
    this.physics.add.collider(hamtaro, comida)    

	// Cria o evento que acontecera quando o hamtaro colidir com uma comida
	this.physics.add.overlap(hamtaro, comida, function(){
		this.score += 3
		pontuacao.setText(`SCORE: ${this.score}`)

	// Escolhe randomicamente a nova posicao da comida
        comida.x = randomNumber(50, window.innerWidth - 50)
        comida.y = randomNumber(50, window.innerHeight - 50)

        // Cada numero indica uma imagem para uma comida diferente
        let number = [92, 88, 87, 86, 85, 81, 78, 77, 76]

        // Escolhe um numero da lista acima 
        number = random(number)

        // Troca a imagem da comida de acordo com o numero escolhido
        comida.setTexture('comida_atlas', `sprite${number}`)

    }, null, this);
  }

function update () {
	if (cursors.left.isDown) {
        hamtaro.x -= 3
        hamtaro.anims.play('esquerda', true)
    } else if (cursors.right.isDown) {
        hamtaro.x += 3
        hamtaro.anims.play('direita', true)
    } else if (cursors.up.isDown) {
        hamtaro.y -= 2
        hamtaro.anims.play('cima', true)
    } else if (cursors.down.isDown) {
        hamtaro.y += 2
        hamtaro.anims.play('baixo', true)
	} else {
		hamtaro.anims.play('parado', true)
	}
}


function principal() {

    var largura = window.innerWidth
    var altura = window.innerWidth

    // cria uma variável com as configurações do jogo
    var conf = {
        type: Phaser.AUTO,
        width: largura,
        height: altura,
        pixelArt: true,
        backgroundColor: '#cfcdf5',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 }
            }
        },
     scene: {
        preload: preload,
        create: create,
        update: update
    }
    }
    var game = new Phaser.Game(conf)
}

// funcao de carregar as imagens e outros recursos
window.onload = principal