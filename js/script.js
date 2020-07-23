function getDays() {
  var gennaio = moment( 1 + "/" + 2018, "M/YYYY");
  var days = gennaio.daysInMonth();
  console.log(days);

  var monthTarget = $("#gennaio");
  var template = $("#day-template").html();
  var compiled = Handlebars.compile(template);

  for (var i = 0; i < days; i++) {
    var day = {
      "value" : i+1
      }
    var dayHtml = compiled(day);
    monthTarget.append(dayHtml);
  }
}

function init() {
  getDays();
}

$(document).ready(init);
