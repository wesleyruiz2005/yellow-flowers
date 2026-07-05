(function (window) {
    function typewriter(element) {
        var content = element.innerHTML;
        var progress = 0;

        element.innerHTML = "";

        var timer = setInterval(function () {
            var current = content.charAt(progress);

            if (current === "<") {
                progress = content.indexOf(">", progress) + 1;
            } else {
                progress++;
            }

            element.innerHTML = content.substring(0, progress) + (progress & 1 ? "_" : "");

            if (progress >= content.length) {
                clearInterval(timer);
            }
        }, 75);

        return element;
    }

    window.typewriter = typewriter;
})(window);
