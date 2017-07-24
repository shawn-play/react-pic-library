import React from 'react';

export default class ImgFrame extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.center();
  }

  render() {
    let styleObj = {};
    if (this.props.pos) {
      styleObj = this.props.pos;
    }
    let figureClass = 'img-figure';
    if(this.props.isCenter && this.props.reverse) {
      figureClass += ' figure-reverse';
    }
    return (
      <figure className={figureClass}
        style={styleObj}
        onClick={this.handleClick}
      >
        <img src={this.props.url} alt={this.props.title} />
        <figcaption>
          <h2 className="img-title">{this.props.title}</h2>
          <div className="img-scrible" onClick={this.handleClick}>{this.props.scrible}</div>
        </figcaption>
      </figure>
    )
  }
}