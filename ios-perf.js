// iOS Performance optimizations for Statch Landing Page
(function() {
    // Detect iOS device
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (!isIOS) return; // Only apply these optimizations on iOS

    // Add iOS-specific CSS
    var style = document.createElement('style');
    style.textContent = `
        /* Hardware acceleration for better scrolling */
        * {
            -webkit-tap-highlight-color: transparent !important;
        }
        body {
            -webkit-overflow-scrolling: touch !important;
        }
        /* Hardware acceleration for animations */
        .animate, 
        button, 
        img, 
        svg {
            transform: translateZ(0);
            backface-visibility: hidden;
        }
    `;
    document.head.appendChild(style);

    // Optimize image loading for iOS
    document.addEventListener('DOMContentLoaded', function() {
        // Preload critical images
        var criticalImages = ['images/ic_statch.png'];
        criticalImages.forEach(function(src) {
            var img = new Image();
            img.src = src;
        });
    });

    // Add a touch delay fix for iOS
    document.addEventListener('touchstart', function() {}, {passive: true});

    // Optimize memory usage on iOS by removing console messages in production
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        console.log = function() {};
        console.warn = function() {};
        console.error = function() {};
    }

    // Report performance metrics to help debug iOS issues
    window.addEventListener('load', function() {
        setTimeout(function() {
            if (window.performance && window.performance.timing) {
                var timing = window.performance.timing;
                var pageLoadTime = timing.loadEventEnd - timing.navigationStart;
                var domReadyTime = timing.domComplete - timing.domLoading;
                console.log('iOS Page Load: ' + pageLoadTime + 'ms, DOM Ready: ' + domReadyTime + 'ms');
            }
        }, 0);
    });
})();