const times = [
  { time: "10:00", int: 10 },
  { time: "10:30", int: 10.5 },
  { time: "11:00", int: 11 },
  { time: "11:30", int: 11.5 },
  { time: "12:00", int: 12 },
  { time: "12:30", int: 12.5 },
  { time: "13:00", int: 13 },
  { time: "13:30", int: 13.5 },
  { time: "14:00", int: 14 },
  { time: "14:30", int: 14.5 },
  { time: "15:00", int: 15 },
  { time: "15:30", int: 15.5 },
  { time: "16:00", int: 16 },
  { time: "16:30", int: 16.5 },
  { time: "17:00", int: 17 },
  { time: "17:30", int: 17.5 },
  { time: "18:00", int: 18 },
  { time: "18:30", int: 18.5 },
  { time: "19:00", int: 19 },
  { time: "19:30", int: 19.5 },
  { time: "20:00", int: 20 },
  { time: "20:30", int: 20.5 },
  { time: "21:00", int: 21 },
  { time: "21:30", int: 21.5 },
];

/* add cart -> selected items */
$(function () {
  let bookDiv = "";
  $(".sc-seat").on("click", function () {
    const roomType = $(this).toggleClass("select-disabled");
    const room1 = "Room A";
    const room2 = "Room B1";
    const room3 = "Room B2";
    let selectedSession1 = [];
    let selectedSession2 = [];
    let selectedSession3 = [];

    if ($(this).hasClass("room1")) {
      $(".room1").on("click", function () {});
      const session = $(this).data("sec");
      const selected = `
      <tr class="items">
      <td>
      <div class="sc-ticket room1">
      <div class="sc-ticket-stripes"></div>
      <div class="sc-ticket-seat-label">${session}</div>
      <div class="sc-ticket-seat-type">${room1}</div>
      <div class="sc-ticket-stripes"></div></td>
      <td></td>
      </div>
      <td>
      </td>
      </tr>  
      `;
      $(".cart-items").append(selected);

      bookDiv = selected;
      selectedSession1.push(session);
      console.log(session);
      console.log(selectedSession1);
    } else if ($(this).hasClass("room2")) {
      $(".room2").on("click", function () {});
      const session = $(this).data("sec");
      const selected = `
      <tr class="items">
      <td>
      <div class="sc-ticket room2">
      <div class="sc-ticket-stripes"></div>
      <div class="sc-ticket-seat-label">${session}</div>
      <div class="sc-ticket-seat-type">${room2}</div>
      <div class="sc-ticket-stripes"></div></td>
      <td></td>
      </div>
      <td>
      </td>
      </tr>  
      `;
      $(".cart-items").append(selected);

      bookDiv = selected;
      selectedSession2.push(session);
      console.log(session);
      console.log(selectedSession2);
    } else {
      $(".room3").on("click", function () {});
      const session = $(this).data("sec");
      const selected = `
      <tr class="items">
      <td>
      <div class="sc-ticket room3">
      <div class="sc-ticket-stripes"></div>
      <div class="sc-ticket-seat-label">${session}</div>
      <div class="sc-ticket-seat-type">${room3}</div>
      <div class="sc-ticket-stripes"></div></td>
      <td></td>
      </div>
      <td>
      </td>
      </tr>  
      `;
      $(".cart-items").append(selected);

      /* button = 
    <button class="sc-cart-btn sc-cart-btn-delete" type="button">
    <div class="sc-cart-btn-icon"></div>
    </button>*/
      bookDiv = selected;
      console.log(bookDiv);
      selectedSession3.push(session);
      console.log(session);
      console.log(selectedSession3);
    }
    /* delete items */
    // $(".items").click(function () {
    //   $(".sc-seat").removeClass("select-disabled");
    // });

    /* Selected Room CSS */
    // const seatSelected = document.querySelectorAll(".addRoom");
    // seatSelected.forEach((addRoom) => {
    //   addRoom.addEventListener("click", function () {
    //     this.classList.toggle("sc-seat-reserved");
    //   });
    // });

    /* render booked times with time-range */
    const checkString = () => {
      $("#reserve").on("click", function () {
        $(this).toggleClass("select-disabled");

        $(".cart-items").children().remove();

        const refreshButton = document.querySelector(".res");
        const refreshPage = () => {
          location.reload();
        };
        refreshButton.addEventListener("click", refreshPage);

        // console.log(selectedSession1);
        // console.log(selectedSession2);

        const elements = `
        <div class="sc-ticket room1">
        <div class="sc-ticket-stripes"></div>
        <div class="sc-ticket-seat-label">${num}</div>
        <div class="sc-ticket-seat-type"></div>
        <div class="sc-ticket-stripes"></div></td>
        `;
        $(".book-confirm").append(elements);
        // $(".book-confirm").innerText = "`${num}`";
      });

      const session = $(this).data("sec");
      let num = [];
      for (i = 0; i < times.length; i++) {
        if (times[i].time === session) {
          num.push(times[i].int);
          console.log(num);
          return num;
        }
      }
    };
    checkString();

    const clearItems = () => {
      /* empty cart */
      $(".emptyCart").click(function () {
        $(".cart-items").children().remove();
        $(".book-confirm").children().remove();
        $(".sc-seat").removeClass("select-disabled");
        $("#reserve").removeClass("select-disabled");
        return false;
      });
    };
    clearItems();
  });
});

//** next step develop => time calculate **//

//* Reserved Room CSS <-> backend *//
