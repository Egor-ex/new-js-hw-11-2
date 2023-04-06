const refs = {
	startBtn: document.querySelector('button[data-action-start]'),
	stopBtn: document.querySelector('button[data-action-stop]'),

	daysRef: document.querySelector('[data-value="days"]'),
	hoursRef: document.querySelector('[data-value="hours"]'),
	minsRef: document.querySelector('[data-value="mins"]'),
	secsRef: document.querySelector('[data-value="secs"]'),
};

/////////////-------- js Class
class CountdownTimer {
	constructor({ onTick, targetDate }) {
		this.intervalId = null;
		this.isActive = false;
		this.onTick = onTick;
		this.targetDate = targetDate;
	}

	start() {
		if (this.isActive) {
			return;
		}

		this.isActive = true;

		this.intervalId = setInterval(() => {
			const currentTime = Date.now();

			const deltaTime = this.targetDate - currentTime;
			const time = this.getTimesComponents(deltaTime);

			this.onTick(time);
			console.log(time);
		}, 1000);
	}

	stop() {
		clearInterval(this.intervalId);
		this.isActive = false;
		const time = this.getTimesComponents(0); // сброс таймера 00:00:00:00
		this.onTick(time);
	}

	// Формулы расчета сколько милисекунд в : дняч, часах, минутах, секндах
	getTimesComponents(time) {
		/*
		 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
		 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
		 */
		const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));

		/*
		 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
		 * остатка % и делим его на количество миллисекунд в одном часе
		 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
		 */
		const hours = this.pad(
			Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
		);

		/*
		 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
		 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
		 */
		const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

		/*
		 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
		 * миллисекунд в одной секунде (1000)
		 */
		const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

		return { days, hours, mins, secs };
	}

	// Добавляет 0 к числу для формата 00:00:00:00
	// если число двух значное 0 не добавляется
	pad(value) {
		return String(value).padStart(2, '0');
	}
}
// Параметры таймера
const timer = new CountdownTimer({
	onTick: updateClockface,
	selector: '#timer-1',
	targetDate: new Date('Oct 24, 2025'),
});

// Слушатели события кнопок стоп и старт
refs.startBtn.addEventListener('click', timer.start.bind(timer));
refs.stopBtn.addEventListener('click', timer.stop.bind(timer));

// Обновляет таймер в html
function updateClockface({ days, hours, mins, secs }) {
	refs.daysRef.textContent = `${days}`;
	refs.hoursRef.textContent = `${hours}`;
	refs.minsRef.textContent = `${mins}`;
	refs.secsRef.textContent = `${secs}`;
}

// ///////////-------    Js - секундомер

// const timer = {
// 	intervalId: null,
// 	isActive: false,

// 	start() {
// 		if (this.isActive) {
// 			return;
// 		}

// 		const targetDate = new Date('Nov 21, 2023');
// 		// const startTime = Date.now();
// 		this.isActive = true;

// 		this.intervalId = setInterval(() => {
// 			const currentTime = Date.now();

// 			// const deltaTime = currentTime - startTime;
// 			const deltaTime = targetDate - currentTime;
// 			const time = getTimesComponents(deltaTime);

// 			updateClockface(time);
// 			console.log(time);
// 		}, 1000);
// 	},

// 	stop() {
// 		clearInterval(this.intervalId);
// 		this.isActive = false;

// 		refs.daysRef.textContent = `${0}${0}`;
// 		refs.hoursRef.textContent = `${0}${0}`;
// 		refs.minsRef.textContent = `${0}${0}`;
// 		refs.secsRef.textContent = `${0}${0}`;
// 	},
// };

// refs.startBtn.addEventListener('click', () => {
// 	timer.start();
// });

// refs.stopBtn.addEventListener('click', () => {
// 	timer.stop();
// });

// function updateClockface({ days, hours, mins, secs }) {
// 	refs.daysRef.textContent = `${days}`;
// 	refs.hoursRef.textContent = `${hours}`;
// 	refs.minsRef.textContent = `${mins}`;
// 	refs.secsRef.textContent = `${secs}`;
// }

// function pad(value) {
// 	return String(value).padStart(2, '0');
// }

// // Для подсчета значений используй следующие готовые формулы,
// // где time - разница между targetDate и текущей датой.

// function getTimesComponents(time) {
// 	/*
// 	 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
// 	 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
// 	 */
// 	const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));

// 	/*
// 	 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
// 	 * остатка % и делим его на количество миллисекунд в одном часе
// 	 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
// 	 */
// 	const hours = pad(
// 		Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
// 	);

// 	/*
// 	 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
// 	 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
// 	 */
// 	const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

// 	/*
// 	 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
// 	 * миллисекунд в одной секунде (1000)
// 	 */
// 	const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

// 	return { days, hours, mins, secs };
// }
