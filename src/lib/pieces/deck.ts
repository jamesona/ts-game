import { Card } from "./card";

export class Deck {
	public turn = 0
	public cards: Card[]
	public cardsInUse: Card[] = []
	public readonly element = document.createElement('div')
	public players: any[]

	constructor(players) {
		const spades = Array(13).fill(null).map((v, i) => new Card(i+1, 'spades'))
		const hearts = Array(13).fill(null).map((v, i) => new Card(i+1, 'hearts'))
		const clubs = Array(13).fill(null).map((v, i) => new Card(i+1, 'clubs'))
		const diamonds = Array(13).fill(null).map((v, i) => new Card(i+1, 'diamonds'))

		this.cards = [...spades, ...hearts, ...clubs, ...diamonds]
		this.shuffle()

		this.element.id = 'deck'
		this.element.classList.add('card')
		this.element.classList.add('blue')
		this.element.innerHTML = '<span>&#x1F0A0;</span>'

		this.players = players
		this.element.onclick = this.deal.bind(this)
	}

	shuffle() {
		const cardsToPlace = [...this.cards, ...this.cardsInUse]
		this.cards = []
		this.cardsInUse = []
		while (cardsToPlace.length > 0) {
			const cardsLeft = cardsToPlace.length
			const indexToRemove = randomNumber(cardsLeft)
			const card = cardsToPlace.splice(indexToRemove, 1)[0]
			this.cards.push(card)
		}
	}

	draw() {
		const card = this.cards.pop()
		this.cardsInUse.push(card)
		return card
	}

	deal() {
		const dealTo = this.turn % this.players.length
		this.players[dealTo].drawCard(this)
		this.turn++
		console.log(this.players[dealTo].hand)
	}
}
