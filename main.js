// /date/
var date = new Date();

//get date
var currentMonth = date.getMonth()
var currentDay = date.getDay()
var currentDate = date.getDate()
var currentYear = date.getFullYear()

//array for months

var months = ["January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"]

//put date in DOM

var title = document.getElementById("title");
title.innerHTML = months[currentMonth];

//update the cal

var habitTitle = document.getElementById("habitTitle");

habitTitle.onclick = function () {

    let habits = prompt("Add a task", habitTitle.innerHTML)

    if (habits.length == 0) {
        habitTitle.innerHTML = "Click to add a task";
    } else {
        habitTitle.innerHTML = habits;
    }

}
//total days issue


var daysInTheMonthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

var daysInThisMonth = daysInTheMonthList[currentMonth];

var daysCompleted = 0;

var totalDays = document.getElementById("totalDays")
totalDays.innerHTML = "0/" + daysInThisMonth;



//set the caldendar days
var dayCount = 0;
var rowCount = 0;
var days = document.getElementsByClassName("days")


for (var i = 0; i < days.length; i++) {
    var day = days[rowCount].getElementsByClassName("day")
    for (var j = 0; j < day.length; j++) {
        if (dayCount == currentDate - 1) {
            day[j].setAttribute("style", "border: 2px solid black")
            day[j].setAttribute("style", "color: rgb(233,1,144")

        }

        if (dayCount < daysInThisMonth) {
            day[j].innerHTML = dayCount + 1;
            day[j].setAttribute("id", "day" + (dayCount + 1));
            dayCount++;

        } else {
            day[j].innerHTML = "";
            day[j].setAttribute("style", "background-color:white")

        }
    }
    rowCount++;
}


//completed or not check
var completed = new Array(31);
for (let i = 0; i < dayCount; i++) {
    var tempString =
        "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear
    // console.log("storing date: " + tempString)

    var tempDay = localStorage.getItem(tempString);
    // console.log(tempDay);

    if (tempDay == null || tempDay == "false") {
        localStorage.setItem(tempString, "false");
    } else if (tempDay == "true") {
        daysCompleted++
        increment();
    }
    totalDays.innerHTML = daysCompleted + "/" + daysInThisMonth
}
// console.log("completed array" + completed)
// console.log("total days completed" + daysCompleted)

for (let i = 0; i < currentDate; i++) {
    var tempString =
        "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear;
    // console.log(tempString)

    var chosenDay = localStorage.getItem(tempString)

    // console.log(i + 1 + ": " + chosenDay)
    var chosenDayDiv = document.getElementById("day" + (i + 1))
    if (chosenDay === "true") {
        chosenDayDiv.style.backgroundColor = "antiquewhite";

    } else if (chosenDay === "false") {
        chosenDayDiv.style.backgroundColor = "white"
    }

}


//onclick listener for days

var dayDivs = document.querySelectorAll(".day")
var selectedDate = `day${currentDate}`;

const handleCheckDay = (e) => {
    var num = e.target.innerText;
    var storageString =
        "" + (currentMonth + 1) + "-" + num + "-" + currentYear;
    console.log(chosenDay)
    selectedDate.style.backgroundColor = "antiquewhite"
    localStorage.setItem(storageString, true)
    daysCompleted < currentDate && daysCompleted++
    daysCompleted < currentDate && increment();
    displayStoredNotes();
    totalDays.innerHTML = daysCompleted + "/" + dayCount;
    // console.log(daysCompleted, currentDate)

    if (daysCompleted === currentDate) {
        alert("keep it up!!")
    }

}

const handleMissedDay = (e) => {
    var num = e.target.innerText;
    var storageString =
        "" + (currentMonth + 1) + "-" + num + "-" + currentYear;
    selectedDate.style.backgroundColor = "white"
    localStorage.setItem(storageString, false)
    daysCompleted > 1 && daysCompleted--
    daysCompleted > 1 && increment();
    displayStoredNotes();
    totalDays.innerHTML = daysCompleted + "/" + dayCount;
    // console.log(daysCompleted, currentDate)

    if (daysCompleted === currentDate) {
        alert("keep it up!!")
    }

}

