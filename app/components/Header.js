// @flow
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from '../styles/Header.scss';
import HeaderTab from './HeaderTab';

const cx = classNames.bind(styles);

export default class Header extends Component {
  static getSlideTransitionClass(tab: string) {
    switch (tab) {
      case 'userProfile':
        return styles.sliderActive2;
      default: // survey
        return styles.sliderActive1;
    }
  }

  componentDidUpdate() {
    const $slider = document.getElementById('slider');
    const sliderClassName = cx(styles.slider,
      Header.getSlideTransitionClass(this.props.activeTab));
    if ($slider) $slider.className = sliderClassName;
  }

  render() {
    const sliderClassName = cx(styles.slider,
      Header.getSlideTransitionClass(this.props.displayedTab || this.props.activeTab));

    return (
      <div className={styles.header}>
        <HeaderTab name="Survey" path="/survey" icon="feedback" {...this.props} />
        <HeaderTab name="User Profile" path="/user-profile" icon="profile" {...this.props} />
        <div id="slider" className={sliderClassName} />
      </div>
    );
  }
}

Header.propTypes = {
  activeTab: PropTypes.string.isRequired,
  displayedTab: PropTypes.string.isRequired
};
