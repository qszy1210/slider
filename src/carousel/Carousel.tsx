/**
* Created by zhangqs on 2017-11-06
* 轮播器组件
*/

import * as React from 'react';
import CarouselItem from './CarouselItem';
import './Carousel.scss';
import { observable } from 'mobx/lib/mobx';
import { observer } from 'mobx-react';
import { autobind } from 'core-decorators';
import CarouselCaret from './CarouselCaret';

export interface CarouselProps {
    items: {src: string, alt?: string}[], //图片信息
    speed?: number, //每张图片切换时间
    delay?: number, //切换时候延迟时间
    isPauseWhenHover?: boolean,//hover是否自动停止
    autoplay?: boolean, //是否自动轮播
    showCaret?: boolean, //是否显示标志
    isShowArrows?: boolean //是否显示箭头, 左右两边的切换按钮 TODO
    isInFinite?: boolean;//是否无限轮播 TODO
}

@observer
@autobind
export default class Carousel extends React.Component<CarouselProps, any> {
    @observable
    cur: number = 0;
  render() {
      const {items = [], autoplay, speed, showCaret} = this.props;
      const containerStyle = {
          width: items.length * 100 + "%",
          left: "-" + (this.cur * 100) + "%",
          transitionDuration: speed || 300
      };
    return (
        <div className="carousel">
            <div className="carousel-container" style={containerStyle} onMouseOver={this.stop} onMouseOut={this.play}>
                {
                    items.map((item, index) => {
                        item["width"] = (100 / items.length) + "%";
                        return <CarouselItem {...item} key={index}></CarouselItem>
                    })
                }
            </div>
            {showCaret ?
            <CarouselCaret count={items.length} onClick={this.clickCaret} cur={this.cur}></CarouselCaret>
            : null
            }


      </div>
    );
  }

  intervalHandler: any;

  componentDidMount() {
    this.play();
  }

  play() {
      if (this.props.autoplay) {
          this.intervalHandler = window.setTimeout(() => {
              this.next(1);
              this.play();
          }, this.props.delay || 6000);
      }
  }

  stop() {
    this.intervalHandler && window.clearTimeout(this.intervalHandler);
  }

  next(step: number) {
    this.change(this.cur + step);
  }

  clickCaret(index: number) {
      this.change(index);
  }

  private change(index: number) {
    const { items = [] } = this.props;
    this.cur = (index) % (items.length || 1);
  }

  componentWillUnmount() {
    this.stop();
  }
}
