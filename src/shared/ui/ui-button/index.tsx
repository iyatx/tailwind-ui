import React, { MouseEvent } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router';

import styles from './index.module.css';

type UIButtonProps = {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  type?: 'button' | 'submit';
  to?: string;
  handleClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const UIButton: React.FC<UIButtonProps> = ({
  size,
  type = 'button',
  variant,
  children,
  to,
  handleClick,
}) => {
  const history = useHistory();

  // Sizes
  const sizeProperties = (): string => {
    switch (size) {
      case 'xs':
        return 'px-2.5 py-1.5 text-xs';
      case 'sm':
        return 'px-3 py-2 text-sm';
      case 'md':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-4 py-2 text-base';
      case 'xl':
        return 'px-6 py-3 text-base';
    }
  };

  // Colors
  const variantProperties = (): string => {
    switch (variant) {
      case 'primary':
        return 'bg-indigo-600 hover:bg-indigo-700 text-white';
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white';
      case 'secondary':
        return 'bg-gray-600 hover:bg-gray-700 text-white';
      case 'success':
        return 'bg-green-600 hover:bg-green-700 text-white';
      case 'warning':
        return 'bg-yellow-600 hover:bg-yellow-700 text-white';
    }
  };

  const buttonHandler = (e: MouseEvent<HTMLButtonElement>) => {
    to && history.push(to);
    handleClick && handleClick(e);
  };

  return (
    <button
      type={type}
      className={classNames(styles.btn, sizeProperties(), variantProperties())}
      onClick={buttonHandler}
    >
      {children}
    </button>
  );
};
