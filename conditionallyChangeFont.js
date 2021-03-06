
// Here you specify the fonts that you don't want to change, so as not to conflict with icon fonts, etc.
var excludedFonts = ["Typicons"];

// Here you specify your new font for everything else
var newFont = "cmunrm, Serif";

// Wrap the changer as a function
var conditionallyChangeFont = function () {
    // Here be dragons. Lots of DOM traversal
    var els = document.querySelectorAll('body *');

    for (var i=0;i<els.length;i++) {
        var elementFonts = window.getComputedStyle(els[i],null).getPropertyValue("font-family").split(',');
        var changeFont = true;
        for (var _i=0;_i<elementFonts.length;_i++) {
            for (var __i=0;__i<excludedFonts.length;__i++) {
                if (elementFonts[_i] === excludedFonts[__i]) {
                    changeFont = false;
                }
            }
        }
        if (changeFont) {
            els[i].style.fontFamily = newFont;
        }
    }
};

// Set up the MutationObserver
var target = document.querySelectorAll('body')[0];
var observer = new MutationObserver(function(changes) {
    changes.forEach(function(change) {
        conditionallyChangeFont();
    });
});
observer.observe(target, { attributes: true, childList: true});

// And then call conditionallyChangeFont for good measure
conditionallyChangeFont();