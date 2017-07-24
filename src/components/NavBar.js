import React from 'react';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.center();
    }

    render() {
        let className = (this.props.isCenter ? 'is-active' : '');
        let spanWords = '正';
        if(this.props.isCenter && this.props.reverse) {
            spanWords = '反';
        }
        
        return (
            <span className={className} onClick={this.handleClick}>{spanWords}</span>
        )
    }
}