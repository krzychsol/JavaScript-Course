
describe("rentRoomWithoutArguments", function(){
    it("returns error about invalid number of arguents", function(){
        const result = rentRoom(event);
        expect(result).toEqual("error1");
    })
})

describe("returnRoomWithoutArguments", function(){
    it("returns error about invalid number of arguents", function(){
        const result = rentRoom(event);
        expect(result).toEqual("error1");
    })
})

describe("tryToRentRoomWhichNotExist", function(){
    it("return error when you try to rent a room which not exist", function(){
        const result = !mockup.hasOwnProperty(10);
        expect(result).toEqual(true);
    })
})

describe("tryToReturnRentedRoom", function(){
    it("returns error when you try to return room which is not rented", function(){
        const room = mockup[2];
        const customer_name = "Jan Kowalski";
        const result = room.rent_by != null && customer_name.localeCompare(room.rent_by) == 0;
        expect(result).toEqual(true);
    })
})
