<script lang="ts">
	import { randInt } from '$lib/util';
	import { onMount } from 'svelte';

	export let a;
	export let b;

	const min = 5;
	const max = 100;

	function setEquation() {
		a = randInt(min, max);
		b = randInt(min, max);
	}
	let answer;
	let score = 0;

	let fault = 0;
	onMount(() => {
		startTimer();
		setEquation();
	});

	type TimerEntry<T> = {
		startTime: Date;
		stopTime: Date;
		info: T;
	};
	class Timer<T> {
		times: TimerEntry<T>[] = [];

		currentTimer: { startTime: Date } | null = null;

		startTimer() {
			if (this.currentTimer)
				throw new Error('timer already started ' + JSON.stringify(this.currentTimer));
			this.currentTimer = { startTime: new Date() };
		}

		stopTimer(value: T) {
			if (!this.currentTimer) throw new Error('timer not started');

			const entry = { ...this.currentTimer, stopTime: new Date(), info: value } as TimerEntry<T>;
			this.currentTimer = null;
			this.times = [...this.times, entry];
			this.callTimer();
		}

		listeners: (() => void)[] = [];
		onTimer(listener: () => void) {
			this.listeners.push(listener);
		}
		callTimer() {
			this.listeners.forEach((func) => func());
		}
	}

	const timer = new Timer();
	let answered = 0;
	timer.onTimer(() => {
		answered += 1;
	});
	function startTimer() {
		return timer.startTimer();
	}

	function stopTimer<T>(value: T) {
		return timer.stopTimer(value);
	}
	function checkAnswer() {

		stopTimer({ a, b, type: 'add', answer });
		if (answer === a + b) {
			setEquation();
			score += 1;
		} else {
			fault += 1;
			setEquation();
		}

		startTimer();

		answer = undefined;
	}

	function getSeconds(timer: TimerEntry<unknown>) {
		return (timer.stopTime.getTime() - timer.startTime.getTime()) / 1000;
	}

	$: answered, (timer.times = timer.times);
</script>

<div>answered {answered}</div>
<div>Average time = {timer.times.reduce((prev, curr) => {return prev + getSeconds(curr)}, 0) / timer.times.length}s</div>
<p>Ration {(score / answered) * 100} %</p>
<div>{a} + {b} = <input type="number" bind:value={answer} on:change={checkAnswer} /></div>

<div class='flex flex-col-reverse'>
	{#each timer.times as timeEntry}
		<div class:bg-red-400={timeEntry.info.a + timeEntry.info.b !== timeEntry.info.answer}>
			<p>
				{getSeconds(timeEntry)}s
			</p>
			<p >
				{timeEntry.info.a} + {timeEntry.info.b} = {timeEntry.info.b + timeEntry.info.a} = {timeEntry.info.answer}
			</p>
		</div>
	{/each}
</div>
