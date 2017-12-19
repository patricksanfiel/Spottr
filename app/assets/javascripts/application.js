// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require turbolinks
//= require_tree .
/*-----DOTS----credit:Louis Dickinson-*/
(function() {
    var lH = 0;
    var pixelH = '';
    var winH = $(window).height();
    while (lH < (winH - 0)) {
        lH = lH + (10 / 6.55);
        var x = 2.3;
        var y = Math.floor(Math.random() * 50) / 20;
        pixelH += '<div class="pixel" style="animation-duration:' + x + 's;animation-delay:-' + y + 's;"></div>';
    }
    $('.dots-container').html(pixelH);
})();

/*-----INTERATIVE-----*/
$('#logo-1').click(function() {
    $('.pixel').toggleClass('pixel-changecolor')
    $('.circle').toggleClass('circle-changecolor')
    $('#logo-arrow .st14').toggleClass('logo-arrow-changecolor')
});
var svgLogo = ('#logo-1, #logo-2');
TweenMax.to(svgLogo, 2, {
    transformOrigin: '50% 50%',
    rotation: '360',
    repeat: -1,
    ease: Linear.easeNone
});
TweenMax.to('#logo-arrow', 1, {
    y: '-2px',
    ease: Elastic.easeOut,
    repeat: -1,
    yoyo: true
});
var textShape1 = $('#nt-i-shape');

/*-----TIMELINE-----*/
var tl = new TimelineMax();
tl.to(textShape1, 2, {
    y: '-20px',
    autoAlpha: '0.8',
    ease: Elastic.easeInOut,
    repeat: -1,
    yoyo: true
})
var textShape2 = $('#nt-n-shape');
var tl = new TimelineMax();
tl.to(textShape2, 3, {
    y: '-16px',
    autoAlpha: '0.8',
    ease: Elastic.easeInOut,
    repeat: -1,
    yoyo: true,
    delay: .5
})
var textShape3 = $('#nt-g-shape');
var tl = new TimelineMax();
tl.to(textShape3, 2, {
    y: '-=14px',
    autoAlpha: '0.8',
    ease: Elastic.easeInOut,
    repeat: -1,
    yoyo: true,
    delay: 1
})
var textShape4 = $('#nt-l-shape');
var tl = new TimelineMax();
tl.to(textShape4, 1, {
    y: '-=18px',
    autoAlpha: '0.8',
    ease: Elastic.easeInOut,
    repeat: -1,
    yoyo: true,
    delay: 1.5
})
var textShape5 = $('#nt-i2-shape');
var tl = new TimelineMax();
tl.to(textShape5, 1.5, {
    y: '-=12px',
    autoAlpha: '0.8',
    ease: Elastic.easeInOut,
    repeat: -1,
    yoyo: true,
    delay: 2
})
var textShape6 = $('#nt-d-shape');
var tl = new TimelineMax();
tl.to(textShape6, 2, {
    y: '-=15px',
    autoAlpha: '0.8',
    ease: Elastic.easeInOut,
    repeat: -1,
    yoyo: true,
    delay: .5
})
var textShape7 = $('#nt-e-shape');
var tl = new TimelineMax();
tl.to(textShape7, 3, {
    y: '-=18px',
    autoAlpha: '0.8',
    ease: Elastic.easeInOut,
    repeat: -1,
    yoyo: true,
    delay: 1
})
var textShape8 = $('#nt-s-shape');
var tl = new TimelineMax();
tl.to(textShape8, 2, {
    y: '-=10px',
    autoAlpha: '0.8',
    ease: Elastic.easeInOut,
    repeat: -1,
    yoyo: true,
    delay: 1.5
})
var textShape9 = $('#nt-i3-shape');
var tl = new TimelineMax();
tl.to(textShape9, 1, {
    y: '-=17px',
    autoAlpha: '0.8',
    ease: Elastic.easeInOut,
    repeat: -1,
    yoyo: true,
    delay: .5
})
var textShape10 = $('#nt-g2-shape');
var tl = new TimelineMax();
tl.to(textShape10, 2, {
    y: '-=19px',
    autoAlpha: '0.8',
    ease: Elastic.easeInOut,
    repeat: -1,
    yoyo: true,
    delay: 1
})
var textShape11 = $('#nt-n2-shape');
var tl = new TimelineMax();
tl.to(textShape11, 1.5, {
    y: '-=15px',
    autoAlpha: '0.8',
    ease: Elastic.easeInOut,
    repeat: -1,
    yoyo: true,
    delay: 2
})

