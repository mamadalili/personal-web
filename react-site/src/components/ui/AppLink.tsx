import {Link} from 'react-router';
import type {ComponentProps} from 'react';

export function AppLink({href, ...props}: ComponentProps<'a'> & {href: string}) {
  return href.startsWith('/') && !href.startsWith('/legacy/')
    ? <Link to={href} {...props}/>
    : <a href={href} {...props}/>;
}
