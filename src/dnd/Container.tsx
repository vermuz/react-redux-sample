import * as React from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Card from './Card'
import {List} from 'immutable'
import {RouteComponentProps} from 'react-router';

interface ICard {
  id: number,
  text: string
}

interface State {
  cards: ICard[]
}

class Container extends React.Component<RouteComponentProps<any>, State> {
  state: State
  constructor(props: RouteComponentProps<any>) {
    super(props)
    this.moveCard = this.moveCard.bind(this)
    const cards: ICard[] = [{
      id: 1,
      text: 'Write a cool JS library',
    }, {
      id: 2,
      text: 'Make it generic enough',
    }, {
      id: 3,
      text: 'Write README',
    }, {
      id: 4,
      text: 'Create some examples',
    }, {
      id: 5,
      text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
    }, {
      id: 6,
      text: '???',
    }, {
      id: 7,
      text: 'PROFIT',
    }]
    this.state = {cards: cards}
  }

  moveCard(dragIndex: number, hoverIndex: number) {
    const targetList = List<ICard>(this.state.cards)
    const target = targetList.get(dragIndex)
    if (!target) return
    const newCards = targetList.remove(dragIndex).insert(hoverIndex, target)
    this.setState(Object.assign({}, this.state, {cards: newCards}))
  }

  render() {
    const { cards } = this.state;
    return (
      <div style={{width: 400}}>
        {cards.map((card: ICard, i: number) => (
          <Card
            key={card.id}
            index={i}
            id={card.id}
            text={card.text}
            moveCard={this.moveCard}
          />
        ))}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Container)
