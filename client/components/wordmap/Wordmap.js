import React from 'react';
import ReactBubbleChart from './ReactBubbleChart'

const tooltipProps = [{
  css: 'tooltip',
  prop: 'value',
  display: 'Likes'
}]

export default class Wordmap extends React.Component {
  render () {
    let { tile, media, dictionary, userId, submitInput, children } = this.props
    let data = media.feedback && media.feedback.map((word, i) => ({
      _id: word.tag,
      value: word.count,
      colorValue: i,
      selected: word.id === media.user_feedback_id
    }))

    let { media_id } = media;

    return (
      <div className="wordmap-component">
        <ReactBubbleChart
          data={data}
          selectedColor="white"
          selectedTextColor="rgba(0, 0, 0, 0.75)"
          fixedDomain={{ min: -1, max: 1 }}
          onClick={({_id}) => submitInput(userId, media_id, _id, 'tap')}
          legend={false}
          legendSpacing={0}
          tooltip={true}
          tooltipProps={tooltipProps}
          tooltipFunc={() => {}}
          fontSizeFactor={0.5}
          duration={0}
          delay={0}
        />
        {children}
      </div>
    )
  }
}

export default Wordmap
