import { noop } from './noop'

export class TickTimer {
	public lastTick: number
	public nextTick: number
	private _tickCount: number = 0
	private started: boolean = false
	private paused: boolean = false
	
	// config keys
	public tickLength: number = 100


	constructor(
		private readonly onTick: () => void = noop,
		config: TickTimer,
		autostart: boolean = false
	) {
		Object.keys(config).forEach(key => {
			this[key] = config[key]
		})
		if (autostart) this.start()
	}

	public updateTickTimes(date?: Date) {
		this.lastTick = getTime(date)
		this.nextTick = getTime(date, this.tickLength)
	}

	private tryTick() {
		if (!this.nextTick) {
			this.updateTickTimes()
		} else if (!this.paused && getTime() > this.nextTick) {
			this._tickCount++
			this.onTick()
			this.updateTickTimes()
		}

		if (this.started) window.requestAnimationFrame(() => this.tryTick())
	}

	public start() {
		this.started = true
		this.tryTick()
	}

	public stop() {
		this.started = false
	}

	public pause() {
		this.paused = true
	}

	public resume() {
		this.paused = false
	}

	public get count() {
		return new Number(this._tickCount)
	}
}

export function getTime(date?: Date, offset?: number) {
	return Number(date || new Date()) + Number(offset || 0)
}
