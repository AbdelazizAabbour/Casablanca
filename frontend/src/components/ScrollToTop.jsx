import React from 'react';

/**
 * ScrollToTop - Scrolls to top on route change
 */
const ScrollToTop = () => {
    const { pathname } = window.location;

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
