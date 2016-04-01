import React from 'react'

export default class Feedback extends React.Component {
  render () {
    const { user, data, feedback, idx, submit } = this.props

    console.log('props in feedbac', this.props);

    const word = feedback.reduce((acc, word) =>
      acc || word.id == idx && word.tag, false)

    return (
      <div id="feedback-component">
        <form className="feedback-form" onSubmit={ (e) => {
          e.preventDefault()
          submit(user, data, this.refs.feedbackInfo.value)
          this.refs.feedbackInfo.value = ''
        }}>
          <input
            type="text"
            ref='feedbackInfo'
            placeholder={ word || 'feedback' }
            className="feedback-input"
          />
        </form>
      </div>
    )
  }
}

export default Feedback
