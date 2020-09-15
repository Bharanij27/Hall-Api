let rooms = {
    "count": 5,
    "roomsDetails": [
        {
            "id": 1,
            "name": "Room 1",
            "bookingStatus": "Booked",
            "bookedCustomerId" : 1,
            "seatsCount": 50,
            "amenities": [
                "AC",
                "Wifi",
                "LED TV"
            ],
            "price": 2000
        },
        {
            "id": 2,
            "name": "Room 2",
            "bookingStatus": "Not Booked",
            "seatsCount": 60,
            "amenities": [
                "AC"
            ],
            "price": 1500
        },
        {
            "id": 3,
            "name": "Room 3",
            "bookingStatus": "Booked",
            "bookedCustomerId" : 3,
            "seatsCount": 100,
            "amenities": [
                "AC",
                "Telephone"
            ],
            "price": 3000
        },
        {
            "id": 4,
            "name": "Room 4",
            "bookingStatus": "Booked",
            "bookedCustomerId" : 2,
            "seatsCount": 60,
            "amenities": [
                "AC",
                "LED lamp"
            ],
            "price": 1800
        },
        {
            "id": 5,
            "name": "Room 5",
            "bookingStatus": "Not Booked",
            "seatsCount": 90,
            "amenities": [
                "AC",
                "wifi",
                "LED lamp"
            ],
            "price": 3500
        }
    ]
}

let customers = {
    count : 3,
    customerDetails : [
        {
            customerId : 1,
            customerName : "Aaron",
            bookedRoomId : 1,
            date : "10-9-2020",
            startTime : "16:00",
            endTime : "20:00"
        },
        {
            customerId : 2,
            customerName : "John",
            bookedRoomId : 4,
            date : "27-6-2020",
            startTime : "09:00",
            endTime : "12:00"
        },
        {
            customerId : 3,
            customerName : "Mary",
            bookedRoomId : 3,
            date : "20-8-2020",
            startTime : "18:00",
            endTime : "21:00"
        }
    ]
}

module.exports = {rooms, customers}