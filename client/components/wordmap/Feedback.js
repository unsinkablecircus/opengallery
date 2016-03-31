import React from 'react'

export default class Feedback extends React.Component {
  render () {
    const { user, data, submit } = this.props
    return (
      <div id="feedback-component">
        <form onSubmit={ (e) => {
          e.preventDefault()
          submit(user, data, this.refs.feedbackInfo.value)
        }}>
          <input type="text" className="feedback-input" ref='feedbackInfo'/>
        </form>
      </div>
    )
  }
}

export default Feedback
