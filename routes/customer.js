var express = require("express");
var router = express.Router();

let { rooms } = require("../data/apiData");
let { customers } = require("../data/apiData");

router.post("/book", function (req, res) {
  if (req.body.customerName && req.body.bookedRoomId) {
    let customerId = ++customers.count;
    let newCustomer = { customerId, ...req.body };

    customers.customerDetails.push(newCustomer);

    let bookedRoom = rooms.roomsDetails.find(
      (room) => room.id === req.body.bookedRoomId
    );
    let roomIndex = rooms.roomsDetails.indexOf(bookedRoom);
    rooms.roomsDetails[roomIndex].bookingStatus = "Booked";
    rooms.roomsDetails[roomIndex].bookedCustomerId = customers.count;

    res.json({
      message: "Room is booked",
      room_id: req.body.bookedRoomId,
      customerId: customerId,
    });
  } else {
    res.json({
      status: "Bad Request",
      message: "Room is not booked",
    });
  }
});

router.get("/customers", function (req, res) {
  if (customers.customerDetails.length) {
    let results = [];
    customers.customerDetails.forEach((data) => {
        let newData = {...data};
        let bookedcustomer = rooms.roomsDetails.find(
          (room) => room.id === data.bookedRoomId
        );
        let index = rooms.roomsDetails.indexOf(bookedcustomer);
        newData.RoomName = rooms.roomsDetails[index].name;
        results.push(newData);
    });
    res.json(results);
  } else {
    res.json([]);
  }
});

module.exports = router;
