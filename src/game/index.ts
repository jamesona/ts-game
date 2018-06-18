import { Renderable } from '../app'
export class Game implements Renderable {
	public initialized: boolean = false

	public init() {
		this.initialized = true
	}

	public render() {
		
	}
}
