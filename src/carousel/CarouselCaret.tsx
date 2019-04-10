/**
* Created by zhangqs on 2017-11-06
* 轮播器游标
*/

import * as React from 'react';
import { observer } from 'mobx-react';

export interface CarouselCaretProps {
    count: number
    style?: any
    onClick: (index: number)=>void;
    cur: number;
}

@observer
export default class CarouselCaret extends React.PureComponent<CarouselCaretProps, any> {
    render() {
        const { count, cur } = this.props;
        const carets = [];
        for (let i = 0; i < count; i++) {
            carets.push(this.renderCaret(i, i === cur));
        }

        return (
            <div className="carousel-caret">
                {carets}
            </div>
        );
    }

    renderCaret(index: number, isSelect: boolean) {
        const { style } = this.props;
        return (
            <span key={index} style={style} className={isSelect ? "cur item" : "item"} onClick={this.clickCaret.bind(this, index)}></span>
        );
    }

    clickCaret(index) {
        const { onClick } = this.props;
        onClick && onClick(index);
    }


}

