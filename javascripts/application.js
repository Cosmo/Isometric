function rPosition(element, mouseX, mouseY) {
  var offset = element.offset();
  var x = mouseX - offset.left;
  var y = mouseY - offset.top;
  return {'x': x, 'y': y};
}

$(function(){
  
  var map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,2,2,2,2,2,0,0,0,0,0,0,0,2,0,0],
    [0,0,0,2,2,2,2,2,0,0,0,0,0,0,0,2,0,0],
    [0,0,0,2,2,2,2,2,0,0,0,0,0,0,0,2,0,0],
    [0,0,0,2,2,2,2,2,0,0,0,0,0,0,0,2,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ];
  
  tileWidth       = 62;
  tileWidthHalf   = tileWidth/2;
  tileHeight      = 32;
  tileHeightHalf  = tileHeight/2;
  
  $("#map").css({ width: (map.length + 1) * tileWidth, height: ((map[0].length - 0.5) * tileHeight) });
  
  offsetX = 0;
  offsetY = (map[0].length * tileHeightHalf) - tileHeightHalf;
  
  $(map).each(function(yIndex) {
    $(this).each(function(xIndex) {
      topValue = (yIndex * tileHeightHalf) - (xIndex * tileHeightHalf);
      leftValue = (xIndex * tileHeight) + (yIndex * tileHeight);
      if(this == 0) {
        sprite = "floor"
      }
      if(this == 1) {
        sprite = "street"
      }
      if(this == 2) {
        sprite = "grass"
      }
      tile = $("<div data-x='"+xIndex+"' data-y='"+yIndex+"'>y" + yIndex + ".x" + xIndex + "</div>").addClass("tile " + sprite)
        .css({ top: topValue + offsetY, left: leftValue + offsetX });
      tile.appendTo("#map");
    });
  });
  
  
  
  $(document).mousemove(function(event){
    var element = document.elementFromPoint(event.pageX, event.pageY);
    $(".selected").removeClass("selected");
    
    if($(element).hasClass("tile")) {
      relativePositionOfElement = rPosition($(element), event.pageX, event.pageY);
      rPosX = relativePositionOfElement.x;
      rPosY = relativePositionOfElement.y;

      xIndexOffset = 0;
      yIndexOffset = 0;

      if(rPosX >= 0 && rPosX <= tileWidthHalf) {
        if(rPosY >= 0 && rPosY <= tileHeightHalf) {
          //console.log("left top");
          yIndexOffset = -1;
          calcPercentValueX = rPosX / (30 / 100);
          calcPercentValueY = rPosY / (15 / 100);
        }
        if(rPosY > tileHeightHalf && rPosY <= tileHeight) {
          //console.log("left bottom");
          xIndexOffset = -1;
          calcPercentValueX = rPosX / (30 / 100);
          calcPercentValueY = (tileHeight - rPosY) / (15 / 100);
        }
      }


      if(rPosX > tileWidthHalf && rPosX <= tileWidth) {
        if(rPosY >= 0 && rPosY <= tileHeightHalf) {
          //console.log("right top");
          xIndexOffset = 1;
          calcPercentValueX = (tileWidth - rPosX) / (30 / 100);
          calcPercentValueY = rPosY / (15 / 100);
        }
        if(rPosY > tileHeightHalf && rPosY <= tileHeight) {
          //console.log("right bottom");
          yIndexOffset = 1;
          calcPercentValueX = (tileWidth - rPosX) / (30 / 100);
          calcPercentValueY = (tileHeight - rPosY) / (15 / 100);
        }
      }

      if(
        calcPercentValueX <= 100 && calcPercentValueY <= 100 &&
        calcPercentValueY <= (100 - calcPercentValueX)
      ) {
        // outside of tile
        foundElement  = $(element);
        foundX        = foundElement.data("x") + xIndexOffset;
        foundY        = foundElement.data("y") + yIndexOffset;
        $(".tile[data-x="+foundX+"][data-y="+foundY+"]").addClass("selected");

      }
      else {
        foundElement  = $(element);
        foundElement.addClass("selected");
      }
    }
    
  });
  
  
});