function nextMonth() {
  // console.log("prossimo");
  var activeMonth = $(".calendario div.active");
  var ifLast = activeMonth.hasClass("last");
  if (ifLast) {
    alert("finito anno 2018, non è presente il calendario del 2019");
  }
  else {
    activeMonth.removeClass("active");
    activeMonth.next("div").addClass("active");
  }

}
function prevMonth() {
  // console.log("precedente");
  var activeMonth = $(".calendario div.active");
  var isFirst = activeMonth.hasClass("first");
  if (isFirst) {
    alert("non è presente l'anno precedente");
  }
  else {
    activeMonth.removeClass("active");
    activeMonth.prev("div").addClass("active");
  }

}

function getEventListeners() {
  var nextBtn = $(".fas.fa-chevron-circle-right");
  var prevBtn = $(".fas.fa-chevron-circle-left");
  nextBtn.click(nextMonth);
  prevBtn.click(prevMonth);
}

function daysEachMonth() {
  for (var i = 0; i < 12; i++) {
    getDays(i);
  }
}

function getMonth2018() {
  var months = moment.months();
  // console.log(months);

  var target = $(".calendario");
  var template = $("#month-template").html();
  var compiled = Handlebars.compile(template);

  for (var i = 0; i < months.length; i++) {
    var monthname = {
      "month" : months[i],
      "monthnum": i
    }
    var monthHtml = compiled(monthname);
    target.append(monthHtml);
  }
  var jen = $(".calendario .January").addClass("active").addClass("first");
  var dec = $(".calendario .December").addClass("last");
}

function getDays(index) {
  var monthselect = moment( (index+1) + "/" + 2018, "M/YYYY");
  var days = monthselect.daysInMonth();
  var month = index;
  // console.log(days);

  var monthTarget = $("#"+index);
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
          // console.log(holiday);
          var holDate = holiday["date"];
          // console.log(holDate);
          var mom = moment(holDate, "YYYY-MM-DD");
          // console.log(mom);
          var rightMonth = mom.format("MM");
          // var targetMonth = $("ul#"+(rightMonth-1));
          var holDateConfronto = parseInt(mom.format("DD"));
          // console.log(holDateConfronto);
          for (var j = 0; j < 31; j++) {
            if (holDateConfronto == (j+1)) {
              // console.log("bravo",j+1);
              var targetDay = $("ul#"+(rightMonth-1)+" li."+(j+1));
              // console.log(targetDay);
              // console.log(holDateConfronto == (j+1));

               targetDay.append("<span>"+holiday["name"]+"</span>");
            }
          }

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
  getMonth2018();
  daysEachMonth();
  getEventListeners();
}

$(document).ready(init);
