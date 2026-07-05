(function (window) {
    function getCanvasPoint(canvas, event) {
        var rect = canvas.getBoundingClientRect();

        return {
            x: event.pageX - (rect.left + window.scrollX),
            y: event.pageY - (rect.top + window.scrollY)
        };
    }

    function bindStartInteraction(canvas, seed, onStart) {
        var isWaiting = true;
        var controller = new AbortController();
        var signal = controller.signal;

        function cleanup() {
            controller.abort();
            canvas.classList.remove("hand");
        }

        function start() {
            if (!isWaiting) {
                return;
            }

            isWaiting = false;
            cleanup();
            if (onStart) {
                onStart();
            }
        }

        canvas.addEventListener("click", function (event) {
            var point = getCanvasPoint(canvas, event);

            if (seed.hover(point.x, point.y)) {
                start();
            }
        }, { signal: signal });

        canvas.addEventListener("mousemove", function (event) {
            var point = getCanvasPoint(canvas, event);
            canvas.classList.toggle("hand", seed.hover(point.x, point.y));
        }, { signal: signal });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.keyCode === 13) {
                start();
            }
        }, { signal: signal });

        return {
            isWaiting: function () {
                return isWaiting;
            },
            start: start,
            destroy: cleanup
        };
    }

    window.TreeInteractions = {
        bindStartInteraction: bindStartInteraction
    };
})(window);
