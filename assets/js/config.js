(function (window) {
    var DEFAULT_START_DATE = "2025-06-04T00:00:00";
    var DEFAULT_RECIPIENT_DISPLAY = "el amor de mi vida";

    var params = new URLSearchParams(window.location.search);
    var recipientName = (params.get("nombre") || "").trim();
    var startDateParam = (params.get("fecha") || "").trim();
    var startDate = startDateParam && !isNaN(new Date(startDateParam).getTime())
        ? startDateParam
        : DEFAULT_START_DATE;

    window.APP_CONFIG = {
        canvas: {
            width: 1100,
            height: 680
        },
        startDate: startDate,
        recipientName: recipientName,
        recipientDisplay: recipientName || DEFAULT_RECIPIENT_DISPLAY,
        clock: {
            offsetHours: -1
        },
        flowerImages: [
            "assets/images/flower-1.avif",
            "assets/images/flower-2.avif",
            "assets/images/flower-3.avif",
            "assets/images/flower-4.avif",
            "assets/images/flower-5.avif",
            "assets/images/flower-6.avif",
            "assets/images/flower-7.avif"
        ],
        tree: {
            seed: {
                color: "rgb(139, 69, 19)",
                scale: 4,
                label: recipientName ? ("  Flores Para " + recipientName) : "  Flores Para Tí"
            },
            branch: [
                [535, 680, 570, 250, 500, 200, 30, 100, [
                    [540, 500, 455, 417, 340, 400, 13, 100, [
                        [450, 435, 434, 430, 394, 395, 2, 40]
                    ]],
                    [550, 445, 600, 356, 680, 345, 12, 100, [
                        [578, 400, 648, 409, 661, 426, 3, 80]
                    ]],
                    [539, 281, 537, 248, 534, 217, 3, 40],
                    [546, 397, 413, 247, 328, 244, 9, 80, [
                        [427, 286, 383, 253, 371, 205, 2, 40],
                        [498, 345, 435, 315, 395, 330, 4, 60]
                    ]],
                    [546, 357, 608, 252, 678, 221, 6, 100, [
                        [590, 293, 646, 277, 648, 271, 2, 80]
                    ]]
                ]]
            ],
            bloom: {
                num: 700,
                width: 1080,
                height: 650,
                jumpScale: {
                    narrow: 0.55,
                    wide: 0.75
                },
                jumpSpawnMin: 1,
                jumpSpawnMax: {
                    narrow: 1,
                    wide: 2
                }
            },
            footer: {
                width: 1200,
                height: 5,
                speed: 10
            },
            transition: {
                targetScale: 0.55
            }
        }
    };
})(window);
