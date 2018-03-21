// Generic http request function, ignores response data
function heyJax(method, url, data, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) callback;
  };
  xhr.open(method, url, true);
  //replaced with .onreadystatechange, Heroku is crashing
  //xhr.addEventListener('load', callback);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(JSON.stringify(data));
}

// Wait to attach handlers until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function(event) {

  /* C */
      //
  var serveBurgers = document.getElementsByClassName("serve-burger");
  serveBurgers[0].onsubmit = function(event) {
    event.preventDefault();
    const newburger = document.getElementById("burger").value.trim();
    if (newburger)
      heyJax("POST", "/api/burgers", {burger: newburger}, function() {location.reload()});
  };
  
  /* R */
      // readall occurs when page is loaded.
     // to make things simple for now, I'll rely on page loads to update buttons on the page.

  /* U */
      //
  var eatBurgers = document.getElementsByClassName("eat-burger");
  if (eatBurgers) {
    for (let i = 0; i < eatBurgers.length; i++) {
      eatBurgers[i].onclick = function(event) {
        const id = this.dataset.id;
        heyJax("PUT", "/api/burgers/" + id, {eaten: true}, function() {location.reload()});
      };
    }
  }

  /* D */
      //
  var deleteBurgers = document.getElementsByClassName("delete-burger");
  if (deleteBurgers) {
    for (let i = 0; i < deleteBurgers.length; i++) {
      deleteBurgers[i].onclick = function(event) {
        const id = this.dataset.id;
        heyJax("DELETE", "/api/burgers/" + id, {}, function() {location.reload()});
      };
    }
  }

});
