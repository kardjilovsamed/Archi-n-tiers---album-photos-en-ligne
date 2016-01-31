
var deltaX = 0;
var deltaY = 0;

var initPosX;
var initPosY;

$(".draggable").mousedown(function(event) {

    var target = event.target;

    initPosX = (parseFloat(target.getAttribute('data-x')) || 0);
    initPosY = (parseFloat(target.getAttribute('data-y')) || 0);
});

/* The dragging code for '.draggable' from the demo above
 * applies to this demo as well so it doesn't have to be repeated. */

interact('.draggable')
    .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
            restriction: "parent",
            endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: dragMoveListener,
        // call this function on every dragend event
        onend: cancelMoveListener
    });


function dragMoveListener (event) {
    var target = event.target,

    // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    deltaX = deltaX + event.dx;
    deltaY = deltaY + event.dy;

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

function cancelMoveListener (event) {
    var target = event.target,

    // keep the dragged position in the data-x/data-y attributes
        x = initPosX,
        y = initPosY;

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
            'translate( ' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', initPosX);
    target.setAttribute('data-y', initPosY);

    deltaX = 0;
    deltaY = 0;
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

// enable draggables to be dropped into this
interact('.dropzone').dropzone({
    // only accept elements matching this CSS selector
    accept: '.yes-drop',
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.20,

    // listen for drop related events:

    ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add('drop-active');
    },
    ondragenter: function (event) {
        var draggableElement = event.relatedTarget;

        // feedback the possibility of a drop
        draggableElement.classList.add('drag-transparent');
    },
    ondragleave: function (event) {
        // remove the drop feedback style

        event.relatedTarget.classList.remove('drag-transparent');
    },
    ondrop: function (event) {

        var draggableElement = event.relatedTarget;
        var dropzoneElement = event.target;

        alert("coucou");
        draggableElement.style.display = "none";

        //alert("dossier : " + dropzoneElement.id + "\nImage: " + draggableElement.id);
    },
    ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
    }
});

