'use strict';

//This function is for nav bar to scroll

$(document).ready(function(){
  
        $(document).scroll(function() {
          var $nav = $("#mainNav");
          $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height() );
        })
 });

 //carousel on homepage

 $('#carouselExampleControls').carousel({
  interval: 2000
});

//This function is for hoatdong

 $(document).ready(function() {
        let imagesPreview = function(input, placeToInsertImagePreview) {
          if (input.files) {
            let filesAmount = input.files.length;
            for (i = 0; i < filesAmount; i++) {
              let reader = new FileReader();
              reader.onload = function(event) {
                $($.parseHTML("<img>"))
                  .attr({src: event.target.result, class:"mx-3"})
                  .appendTo(placeToInsertImagePreview);
              };
              reader.readAsDataURL(input.files[i]);
            }
          }
        };
        $("#input-multi-files").on("change", function() {
          imagesPreview(this, "div.preview-images");
        });
      });


/*
    Carousel
*/
$('#carousel-example').on('slide.bs.carousel', function (e) {
  /*
      CC 2.0 License Iatek LLC 2018 - Attribution required
  */
  var $e = $(e.relatedTarget);
  var idx = $e.index();
  var itemsPerSlide = 5;
  var totalItems = $('.carousel-item').length;

  if (idx >= totalItems-(itemsPerSlide-1)) {
      var it = itemsPerSlide - (totalItems - idx);
      for (var i=0; i<it; i++) {
          // append slides to end
          if (e.direction=="left") {
              $('.carousel-item').eq(i).appendTo('.carousel-inner');
          }
          else {
              $('.carousel-item').eq(0).appendTo('.carousel-inner');
          }
      }
  }
});



// add fit-css rules for teachers cards
document.querySelectorAll(".team-img :first-child").forEach(function(c){
  c.classList.add("img-fit-css");
});








    


      

