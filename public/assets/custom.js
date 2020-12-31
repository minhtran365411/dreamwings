

$(document).ready(function(){
  // $(function () {
        $(document).scroll(function() {
          var $nav = $("#mainNav");
          $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height() );
        })
 });

//This function is for nav bar to scroll

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


      

