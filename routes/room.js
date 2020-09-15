var express = require("express");
var router = express.Router();

let { rooms } = require("../data/apiData");
let { customers } = require("../data/apiData");

router.post("/room", function (req, res) {
  if (req.body.seatsCount && req.body.amenities && req.body.price) {
    rooms.count += 1;
    let id = rooms.count;
    let name = `Room ${rooms.count}`;
    let newRoom = {
      id,
      name,
      bookingStatus: "Not Booked",
      ...req.body,
    };
    rooms.roomsDetails.push(newRoom);
    res.json({
      status: "Data updated",
      message: "Room is created",
      room_id: id,
    });
  } else {
    res.json({
      status: "Data not updated",
      message: "No data passed",
    });
  }
});

router.get("/rooms", function (req, res) {
  if (rooms.roomsDetails.length) {
    let results = [];
    rooms.roomsDetails.forEach((data) => {
        let newData = {id : data.id, name : data.name, bookingStatus : data.bookingStatus}
      if (data.bookedCustomerId !== undefined) {
        let bookedcustomer = customers.customerDetails.find(
          (user) => user.customerId === data.bookedCustomerId
        );
        let index = customers.customerDetails.indexOf(bookedcustomer);
        newData.customerName = customers.customerDetails[index].customerName;
        newData.date = customers.customerDetails[index].date;
        newData.startTime = customers.customerDetails[index].startTime;
        newData.endTime = customers.customerDetails[index].endTime;
      }
      results.push(newData)
    });
    res.json(results);
  }
  else{
      res.json({
          status : 'Bad Request',
          message : 'No data Available'
      })
  }
});

module.exports = router;
