import React from 'react';
import './Board.css';
import classNames from 'classnames';

export const Board: React.FC<{ className?: string, children?: React.ReactNode }> = ({
  className,
  children,
}) => <div className={classNames('Board', className)}>{children}</div>;
