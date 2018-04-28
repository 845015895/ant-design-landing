import React from 'react';
import { Button, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import BannerAnim, { Element } from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import './index.less';

const BgElement = Element.BgElement;
class Banner extends React.Component {
  render() {
    const { ...props } = this.props;
    const { dataSource, isMobile } = props;
    delete props.dataSource;
    delete props.isMobile;
    const childrenToRender = dataSource.BannerAnim.children.map((item, i) => {
      const elem = item.BannerElement;
      const elemClassName = elem.className;
      delete elem.className;
      const bg = item.bg;
      const textWrapper = item.textWrapper;
      const title = item.title;
      const content = item.content;
      const button = item.button;
      const follow = !isMobile ? {
        delay: 1000,
        minMove: 0.1,
        data: [
          {
            id: `bg${i}`, value: 15, bgPosition: '50%', type: ['backgroundPositionX'],
          },
          { id: `wrapperBlock${i}`, value: -15, type: 'x' },
        ],
      } : null;
      return (
        <Element
          key={i.toString()}
          followParallax={follow}
          {...elem}
          prefixCls={elemClassName}
        >
          <BgElement
            key="bg"
            {...bg}
            id={`bg${i}`}
            scrollParallax={{ y: 100 }}
          />
          <QueueAnim
            type={['bottom', 'top']}
            delay={200}
            key="text"
            {...textWrapper}
            id={`wrapperBlock${i}`}
          >
            <div
              key="logo"
              {...title}
              /* replace-start */
              data-edit="text,image"
            /* replace-end */
            >
              {
                /* replace-start */
                title.children.match(/\.(gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/) ? (
                  <img src={title.children} width="100%" alt="img" />
                ) :
                  /* replace-end */
                  /* replace-start-value = title.children */
                  React.createElement('span', { dangerouslySetInnerHTML: { __html: title.children } })
                /* replace-end-value */
              }
            </div>
            <div
              key="content"
              {...content}
            >
              {
                /* replace-start-value = content.children */
                React.createElement('span', { dangerouslySetInnerHTML: { __html: content.children } })
                /* replace-end-value */
              }
            </div>
            <Button
              type="ghost"
              key="button"
              {...button}
            >
              {
                /* replace-start-value = button.children */
                React.createElement('span', { dangerouslySetInnerHTML: { __html: button.children } })
                /* replace-end-value */
              }
            </Button>
          </QueueAnim>
        </Element>);
    });
    return (
      <OverPack
        {...props}
        {...dataSource.OverPack}
      >
        <TweenOneGroup
          key="bannerGroup"
          enter={{ opacity: 0, type: 'from' }}
          leave={{ opacity: 0 }}
          component=""
        >
          <BannerAnim
            key="BannerAnim"
            {...dataSource.BannerAnim}
            /* replace-start */
            ref={(c) => {
              this.banner = c;
            }}
          /* replace-end */
          >
            {childrenToRender}
          </BannerAnim>
        </TweenOneGroup>
        <TweenOne
          animation={{
            y: '-=20', yoyo: true, repeat: -1, duration: 1000,
          }}
          className="banner2-icon"
          style={{ bottom: 40 }}
          key="icon"
        >
          <Icon type="down" />
        </TweenOne>
      </OverPack>
    );
  }
}

export default Banner;