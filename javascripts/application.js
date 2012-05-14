function rPosition(element, mouseX, mouseY) {
  var offset = element.offset();
  var x = mouseX - offset.left;
  var y = mouseY - offset.top;
  return {'x': x, 'y': y};
}

$(function(){
  
  var map = [
    [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
    [00,00,00,00,00,00,09,09,09,09,09,09,09,09,09,09,00],
    [00,00,00,00,00,00,09,08,03,03,03,03,03,03,05,09,00],
    [00,00,10,10,10,00,09,04,09,09,09,09,09,09,04,09,00],
    [00,00,10,10,10,00,09,04,09,01,01,01,01,09,04,09,00],
    [00,00,10,10,10,00,09,04,09,09,09,01,09,09,04,09,00],
    [00,00,00,00,00,00,09,06,03,05,09,01,09,08,07,09,00],
    [00,00,00,00,00,00,09,09,09,04,09,01,09,04,09,09,00],
    [00,00,00,00,00,00,00,00,09,04,09,01,09,04,09,00,00],
    [00,01,01,01,01,01,00,00,09,04,09,09,09,04,09,00,00],
    [00,01,01,01,01,01,00,00,09,06,03,03,03,07,09,00,00],
    [00,01,01,01,01,01,00,00,09,09,09,09,09,09,09,00,00],
    [00,01,01,01,01,01,00,00,00,00,00,00,00,01,00,00,00],
    [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00]
  ];
  
  var mapTranslate = {
    0:  "floor",
    1:  "floor_2",
    2:  "street",
    3:  "street_1",
    4:  "street_2",
    5:  "street_3",
    6:  "street_4",
    7:  "street_5",
    8:  "street_6",
    9:  "grass",
    10: "cube"
  }
  
  tileWidth       = 62;
  tileHeight      = 32;
  tileWidthHalf   = tileWidth/2;
  tileHeightHalf  = tileHeight/2;
  
  $("#map").css({ width: (map.length + 1) * tileWidth, height: ((map[0].length - 0.5) * tileHeight) });
  
  offsetX = (map.length * tileWidthHalf);
  offsetY = 0;
  
  $(map).each(function(yIndex) {
    $(this).each(function(xIndex) {
      topValue = (yIndex * tileHeightHalf) + (xIndex * tileHeightHalf);
      leftValue = (xIndex * tileHeight) - (yIndex * tileHeight);
      sprite = mapTranslate[this];
      inside = "<div class='inner'>y" + yIndex + ".x" + xIndex + "</div>";
      tile = $("<div data-x='"+xIndex+"' data-y='"+yIndex+"'>"+inside+"</div>").addClass("tile " + sprite)
        .css({ top: topValue + offsetY, left: leftValue + offsetX });
      tile.appendTo("#map");
    });
  });
  
  
  
  $(document).mousemove(function(event){
    var element = $(document.elementFromPoint(event.pageX, event.pageY));
    $(".selected").removeClass("selected");
    
    if(!element.hasClass("tile")) {
      element = element.closest(".tile");
    }
    
    if(element.hasClass("tile")) {
      relativePositionOfElement = rPosition(element, event.pageX, event.pageY);
      rPosX = relativePositionOfElement.x;
      rPosY = relativePositionOfElement.y;

      xIndexOffset = 0;
      yIndexOffset = 0;

      if(rPosX >= 0 && rPosX <= tileWidthHalf) {
        if(rPosY >= 0 && rPosY <= tileHeightHalf) {
          //console.log("left top");
          xIndexOffset = -1;
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
          yIndexOffset = -1;
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
        foundX        = element.data("x") + xIndexOffset;
        foundY        = element.data("y") + yIndexOffset;
        $(".tile[data-x="+foundX+"][data-y="+foundY+"]").addClass("selected");
        
      }
      else {
        element.addClass("selected");
      }
    }
    
  });
  
  
});