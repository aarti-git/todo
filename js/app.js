var counter = 0;
var applicationState = "all";
var downClick = false;

// localstore using on refresh save data
var locStor = "list";
var savedList = localStorage.getItem(locStor);

//
function myfunction(event, el) {
  if (event.keyCode === 13) {
    var inputV = el.value;
    localStorage.setItem(locStor, inputV);
    addNewList(inputV);
    el.value = "";
    updateInfo();
  }
}

function addNewList(word) {
  var n = word;
  var list = document.createElement("li");
  list.innerHTML =
    "<input type='checkbox' class='checboox-edit' onclick='inputCheckbox(this)''>" +
    "<span id='inputtext' onkeyup='printText(this, event)'>" +
    n +
    "</span>" +
    "<button class='cross-button' onclick='reMoveList(this)'> x </button>";

  document.getElementById("note-list").appendChild(list);
  list.classList.add("text-input");
  list.classList.add("list-design");

  var myspan = list.querySelector("#inputtext");
  // var x = myspan.innerText;

  myspan.addEventListener("dblclick", function (event) {
    myspan.innerHTML =
      "<input type='text' name='value' value='" +
      myspan.innerText +
      "' id='editTextWorde''>";

    //console.log(n);
  });
  //

  //new list elemrnt remove in complit list ..
  if (applicationState == "completed") {
    list.style.display = "none";
  }
}

function updateInfo() {
  var downButton = document.getElementById("down-button");
  downButton.style.display = "block";

  //console.log(n);
  // this code for counter add(+) number items left.
  counter = counter + 1;
  var countNo = document.querySelector(".items");
  countNo.innerHTML = counter + " items left";

  // this code for footer display block or none
  var footerNote = document.querySelector(".todo-footer-section");
  footerNote.style.display = "block";
}

function reMoveList(element) {
  element.parentElement.remove();

  // this code for counter mines(-) number items left.
  counter = counter - 1;
  var countNo = document.querySelector(".items");
  countNo.innerHTML = counter + " items left";
  if (counter == 0) {
    var footerNote = document.querySelector(".todo-footer-section");
    footerNote.style.display = "none";
  }
}

function printText(el, event) {
  if (event.keyCode === 13) {
    var editText = document.querySelector("#editTextWorde").value;
    el.innerHTML = editText;
    console.log(editText);
  }
}

function inputCheckbox(el) {
  var getClearBtn = document.getElementById("clear-btn");
  if (el.checked) {
    console.log("true");
    el.nextSibling.classList.add("checkcss");
    getClearBtn.style.display = "inline-block";
    getClearBtn.style.border = "1px solid #daa520";
    if (applicationState == "active") {
      el.parentElement.style.display = "none";
    }
    //nextsibling is add (chekbox) to input tag and nextsibling is get a span tag (n )
  } else {
    console.log("false");
    el.nextSibling.classList.remove("checkcss");
    getClearBtn.style.display = "none";
    if (applicationState == "completed") {
      el.parentElement.style.display = "none";
    }
  }
}

function clearCompleted() {
  var footer = document.querySelector(".todo-footer-section");
  getCheckbox(function (item) {
    var itemParent = item.parentElement;
    if (item.checked) {
      itemParent.remove();
      counter = counter - 1;
    }
    document.querySelector(".items").innerHTML = counter + " items left";
    if (counter == 0) {
      footer.style.display = "none";
    }
  });
}

//celarCCliked = false;
function downButtoChecked(el) {
  var getClearBtn = document.getElementById("clear-btn");
  getClearBtn.style.display = "inline-block";

  getCheckbox(function (item) {
    if (downClick == false) {
      //conditin true
      item.checked = true;
      item.nextSibling.classList.add("checkcss");
    } else {
      item.checked = false;
      item.nextSibling.classList.remove("checkcss");
      getClearBtn.style.display = "none";
    }
  });

  downClick = !downClick;
}

function allList() {
  applicationState = "all";
  stateToggler(true, "block");
}

function completList() {
  applicationState = "completed";
  stateToggler(false, "block", "none");
}

function activList() {
  applicationState = "active";
  stateToggler(false, "none", "block");
}

function stateToggler(toAll, hs1, hs2) {
  getCheckbox(function (item) {
    var itemParent = item.parentElement;

    if (toAll) {
      itemParent.style.display = hs1;
    } else {
      if (item.checked) {
        itemParent.style.display = hs1;
      } else {
        itemParent.style.display = hs2;
      }
    }
  });
}

function getCheckbox(callback) {
  var allcheckbox = document.querySelectorAll(".checboox-edit");
  for (var i = 0; i < allcheckbox.length; i++) {
    var item = allcheckbox[i];
    callback(item);
  }
}

var btnHeader = document.querySelector(".todo-footer");
var btns = btnHeader.getElementsByClassName("btn");
// let d = "hello";
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
