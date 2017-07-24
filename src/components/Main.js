require('normalize.css/normalize.css');
require('../styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';

import ImgFrame from './ImgFrame';
import NavBar from './NavBar';

let imgdata = require('../sources/imgData.json');

imgdata = (function getImgUrl(imgdataArr) {
  for (let i = 0, j = imgdataArr.length; i < j; i++) {
    let singleData = imgdataArr[i];
    singleData.url = require('../images/' + singleData.filename);
    imgdataArr[i] = singleData;
  }
  return imgdataArr;
})(imgdata);


function getRandom(l, g) {
  return Math.floor(Math.random() * (g - l) + l);
}



class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.posRange = {
      c: [0, 0],
      t: [0, 0, 0, 0],
      l: [0, 0, 0, 0],
      r: [0, 0, 0, 0]
    }
    this.state = {
      reverse: false,
      center: 0,
      pos: [
        // {
        //   left: 0,
        //   top: 0,
        //   transform: rotate(30deg);
        // }
      ]
    }
    this.initPostion = this.initPostion.bind(this);
    this.center = this.center.bind(this);
  }
  componentDidMount() {
    let stageDom = ReactDOM.findDOMNode(this.refs.stage),
      imgDom = ReactDOM.findDOMNode(this.refs.img0),
      stageW = stageDom.scrollWidth,
      stageH = stageDom.scrollHeight,
      imgW = imgDom.scrollWidth;

    this.posRange.c = [stageW / 2 - imgW / 2, stageH / 2 - imgW / 3];
    this.posRange.t = [-imgW / 3, stageW * 2 / 3 - imgW, stageH / 2 - imgW * 4 / 3, stageW / 3];
    this.posRange.l = [-imgW / 3, stageW / 3 - imgW, imgW / 3, -imgW / 3];
    this.posRange.r = [-imgW / 3, stageW - imgW * 2 / 3, imgW / 3, stageW * 2 / 3];

    let cIndex = getRandom(0, 6);

    this.initPostion(cIndex);
  }

  initPostion(cIndex = 0) {
    let posArr = [];
    for (let i = 0, j = imgdata.length, k = 0; i < j; i++) {
      let deg = getRandom(-30, 30);
      if (cIndex == i) {
        posArr[i] = {
          left: this.posRange.c[0],
          top: this.posRange.c[1]
        };
        continue;
      }

      if (k < j / 3) {
        posArr[i] = {
          left: getRandom(this.posRange.l[3], this.posRange.l[1]),
          top: getRandom(this.posRange.l[0], this.posRange.l[2]),
          transform: 'rotate(' + deg + 'deg)'
        }
      }
      if (k >= j / 3 && k < j * 2 / 3 - 1) {
        posArr[i] = {
          left: getRandom(this.posRange.t[3], this.posRange.t[1]),
          top: getRandom(this.posRange.t[0], this.posRange.t[2]),
          transform: 'rotate(' + deg + 'deg)'
        }
      }
      if (k >= j * 2 / 3 - 1) {
        posArr[i] = {
          left: getRandom(this.posRange.r[3], this.posRange.r[1]),
          top: getRandom(this.posRange.r[0], this.posRange.r[2]),
          transform: 'rotate(' + deg + 'deg)'
        }
      }
      k++;
    }

    this.setState({
      reverse: false,
      center: cIndex,
      pos: posArr
    })
  }

  reverse() {
    this.setState({
      reverse: !this.state.reverse
    })
  }

  center(cIndex) {
    if (cIndex == this.state.center) {
      return function (){
        this.reverse()
      }.bind(this);
    }
    return function () {
      this.initPostion(cIndex);
    }.bind(this);
  }

  render() {
    let imgDomArr = [],
      navBtnArr = [];

    imgdata.forEach(function (item, index) {
      imgDomArr.push(
        <ImgFrame url={item.url}
          title={item.title}
          pos={this.state.pos[index]}
          key={'img' + index}
          ref={'img' + index}
          isCenter={this.state.center == index}
          center={this.center(index)}
          reverse={this.state.reverse}
          scrible={item.scrible}
        />
      )
      navBtnArr.push(
        <NavBar key={'span' + index}
                isCenter={this.state.center == index}
                center={this.center(index)}
                reverse={this.state.reverse}
                 />
      )
    }, this);

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgDomArr}
        </section>
        <nav className="ctrl-nav">
          {navBtnArr}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
