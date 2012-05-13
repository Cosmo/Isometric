function rPosition(element, mouseX, mouseY) {
  var offset = element.offset();
  var x = mouseX - offset.left;
  var y = mouseY - offset.top;
  return {'x': x, 'y': y};
}

function checkPosition(width, height, posX, posY) {
  // percentValueX = posX / ((width/2) / 100);
  // percentValueY = posY / ((height/2) / 100);
  // 
  // if(
  //   (posX < (width / 2))
  //   &&
  //   (posY < (height / 2))
  // ) {
  //   console.log("nein");
  // }
  // else {
  //   console.log("ja");
  // }
  
}

$(function(){
  
  var map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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
      tile = $("<div>" + yIndex + "." + xIndex + "</div>").addClass("tile " + sprite).css({ top: topValue + offsetY, left: leftValue + offsetX });
      tile.appendTo("#map");
    });
  });
  
  // $(".tile").hover(
  //   function(event) {
  //     $(this).css({ backgroundColor: "blue", zIndex: 10000 }).addClass("selected");
  //   },
  //   function(event) {
  //     $(this).css({ backgroundColor: "transparent" }).removeClass("selected");
  //   }
  // );
  
  
  
  
  $(document).ready(function(){
    $(this).mousemove(function(event){
      var element = document.elementFromPoint(event.pageX, event.pageY);
      $(".selected").removeClass("selected");
      
      relativePositionOfElement = rPosition($(element), event.pageX, event.pageY);
      rPosX = relativePositionOfElement.x;
      rPosY = relativePositionOfElement.y;

      if(rPosX >= 0 && rPosX <= tileWidthHalf) {
        if(rPosY >= 0 && rPosY <= tileHeightHalf) {
          //console.log("left top");
          // index -1
          calcPercentValueX = rPosX / (30 / 100);
          calcPercentValueY = rPosY / (15 / 100);
        }
        if(rPosY > tileHeightHalf && rPosY <= tileHeight) {
          //console.log("left bottom");
          // subIndex -1
          calcPercentValueX = rPosX / (30 / 100);
          calcPercentValueY = (tileHeight - rPosY) / (15 / 100);
        }
      }
      
      
      if(rPosX > tileWidthHalf && rPosX <= tileWidth) {
        if(rPosY >= 0 && rPosY <= tileHeightHalf) {
          //console.log("right top");
          // subIndex +1
          calcPercentValueX = (tileWidth - rPosX) / (30 / 100);
          calcPercentValueY = rPosY / (15 / 100);
        }
        if(rPosY > tileHeightHalf && rPosY <= tileHeight) {
          //console.log("right bottom");
          // index +1
          calcPercentValueX = (tileWidth - rPosX) / (30 / 100);
          calcPercentValueY = (tileHeight - rPosY) / (15 / 100);
        }
      }
      
      
      
      if(
        (
          calcPercentValueX <= 100 &&
          calcPercentValueY <= 100
        )
        &&
        calcPercentValueY <= (100 - calcPercentValueX)
      )
      {
        console.log("raus hier!");
      }
      
      if($(elem).hasClass("tile")) {
        $(elem).addClass("selected");
      }
    }); 
  })
  
});