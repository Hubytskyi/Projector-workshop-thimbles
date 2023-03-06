'use strict';

// 12. Workshop - THIMBLES

// змінні кнопок
const playBtn = document.querySelector('#playButton');
const thimb0 = document.getElementById('cup0');
const thimb1 = document.getElementById('cup1');
const thimb2 = document.getElementById('cup2');

// слухач подій для кнопки PLAY
playBtn.addEventListener('click', startGame);

// слухач подій для першого наперстка
thimb0.addEventListener('click', () => {
	selectThimb('cup0');
});

// слухач подій для другого наперстка
thimb1.addEventListener('click', () => {
	selectThimb('cup1');
});

// слухач подій для третього наперстка
thimb2.addEventListener('click', () => {
	selectThimb('cup2');
});

// id інтервала
let mix;
// змінна яка відповідає за кількість перетасовувань
let counter = 0;
// позиція наперстка під яким знаходить м'яч
let winning;

// функція яка запускає гру
function startGame() {
	// показати де наш м'яч
	showBall();
	// запустити анімацію для юзера і зміну положення м'ячика
	setTimeout(pickRandomThimb, 1000)
}

function showBall() {
	// заблокувати натискання на кнопку
	playBtn.style.display = 'none';
	// визначимо випадкове початкове положення
	winning = getRandomNumber();

	// визначимо відповідний наперсток
	const thimb = document.getElementById(`cup${winning}`);
	const ball = document.getElementById('thimbleBall');
	// поставимо міячик у відповідне місце
	ball.classList.add(`thimbleBallPosition${winning}`);
	// покажемо положення м'ячика під вказаним наперстком
	thimb.classList.add('thimbleUp');

	// через проміжок часу опустимо наперсток
	setTimeout(() => {
		thimb.classList.remove('thimbleUp');
	}, 500);

	// через проміжок часу приберемо мячик зі сторінки (візуально)
	setTimeout(() => {
		ball.classList.remove(`thimbleBallPosition${winning}`);
	}, 1000);

}

// допоміжна функція для визначення випадкового індексу
function getRandomNumber() {
	const random = Math.floor(Math.random() * 3)
	return random;
}

// функція яка з певним тактом перемішує наперстки
function pickRandomThimb() {
	mix = setInterval(shuffling, 500);
}

// функція перемішування наперстків
function shuffling() {
	// визначили два випадкові індекси для напрестків
	const thimbOne = getRandomNumber(); // 0
	const thimbTwo = getRandomNumber(); // 1

	// коли це різні наперстки - то запускаємо логіку зміни їх положення
	if (thimbOne !== thimbTwo) {
		// визначили випадкові наперстки 
		const thimbOneElement = document.getElementById(`cup${thimbOne}`);
		const thimbTwoElement = document.getElementById(`cup${thimbTwo}`);

		// отримуємо доступ до їх класів
		const thimbOneClass = thimbOneElement.getAttribute('class');
		const thimbTwoClass = thimbTwoElement.getAttribute('class');

		// міняємо місцями їхні класи - таким чином запуститься анімація з css-класів яка відповідає за transition 
		thimbOneElement.setAttribute('class', thimbTwoClass);
		thimbTwoElement.setAttribute('class', thimbOneClass);

		// відслідкувати чи був один з цих наперстків з мячиком
		if ([thimbOne, thimbTwo].includes(winning)) {
			// і якщо так - оновлюємо інформації про положення м'ячика
			winning = thimbOne === winning ? thimbTwo : thimbOne;

			// 1 (winning) = 0 === 1 то ми записуємо в winning 1, інакше 0
			// winning = 1 - if thimbOne === 1 то записуємо 0, інакше 1
		}

		// оновлюємо лічильник маніпуляцій 
		counter++;

		// по досягненню певного значення кількості маніпуляцій - зупиняємо маніпуляції
		if (counter > 10) {
			clearInterval(mix);
			// розблоковуємо наперстки
			removeDisabled();
			// скидуємо лічильник в початкое значення
			counter = 0;
		}
		
	} else {
		// коли це один і той самий наперсток - перезапускаємо функцію 
		shuffling()
	}
}

// функція яка блокує доступ до всіх наперстків
function addDisabled() {
	const thimbBtns = document.querySelectorAll('.sewingThimble');
	thimbBtns.forEach((btn) => {
		btn.setAttribute('disabled');
	})
}

// функція яка повертає доступ до всіх наперстків
function removeDisabled() {
	const thimbBtns = document.querySelectorAll('.sewingThimble');
	thimbBtns.forEach((btn) => {
		btn.removeAttribute('disabled');
	})
}

// функція відкривання наперстка
function selectThimb(thimbId) {
	// блокуємо кліки по всіх наперстках
	addDisabled();
	// знаходимо наперсток по якому клікнув юзер
	const selectedThimb = document.getElementById(thimbId);
	//  і під яким знаходиться мячик
	const winningThimb = document.getElementById(`cup${winning}`);
	// знайдемо мячик
	const ball = document.getElementById('thimbleBall');
	// і поставимо його під наперсток де він має знаходитись
	ball.classList.add(`thimbleBallPosition${winning}`)
	// піднімаємо клікнутий юзером наперсток		
	selectedThimb.classList.add('thimbleUp');

	// через певрний проміжок часу повертаємо все до стартового положення
	setTimeout(() => {
		alert(`Winner is # ${winning}`);
		selectedThimb.classList.remove('thimbleUp');
		playBtn.style.display = 'block';
		ball.classList.remove(`thimbleBallPosition${winning}`);
		resetThimbClass();
	}, 500)
}

// функція яка повертає наперстки у стартове положення
function resetThimbClass() {
	thimb0.setAttribute('class', 'sewingThimble thimble0');
	thimb1.setAttribute('class', 'sewingThimble thimble1');
	thimb2.setAttribute('class', 'sewingThimble thimble2');
}