for (let i = 0; i < currentDate; i++) {
    dayDivs[i].onclick = function (e) {
        var num = e.target.innerText;

        // prevSelectedDay?.style.backgroundColor = "white"

        selectedDate = document.getElementById(e.target.id)
        // var storageString =
        //     "" + (currentMonth + 1) + "-" + num + "-" + currentYear;
        // if (localStorage.getItem(storageString) === "false") {
        // selectedDate.style.backgroundColor = "silver";
        // dayDivs.forEach((div, i) => {
        //     if (div.id !== e.target.id || chosenDay === "false") {
        //         div.style.backgroundColor = "white";
        //     } 
        // }
        // )

        // console.log(tempString)


        // console.log(i + 1 + ": " + chosenDay)

        //     localStorage.setItem(storageString, true)
        //     daysCompleted++
        //     increment();
        displayStoredNotes();
        // } else if (localStorage.getItem(storageString) === "true") {

        //     selectedDate.style.backgroundColor = "white"
        //     localStorage.setItem(storageString, false)
        //     daysCompleted--
        //     increment();


        // }
        // totalDays.innerHTML = daysCompleted + "/" + dayCount;
        // // console.log(daysCompleted, currentDate)

        // if (daysCompleted === currentDate) {
        //     alert("keep it up!!")
        // }




    }

}
//input form for note

// function showInputForm() {
//     document.getElementById('inputForm').style.display = 'block';
// }
function saveText() {
    const inputText = document.getElementById('textInput').value;
    if (inputText.trim() !== '') {
        let existingNotes = JSON.parse(localStorage.getItem('notes'));
        if (existingNotes === null || existingNotes[selectedDate.id] === undefined) {
            if (existingNotes === null) {
                existingNotes = {};
            };
            existingNotes[selectedDate.id] = [];
        }
        existingNotes[selectedDate.id].push(inputText);
        localStorage.setItem('notes', JSON.stringify(existingNotes));
        displayStoredNotes();
        // document.getElementById('inputForm').style.display = 'none';
    } else {
        alert('Please enter some text.');
    }
}


function displayStoredNotes() {
    let storedNotes = JSON.parse(localStorage.getItem('notes'));
    if (storedNotes === null || storedNotes[selectedDate.id] === undefined) {
        if (storedNotes === null) {
            storedNotes = {};
        };
        storedNotes[selectedDate.id] = [];
    }
    const displayArea = document.getElementById('displayArea');


    displayArea.innerHTML = '';


    storedNotes[selectedDate.id].forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.textContent = `Note: ${note}`;
        displayArea.appendChild(noteElement);
    });
}

function clearNotes() {
    localStorage.removeItem('notes');
    displayStoredNotes(); // Update the display after clearing notes
}


// document.getElementById('showFormButton').addEventListener('click', showInputForm);
document.getElementById('saveButton').addEventListener('click', saveText);
document.getElementById('clearNotesButton').addEventListener('click', clearNotes);
document.getElementById('missedDay').addEventListener('click', handleMissedDay);
document.getElementById('checkDay').addEventListener('click', handleCheckDay);



displayStoredNotes();




//reset button

var resetButton = document.getElementById("resetButton")

// resetButton.onclick = function () {

//     for (let i = 0; i < dayCount; i++) {
//         var tempString = "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear;
//         // console.log(tempString);
//         localStorage.setItem(tempString, "false")
//         var curDay = document.getElementById("day" + (i + 1));

//         curDay.style.backgroundColor = "white";

//     }

//     daysCompleted = 0;
//     increment();
//     totalDays.innerHTML = daysCompleted + "/" + daysInThisMonth


// }


////////////////////////////////////////
////////////////////////////////////////

// Based on the stem generator in Flash Math Creativity

class EventManager {

    constructor() {
        this.eventLookup = {};
    }

    off(event, callback) {
        var listeners = this.eventLookup[event];
        if (event === "*") this.eventLookup = {};
        else if (!callback) this.eventLookup[event] = [];
        else _.remove(listeners, { callback });
    }

    on(event, callback, scope) {
        var listeners = this.eventLookup[event];
        if (!listeners) this.eventLookup[event] = listeners = [];
        listeners.push({ callback, scope });
        return () => _.remove(listeners, { callback });
    }

    once(event, callback, scope) {
        var on = (...data) => {
            this.off(event, on);
            callback.apply(scope, data);
        };
        return this.on(event, on);
    }

