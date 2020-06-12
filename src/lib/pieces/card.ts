export enum UnicodeCardSuits {
	spades = 'U+1F0A',
	hearts = 'U+1F0B',
	diamonds = 'U+1F0C',
	clubs = 'U+1F0D'
}

export const CARD_VALUES = ['1','2','3','4','5','6','7','8','9','10','11','12','13']

export const cardBack = 'U+1F0A0'

function unicodeToEntity(entity) {
	return `&#x${entity.replace(/(U\+?)?/, '')};`
}

export class Card {
	public faceUp: boolean = false

	constructor(private readonly _value, public readonly suit) {}

	public get unicode() {
		return UnicodeCardSuits[this.suit] + (this._value > 11 ? this._value + 1 : this._value).toString(16)
	}

	public flip() {
		this.faceUp = !this.faceUp
	}

	public display() {
		if (this.faceUp)
			return '<span>' + unicodeToEntity(this.unicode) + '</span>'
		else
			return '<span>' + unicodeToEntity(cardBack) + '</span>'
	}

	get value() {
		if (this._value < 11) return this._value
		else return 10
	}
}
