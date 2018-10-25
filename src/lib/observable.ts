export class Observable<T> {
	static of<T>(subject: T): Observable<T> {
		return new Observable((observer: Observer<T>) => {
			observer.next(subject)
			observer.complete()
		})
	}
	static from<T>(subject: any): Observable<T> {
		return new Observable((observer: Observer<T>) => {
			if (isIterable<T>(subject)) {
				for (const value of subject) observer.next(value)
			} else if (hasForEach(subject)) {
				subject.forEach(value => observer.next(value))
			} else {
				throw new TypeError(`${subject} is not iterable`)
			}
			observer.complete()
		})
	}

	private readonly subscribers: Map<ObserverHandler<T>, Observer<T>>
	constructor(public readonly source: ObservableSource<T>) {}

	public subscribe(handler: ObserverHandler<T>): ObservableSubscription {
		const complete = () => {
			this.subscribers.delete(handler)
		}
		const observer = new Observer(handler, complete)
		this.subscribers.set(handler, observer)
		this.source(observer)
		return {
			unsubscribe: complete
		}
	}
}

export type ObserverHandler<T> = (d: T) => void

export class Observer<T> {
	constructor(
		public readonly next: ObserverHandler<T>,
		public readonly complete: () => void
	) {}
}

export type ObservableSource<T> = (o: Observer<T>) => void

export interface ObservableSubscription {
	unsubscribe: () => void
}

export function isIterable<T>(t: any): t is Iterable<T> {
	if (t == null) return false
	return typeof t[Symbol.iterator] === 'function'
}

export interface HasForEach<T> {
	forEach: Function
}

export function hasForEach<T>(t: any): t is HasForEach<T> {
	if (t == null) return false
	return typeof t['forEach'] === 'function'
}
