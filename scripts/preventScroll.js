// Create a new file in your hooks folder, e.g., useScrollPrevention.js

import { useEffect } from 'react';

const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

const useScrollPrevention = () => {
    useEffect(() => {
        // Modern Chrome requires { passive: false } when adding events
        let supportsPassive = false;
        try {
            window.addEventListener(
                'test',
                null,
                Object.defineProperty({}, 'passive', {
                    get: function () {
                        supportsPassive = true;
                    },
                })
            );
        } catch (e) { }

        const wheelOpt = supportsPassive ? { passive: false } : false;
        const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

        // Call this to disable scroll
        const disableScroll = () => {
            window.addEventListener('DOMMouseScroll', preventDefault, false); // Older FF
            window.addEventListener(wheelEvent, preventDefault, wheelOpt); // Modern desktop
            window.addEventListener('touchmove', preventDefault, wheelOpt); // Mobile
            window.addEventListener('keydown', preventDefaultForScrollKeys, false);
        };

        // Call this to enable scroll
        const enableScroll = () => {
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
            window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
            window.removeEventListener('touchmove', preventDefault, wheelOpt);
            window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
        };

        // Call disableScroll when the component mounts
        disableScroll();

        // Clean up event listeners when the component unmounts
        return () => {
            enableScroll();
        };
    }, []); // Empty dependency array means this effect runs once on mount
};

export default useScrollPrevention;