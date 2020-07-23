// function verificaData(holDateConfronto){
//   var i = 0;
//   while (i < 31 && holDateConfronto == (i+1)) {
//     console.log("ok",i+1);
//     i++;
//   }
// }

function getDays() {
  var gennaio = moment( 1 + "/" + 2018, "M/YYYY");
  var days = gennaio.daysInMonth();
  var month = 0;
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
  holidays(month);
}
function holidays(month) {
  $.ajax({
    url: "https://flynn.boolean.careers/exercises/api/holidays",
    method: "GET",
    data: {
      "month": month,
      "year": 2018
    },
    success: function(data,state){
      var success = data["success"];
      var holidays = data["response"];


      if (success) {
        for (var i = 0; i < holidays.length; i++) {
          var holiday = holidays[i];
          console.log(holiday);
          var holDate = holiday["date"];
          console.log(holDate);
          var mom = moment(holDate, "YYYY-MM-DD");
          console.log(mom);
          var holDateConfronto = parseInt(mom.format("DD"));
          console.log(holDateConfronto);
          for (var j = 0; j < 31 && holDateConfronto == (j+1); j++) {
            console.log("bravo",j+1);
            var targetDay = $("li."+(j+1));
            console.log(targetDay);
            console.log(holDateConfronto == (j+1));
            if (holDateConfronto == (j+1)) {
              targetDay.append("<span> festività: "+holiday["name"]+"</span>");
            }
          }
          // verificaData(holDateConfronto);

        }

      }
      else {
        console.log("error");
      }
    },
    error: function (request,state,error) {
      console.log("request",request);
      console.log("state",state);
      console.log("error",error);
    }
  });
}
function init() {
  getDays();
}

$(document).ready(init);
