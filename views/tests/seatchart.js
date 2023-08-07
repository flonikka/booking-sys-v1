//** testing **//
$(function () {
  $("#selectable").selectable({
    filter: "li:not(.selectable-disabled)",
    stop: function () {
      var result = "";

      $(".ui-selected", this)
        .each(function () {
          result += " #" + ($(this).index() + 1);
        })
        .addClass("selectable-disabled")
        .removeClass("ui-selected");

      $("#select-result").html(result || "none");
    },
  });

  $("#restore").click(function () {
    $(".selectable-disabled").removeClass("selectable-disabled");
  });
});

$(document).ready(function () {
  $(".delete").click(function () {
    $(".items").hide();
  });
});
//** testing **//

const myElement = document.getElementById("container");
myElement.style.color = "red";
// myElement.innerHTML = "This is test";

// testing DOM
const test = document.querySelector(".test");
const renderText = () => {
  let liButton = "";
  for (let index = 0; index < 20; index++) {
    liButton += `<li>I am button</li>`;
    test.innerHTML = liButton;
  }
};
renderText();

$(document).ready(function () {
  $("#tab-tab_700964 a").on("click", function () {
    $(".tcw-content").html("hey");
  });
});

function myFunction() {
  const element = document.getElementById("myDIV");
  element.getElementsByClassName("child")[1].style.fontSize = "24px";
}

const roomT = document.querySelector(".roomType");
multiTime = document.querySelectorAll(".seat div");

// clicking => room CSS
$(document).ready(function () {
  // const element = document.getElementById("seat");
  // console.log(element.getElementsByClassName("aT")[2].innerHTML);

  $("#seat").on("click", function () {
    $(".roomType").html(function () {
      roomT.innerHTML = `<td>
      <div class = "sc-ticket first-class">
      <div class="sc-ticket-stripes"></div>
      <div class="sc-ticket-seat-label time"></div>
      <div class="sc-ticket-seat-type room"></div>
      <div class="sc-ticket-stripes"></div></div></td>
      <td>$25.00</td>
      <td><button class="sc-cart-btn sc-cart-btn-delete" type="button">
      <div class="sc-cart-btn-icon"></div></button></td>`;
    });
  });
});

//** testing script

// clicking => time slot
$(document).ready(function () {
  $("#seat .aT").on("click", function () {
    $(".time").html(function () {
      return document.getElementById("aTime").innerHTML;
    });
  });
});

// clicking => room
$(document).ready(function () {
  $(".seat").on("click", function () {
    $(".room").html(function () {
      return document.getElementById("roomA").innerHTML;
    });
  });
});

//** muti selcet, empyt button, confirmation table
