(function () {
    var canvas = document.getElementById('canvas');
    var config = window.APP_CONFIG;
    var width = config.canvas.width;
    var height = config.canvas.height;
    var viewportWidth = window.innerWidth || document.documentElement.clientWidth || width;
    var isNarrowScreen = viewportWidth <= 768;

    if (!canvas.getContext) {
        return false;
    }

    function sleep(ms) {
        return new Promise(function (resolve) {
            setTimeout(resolve, ms);
        });
    }

    function fadeIn(element, duration) {
        element.style.opacity = "0";
        element.style.display = "block";
        element.style.transition = "opacity " + duration + "ms";
        // Fuerza un reflow para que la transición arranque desde opacity 0.
        void element.offsetHeight;
        element.style.opacity = "1";
    }

    canvas.width = width;
    canvas.height = height;

    var opts = structuredClone(config.tree);
    opts.images = config.flowerImages;
    opts.seed = Object.assign({}, opts.seed, {
        x: width / 2 - 20
    });
    opts.bloom = Object.assign({}, opts.bloom, {
        jumpScale: isNarrowScreen ? config.tree.bloom.jumpScale.narrow : config.tree.bloom.jumpScale.wide,
        jumpSpawnMax: isNarrowScreen ? config.tree.bloom.jumpSpawnMax.narrow : config.tree.bloom.jumpSpawnMax.wide
    });

    var tree = new Tree(canvas, width, height, opts);
    var seed = tree.seed;
    var foot = tree.footer;
    var startInteraction = TreeInteractions.bindStartInteraction(canvas, seed);

    async function seedAnimate() {
        seed.draw();
        while (startInteraction.isWaiting()) {
            await sleep(10);
        }
        while (seed.canScale()) {
            seed.scale(0.95);
            await sleep(10);
        }
        while (seed.canMove()) {
            seed.move(0, 2);
            foot.draw();
            await sleep(10);
        }
    }

    async function growAnimate() {
        do {
            tree.grow();
            await sleep(10);
        } while (tree.canGrow());
    }

    async function flowAnimate() {
        do {
            tree.flower(2);
            await sleep(10);
        } while (tree.canFlower());
    }

    async function moveAnimate() {
        var targetScale = config.tree.transition.targetScale;

        tree.snapshot("p1", 240, 0, 610, 680);
        while (tree.move("p1", 500, 0, targetScale)) {
            foot.draw();
            await sleep(10);
        }
        foot.draw();
        tree.snapshot("p2", 500, 0, 610, 680);

        var wrap = canvas.parentElement;
        wrap.style.backgroundImage = "url(" + tree.toDataURL('image/png') + ")";
        wrap.style.backgroundSize = "100% 100%";
        wrap.style.backgroundRepeat = "no-repeat";
        wrap.style.backgroundPosition = "center";

        canvas.style.background = "#F5E8DC";
        await sleep(300);
        canvas.style.background = "none";
    }

    async function jumpAnimate() {
        while (true) {
            tree.ctx.clearRect(0, 0, width, height);
            tree.jump();
            foot.draw();
            await sleep(25);
        }
    }

    async function textAnimate() {
        var together = new Date(config.startDate);

        document.getElementById("recipient-name").textContent = config.recipientDisplay;

        var code = document.getElementById("code");
        code.style.display = "block";
        typewriter(code);

        fadeIn(document.getElementById("clock-box"), 500);

        var clock = document.getElementById("clock");
        while (true) {
            clock.innerHTML = AppClock.formatElapsedHtml(together, config.clock);
            await sleep(1000);
        }
    }

    async function run() {
        await seedAnimate();
        await growAnimate();
        await flowAnimate();
        await moveAnimate();

        // Arranca el texto/contador en paralelo (sin await) mientras las flores saltan.
        textAnimate();

        await jumpAnimate();
    }

    run();
})();
