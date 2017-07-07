function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function Carousel(id, imagecount, diameter){
  this.ImageCount = imagecount;
  this.Diameter = diameter;
  this.ID = id;
  this.Spin = 0;
  
  this.CreatePanels = function(){ 
    

    for (var i = 0; i < this.ImageCount; i++){
       console.log(this.ID);
      $(this.ID).append("<div class='image image" + (i+1) + "'>" + (i+1) + "</div>");
    }
  }
  
  this.SetPanelPosition = function(val){
    this.Spin += val;
    for (var i = 0; i < this.ImageCount; i++){     
      var X = Math.round(Math.cos(toRadians(90 - ((i+this.Spin)*(360/this.ImageCount)))) * this.Diameter);
      var Z = Math.round((Math.sin(toRadians(90- ((i+this.Spin)*(360/this.ImageCount)))) * this.Diameter) - this.Diameter);
      var rot = Math.round((i+this.Spin) * (360/this.ImageCount));
      $(this.ID + ' .image'+(i+1)).css('transform', 'translateX('+X+'px) translateZ('+Z+'px) rotateY('+rot+'deg)');
    }
  }
  
  this.UpdateDiameter = function(val){
    this.Diameter = val;
    this.SetPanelPosition(0);
  }
  
  this.UpdateImageCount = function(val){
    $(this.ID).empty();
    this.ImageCount = val;
    this.CreatePanels();
    this.SetPanelPosition(this.Spin);
  }
}

var carousel1 = new Carousel('#carousel', 18, 600);
carousel1.CreatePanels();
carousel1.SetPanelPosition(0);

$('#left').click(function(){
  carousel1.SetPanelPosition(1);
});
$('#right').click(function(){
  carousel1.SetPanelPosition(-1);
});
$('#diameter-slider').on('change',function(){
  carousel1.UpdateDiameter($('#diameter-slider').val());
});
$('#image-count-slider').on('change',function(){
  carousel1.UpdateImageCount($('#image-count-slider').val());
});