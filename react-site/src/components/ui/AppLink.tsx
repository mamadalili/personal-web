import {Link} from 'react-router';
import type {ComponentProps} from 'react';

export function AppLink({href, ...props}: ComponentProps<'a'> & {href: string}) {
  return /^\/(?:fa|en)(?:[/?#]|$)/.test(href)
    ? <Link to={href} {...props}/>
    : <a href={href} {...props}/>;
}
