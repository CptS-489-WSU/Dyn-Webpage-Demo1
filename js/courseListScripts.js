/* lbScripts.js
   This file defines the scripts that dynamically generate the table of speedgolf courses
   from a back-end database. 
*/

/* getCoursesCallback: Invoked after an ajax request to get the courses data.
   If data was successfully obtained, build the courses table, which may involve
   deleting the current version of it.
*/
function getCoursesCallback(response, status) {
    //TO DO: Fill in
}

/* JQUERY EVENT HANDLERS */

/* DOCUMENT READY: Make an ajax call to get data on all courses.
   Add the data to the courses table in the callback.
*/
$(document).ready(function() {
   //TO DO: Fill in
});

 /* dropdown-item CLICK: Using jquery DOM tree traversal, we can determine what item was clicked and 
    toggle the selected item accordingly. 
*/
    $(".dropdown-item").click(function () {
    //TO DO: Fill in
});
    
/* updateBtn CLICK: When the user clicks "Update", we rebuild the Courses Table based on the build a new URL using the selected search/filter options, and
   reload the page. Use a spinner animation to indicate the page is loading.
*/
$("#updateBtn").click(function () {

    //TO DO: Fill in 

});

/* HELPER FUNCTIONS */

/* camelize -- Converts string to camel case
*/
function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
      if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
      return index == 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }

/* zeroPad: Returns a string in which its integer parameter is padded with a leading
   zero if it is < 10.
*/
function zeroPad(num) {
    if (num < 10) {
      return "0" + num.toString();
    } else {
      return num.toString();
    }
  }

//SGTimeToString: Converts a time value (Date object) to a SG Time (only minutes and seconds).
//Note (5/8/18): We assume that a player can't be more than 120 minutes under par. This means we 
//interpret any time with hour == 22 or hour == 23 as under par. All other times are interpreted 
//as over par. In practice, this seems a bit like overkill (no player will ever even be 60 
//under par), but when testing the system, we sometimes generate very quick rounds that are 
//more than 60 under par, so allowing 120 under par accommodates these scenarios.
function SGTimeToString(theTime) {
    var theHours, theMinutes, theSeconds;
    if (theTime == null || theTime == "" || !(theTime instanceof Date))
      return "";
    theHours = theTime.getHours();
    if (theHours >= 22) { //we have an under par SG to par score between -0:01 and -59:59...
      theSeconds = theTime.getSeconds();
      if (theSeconds > 0) {
        theMinutes = (theHours == 23 ? 60 - theTime.getMinutes() - 1 : 120 - theTime.getMinutes() - 1);
        theSeconds = 60 - theSeconds;
      }  else {
        theMinutes = (theHours == 23 ? 60 - theTime.getMinutes() : 120 - theTime.getMinutes());
      }
      return "-" + theMinutes + ":" + zeroPad(theSeconds);
    } else { //assume above par
      theMinutes = theTime.getMinutes() + (theHours * 60);
      theSeconds = theTime.getSeconds();
      return theMinutes + ":" + zeroPad(theSeconds);
    } 
  }