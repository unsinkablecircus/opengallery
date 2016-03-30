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
    let data = media.feedback.map((tag, i) => ({
      _id: tag.word,
      value: tag.count,
      colorValue: i,
      selected: tag.id === media.user_feedback_id
    }))

    let { mediaId } = media;

    return (
      <div className="wordmap-component">
        <ReactBubbleChart
          data={data}
          selectedColor="white"
          selectedTextColor="rgba(0, 0, 0, 0.75)"
          fixedDomain={{ min: -1, max: 1 }}
          onClick={({_id}) => { submitInput(userId, mediaId, _id) }}
          legend={false}
          legendSpacing={0}
          tooltip={true}
          tooltipProps={tooltipProps}
          tooltipFunc={() => {}}
          fontSizeFactor={0.5}
          duration={250}
          delay={1}
        />
        {children}
      </div>
    )
  }
}

export default Wordmap