    fire(event, ...data) {
        var listeners = this.eventLookup[event];
        if (!listeners) return;
        listeners.forEach(list => {
            try {
                return list.callback.apply(list.scope, data);
            } catch (e) {
                return _.isError(e) ? e : new Error(e);
            }
        });
    }
}

var events = new EventManager();

var ns = "http://www.w3.org/2000/svg";
var d = "M0,0 Q5,-5 10,0 5,5 0,0z";

var stems = $("#stems");
var leaves = $("#leaves");
var svg = $("svg");

var leafCount = 30;
var plants = 1;
var centerX = 275;
var offsetX = 0;
var gf = 0;
var points = createPoints();

$("#create").on("click", generate);
$("#increment").on("click", increment);

generate();

function increment() {
    gf = daysCompleted;
    // gf++;
    // console.log(gf)
    generate();
}

function generate() {
    leaves?.empty();
    if (gf === 0) {

        stems.empty();

    }


    _.times(plants, createPlant);

    stems?.children().each(function () {

        var tween = TweenMax.to(this, _.random(2, 4, true), {
            drawSVG: true,
            delay: _.random(2, true),
            onStart: () => TweenLite.set(this, { opacity: 1 }),
            onUpdate: () => events.fire(this.id, tween.progress())
        });
    });
}

function createPlant() {
    // var points = createPoints();

    var stem = createPath(stems);
    var length = points.length;
    var values = points.map(point => `${point.x},${point.y}`);
    var height = points[length - 1].y;
    var id = _.uniqueId("grow");
    var coords = [];

    for (var i = 0; i < length; i++) {
        var point = points[i];
        coords.push(point.x, point.y);
    }



    TweenLite.set(stem, {
        opacity: 0,
        drawSVG: 0,
        //attr: { id, d: `M${values.join(" ")}` }
        attr: { id, d: solve(coords) }
    });


    for (var i = 0; i < leafCount; i++) {
        var point = points[length - 1 - i];
        var scale = {
            x: 1 + 0.1 * i,
            y: 1 + 0.05 * i
        };
        createLeaf(point, scale, height, id);
    }
}

function createLeaf(point, scale, height, grow) {
    var leaf = createPath(leaves);
    var start = height / point.y;
    var off = events.on(grow, growLeaf);

    var leaf_size = 10 / 1.25 / gf;

    function growLeaf(growth) {

        if (growth >= start) {

            // Remove listener
            off();

            TweenLite.set(leaf, {
                x: point.x,
                y: point.y,
                // scaleX: scale.x,
                // scaleY: scale.y,

                scaleX: scale.x / leaf_size,
                scaleY: scale.y / leaf_size / 2,
                rotation: _.random(180) - 180,
                fill: `rgb(${0 + 50 * gf},${_.random(110, 160) / gf * 20},0)`,
                attr: { d }
            });

            TweenLite.from(leaf, 1, { scale: 0 });
        }
    }
}

function createPoints() {

    var x = _.random(centerX - offsetX, centerX + offsetX);
    var y = 500;
    var dy = 10;
    var offset = 0.005;
    var count = 50;
    var points = [{ x, y }];

    for (var i = 1; i <= count; i++) {
        points.push({
            x: points[i - 1].x + i * offset * (_.random(21) - 10),
            // y: 395 - dy * i
            y: 495 - dy * i
        });
    }
    return points;
}

function createPath(parent) {
    return $(document.createElementNS(ns, "path")).appendTo(parent);
}

function solve(data) {

    var size = data.length;
    var last = size - 4;

    var path = "M" + [data[0], data[1]];

    for (var i = 0; i < size - 2; i += 2) {

        var x0 = i ? data[i - 2] : data[0];
        var y0 = i ? data[i - 1] : data[1];

        var x1 = data[i + 0];
        var y1 = data[i + 1];

        var x2 = data[i + 2];
        var y2 = data[i + 3];

        var x3 = i !== last ? data[i + 4] : x2;
        var y3 = i !== last ? data[i + 5] : y2;

        var cp1x = (-x0 + 6 * x1 + x2) / 6;
        var cp1y = (-y0 + 6 * y1 + y2) / 6;

        var cp2x = (x1 + 6 * x2 - x3) / 6;
        var cp2y = (y1 + 6 * y2 - y3) / 6;

        path += "C" + [cp1x, cp1y, cp2x, cp2y, x2, y2];
    }

    return path;
}