// SOUNDS
var myGunshot = new Audio('http://dev.pascalou.co.uk/shooter/audio/laser_sound.m4a');
var ennemyFalling = new Audio('http://dev.pascalou.co.uk/shooter/audio/thud.m4a');
var ennemyGunshot = new Audio('http://dev.pascalou.co.uk/shooter/audio/laser_sound.m4a');
ennemyGunshot.volume = 0.4;

// SOME ESSENTIAL VARIABLES
const gameFrame = document.querySelector("#gameFrame");

var myLifePoints = 100;

function livingEnnemies() {
	return document.querySelectorAll(".ennemy:not(.dead)");
}


// ENNEMY SHOOTS ME
function ennemyShootsMe(ennemy) {
	if(ennemy) {
		ennemy.classList.add("showing");
		setTimeout(function() {
			if(!ennemy.classList.contains("dead")) {
				ennemyGunshot.play();
				ennemy.classList.add("shooting");
				gameFrame.classList.add("ennemyShooting");
				updateLifePoints(myLifePoints-20);
				setTimeout(function() {
					ennemy.classList.remove("shooting");
					gameFrame.classList.remove("ennemyShooting");
					setTimeout(function() {
						ennemy.classList.remove("showing");
					}, 150);
				}, 500);
			}
		}, 800);
	}
}

// ELEMENT OF SURPRISE
function randomEnnemyShots() {

	if(myLifePoints > 0) {

		if(livingEnnemies()) {
			var randomEnnemy = Math.floor(Math.random() * livingEnnemies().length);
			var randomDelay = Math.floor(Math.random() * 2000) + 1000;

			setTimeout(function() {
				if(myLifePoints > 0) {
					ennemyShootsMe(livingEnnemies()[randomEnnemy]);
					randomEnnemyShots();					
				}
			}, randomDelay);
		}

	}

}


// DAMAGE AND DEATH
function updateLifePoints(amount) {
	myLifePoints = amount;
	if(myLifePoints < 1) {
		myLifePoints = 0;
		setTimeout(function() {
			if(livingEnnemies().length) {
				gameFrame.classList.add("playerDead");
			}
		}, 500);
	}
	document.getElementById("healthBar").style.width = myLifePoints+"%";
}


// I SHOOT THE ENNEMIES
function iShoot(ennemy) {

	/* Consequences on the ennemies */
	ennemy.classList.remove("shooting");
	ennemy.classList.add("dead");
	ennemyFalling.play();					

	/* Victory! */
	if(!livingEnnemies().length) {
		setTimeout(function() {
			gameFrame.classList.add("playerWon");
		}, 300);
	}
}

// VISUAL AND SOUND EFFECTS WHEN I SHOOT
function myShootingEffects() {
	myGunshot.play();
	gameFrame.classList.add("playerShooting");
	setTimeout(function() {
		gameFrame.classList.remove("playerShooting");
	}, 150);
}


// GETTING THE GAME READY
function newGame() {

	document.querySelectorAll(".ennemy").forEach(ennemy => {
		ennemy.classList = ["ennemy"];			
	});

	updateLifePoints(100);
	gameFrame.classList = [];

	setTimeout(function() {
		randomEnnemyShots();
	}, 3000);

}


livingEnnemies().forEach(ennemy => {

	ennemy.addEventListener("click", function() {
		iShoot(ennemy);
	});

});