/**
* Created by zhangqs on 2017-11-06
* 轮播器基本组成
*/

import * as React from 'react';
import { jumpPage } from "../../routers/index";

export interface CarouselItemProps {
  src: string
  alt?: string
  link?: string
  style?: any
}

export default class CarouselItem extends React.PureComponent<CarouselItemProps, any> {
  render() {
    const { src, alt, link, style } = this.props;
    if (link === "jumpToPage:intelligent-select-edit") {
      return (
        <div className="carousel-item" style={style} onClick={this.onClick.bind(this)}>
          <img src={src} alt={alt} />
        </div>
      )
    } else {
      return (
        <div className="carousel-item" style={style}>
          <a href={link} target="_blank">
            <img src={src} alt={alt} />
          </a>
        </div>
      );
    }
  }

  onClick() {
    jumpPage(this.getPath(this.props.link));
  }

  getPath(jumpPage: string) {
    const index = jumpPage.indexOf(":");
    const path = jumpPage.slice(index + 1).trim();
    return path
  }
}
