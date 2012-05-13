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
    $(this).mousemove(function(e){
      var elem = document.elementFromPoint(e.pageX, e.pageY);
      $(".selected").removeClass("selected");
      
      relativePositionOfElement = rPosition($(elem), e.pageX, e.pageY);
      rPosX = relativePositionOfElement.x;
      rPosY = relativePositionOfElement.y;

      // console.log(rPosX + " " + rPosY);
      
      percentValueX = rPosX / (30 / 100);
      percentValueY = rPosY / (15 / 100);
      
      if(rPosX >= 0 && rPosX <= tileWidthHalf) {
        if(rPosY >= 0 && rPosY <= tileHeightHalf) {
          console.log("left top");
          calcPercentValueX = percentValueX;
          calcPercentValueY = percentValueY;
        }
        if(rPosY > tileHeightHalf && rPosY <= tileHeight) {
          console.log("left bottom");
          calcPercentValueX = percentValueX;
          calcPercentValueY = percentValueY;
        }
      }
      
      
      if(rPosX > tileWidthHalf && rPosX <= tileWidth) {
        if(rPosY > tileHeightHalf && rPosY <= tileHeight) {
          console.log("right bottom");
          calcPercentValueX = percentValueX;
          calcPercentValueY = percentValueY;
        }
        if(rPosY >= 0 && rPosY <= tileHeightHalf) {
          console.log("right top");
          calcPercentValueX = percentValueX;
          calcPercentValueY = percentValueY;
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
        // console.log("passt!");
      }
      else {
        console.log([calcPercentValueX, calcPercentValueY]);
      }
      
      
      // checkPosition(62, 32, rPosX, rPosY);
      
      if($(elem).hasClass("tile")) {
        $(elem).addClass("selected");
      }
    }); 
  })
  
});