JQVMap.prototype.addMarker = function (x, y, label) {
    var map = this;
    var marker = {
        'id' : "jqvmap-marker-" + ($(".jqvmap-marker").length + 1),
        'lat' : 0,
        'lon' : 0,
        'label' : label,
        'x' : x,
        'y' : y
    }

    map.container.append('<div id="' + marker.id + '" title="' + label + '" class="jqvmap-marker" style="position:absolute"></div>');

    this.positionMarker(marker);
    if (!this.markersHandlers) {
        this.markersHandlers = true;
        var positionFix = function () {
            map.positionPins();
        };
        this.container.bind('zoomIn', positionFix)
                .bind('zoomOut', positionFix)
                .bind('drag', positionFix);
    }
    
    return marker;
};

JQVMap.prototype.positionMarker = function (marker) {
    var map = this;
    var elt = jQuery("#"+marker.id);    

    var scale = map.scale;
    var rootCoords = map.canvas.rootGroup.getBoundingClientRect();
    var containerCoords = map.container[0].getBoundingClientRect();
    var margins = this.getMinTopAndLeft();
    
    var coords = {
        left: rootCoords.left - containerCoords.left,
        top: rootCoords.top - containerCoords.top
    };

    var xScale = (marker.x- margins.left) * scale - 4 ;
    var yScale = (marker.y - margins.top) * scale - 4;

    elt.css({
        left: coords.left + xScale,
        top: coords.top + yScale
    });

};

JQVMap.prototype.getMinTopAndLeft = function(){
    var minObj = {left:null,top:null};
    jQuery(".jqvmap-region").each(function(idx){
        var bbox = this.getBBox();
        minObj.left = minObj.left === null || minObj.left > bbox.x ? bbox.x : minObj.left;
        minObj.top = minObj.top === null || minObj.top > bbox.y ? bbox.y : minObj.top;
    });        
    return minObj;
}
JQVMap.prototype.removeMarker = function (marker) {

}

JQVMap.prototype.removeAllMarker = function () {
    var pins = this.container.find('.jqvmap-marker').remove();
}