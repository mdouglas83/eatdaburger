// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {

  $(".eat-burger").on("click", function(event) {
    var id = $(this).data("id");

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: {eaten: true}
    }).then(
      function() {
        location.reload();
      }
    );
  });

  $(".delete-burger").on("click", function(event) {
    var id = $(this).data("id");
    
    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
      type: "DELETE",
      data: {}
    }).then(
      function() {
        location.reload();
      }
    );
  });

  $(".serve-burger").on("submit", function(event) {
    event.preventDefault();

    var newburger = {
      burger: $("#burger").val().trim()
    };

    if (newburger.burger) {
      $.ajax("/api/burgers", {
        type: "POST",
        data: newburger
      }).then(
        function() {
          location.reload();
        }
      );
    }
  });

});
