import React from 'react';
import { Link } from 'react-router-dom';
import LoaderDots from './loader';
import './buttons.sass';

export interface ButtonAttributes {
  children?: React.ReactNode
  className?: string
  disabled?: boolean
  href?: string
  loading?: boolean
  title?: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

export function Button({
  title, href, children, className = '', ...props
}: ButtonAttributes) {
  if (href) {
    return (
      <Link to={href} className={`button ${className}`}>
        {children}
      </Link>
    );
  }
  return (
    // eslint-disable-next-line react/button-has-type
    <button title={title} className={`button ${className}`} {...props}>
      {children}
    </button>
  );
}

export function ButtonSuccess({
  children, className = '', ...props
}: ButtonAttributes) {
  return (
    <Button className={`button--success ${className}`} {...props}>
      {children}
    </Button>
  );
}

export function ButtonSubmit({
  children, disabled, loading, ...props
}: ButtonAttributes) {
  return (
    <ButtonSuccess
      type="submit"
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <LoaderDots /> : children}
    </ButtonSuccess>
  );
}