/*-----RGB-----*/
var colors = ["#DD0000", "#8DC63F", "#2B4E9F", ];
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var pathPointsFrom,
    pathPointsTo,
    pathPointsNow;
var steps = 200;
var offset = 0;
var pathCount = 0;
var interpolationPoint = {
    percentage: 0
};
ctx.lineWidth = 20;
ctx.lineCap = "round";
function drawPathToCanvas() {
    var thisColor,
        lastColor = getColorSegment(0);
    ctx.strokeStyle = lastColor;
    ctx.beginPath();
    for (var i = 0, l = pathPointsNow.length; i < l; i++) {
        if (pathPointsNow[i + 1]) {
            ctx.moveTo(pathPointsNow[i].x, pathPointsNow[i].y);
            ctx.lineTo(pathPointsNow[i + 1].x, pathPointsNow[i + 1].y);
        } else {
            ctx.lineTo(pathPointsNow[i].x, pathPointsNow[i].y);
        }
        thisColor = getColorSegment(i);
        if (thisColor) {
            if (thisColor != lastColor) {
                ctx.closePath();
                ctx.stroke();
                ctx.beginPath();
                ctx.strokeStyle = thisColor;
                lastColor = thisColor;
            }
        }
    }
    ctx.closePath();
    ctx.stroke();
}
function samplePath(pathSelector) {
    var path = document.getElementById(pathSelector);
    var length = path.getTotalLength();
    var points = [];
    for (var i = 0; i <= steps; i++) {
        points.push(path.getPointAtLength(length * i / steps));
    }
    return points;
}
function interpolatePaths() {
    var points = [];
    for (var i = 0; i <= steps; i++) {
        points.push({
            x: pathPointsFrom[i].x + (pathPointsTo[i].x - pathPointsFrom[i].x) * interpolationPoint.percentage,
            y: pathPointsFrom[i].y + (pathPointsTo[i].y - pathPointsFrom[i].y) * interpolationPoint.percentage
        });
    }
    return points;
}
function getColorSegment(i) {
    var p = i / steps + offset;
    if (p > 1)
        p = p - 1;
    var point = Math.floor(p * 4);
    return colors[point];
}
var paths = [samplePath("circle-path"), samplePath("rect-path"), samplePath("triangle-path")];
function loop() {
    ctx.clearRect(0, 0, 200, 200);
    offset = offset + 0.009;
    pathPointsNow = interpolatePaths();
    if (offset >= 1)
        offset = 0;
    drawPathToCanvas();
    requestAnimationFrame(loop);
}
function tweenPaths() {
    pathPointsFrom = paths[pathCount];
    if (pathCount + 1 <= 2)
        pathPointsTo = paths[pathCount + 1];
    else
        pathPointsTo = paths[0];
    TweenLite.to(interpolationPoint, 0.7, {
        percentage: 1,
        ease: Power2.easeInOut,
        delay: 0.4,
        onComplete: function() {
            interpolationPoint.percentage = 0;
            pathCount++;
            if (pathCount > 2) {
                pathCount = 0;
            }
            tweenPaths();
        }
    });
}
tweenPaths();
loop();
setInterval(function() {
    function r(el, deg) {
        el.setAttribute('transform', 'rotate(' + deg + ' 100 100)')
    }
    var d = new Date()
    r(ifclocksecond, 6 * d.getSeconds())
    r(ifclockminute, 6 * d.getMinutes())
    r(ifclockhour, 30 * (d.getHours() % 12) + d.getMinutes() / 2)
}, 1000)
