// task 1
console.log("=== Task 1 ===");

function findAndPrint(messages, currentStation) {
  // your code here
  const greenLine = {
    main: [
      "Songshan",
      "Nanjing Sanmin",
      "Taipei Arena",
      "Nanjing Fuxing",
      "Songjiang Nanjing",
      "Zhongshan",
      "Beimen",
      "Ximen",
      "Xiaonanmen",
      "Chiang Kai-Shek Memorial Hall",
      "Guting",
      "Taipower Building",
      "Gongguan",
      "Wanlong",
      "Jingmei",
      "Dapinglin",
      "Qizhang",
      "Xindian City Hall",
      "Xindian",
    ],
    sub: ["Qizhang", "Xiaobitan"],
  };

  // find my current position (['line', index])
  let myCurrentPosition = [];
  for (const [line, stations] of Object.entries(greenLine)) {
    if (stations.includes(currentStation)) {
      myCurrentPosition = [line, stations.indexOf(currentStation)];
      break;
    }
  }

  // for each message, create an object to record their 1. name 2. position
  let friendsPosition = [];
  for (const [name, message] of Object.entries(messages)) {
    for (const [line, stations] of Object.entries(greenLine)) {
      stations.forEach((station, i) => {
        if (message.includes(station)) {
          friendsPosition.push({ name: name, position: [line, i] });
          return;
        }
      });
    }
  }
  // calc. distances
  friendsPosition.forEach((friend) => {
    if (friend.position[0] === myCurrentPosition[0]) {
      friend.distance = Math.abs(friend.position[1] - myCurrentPosition[1]);
    } else {
      const atMain =
        friend.position[0] === "main" ? friend.position : myCurrentPosition;
      friend.distance =
        Math.abs(greenLine.main.indexOf("Qizhang") - atMain[1]) + 1;
    }
  });
  // find nearest friends and print them out
  const nearestFriends = friendsPosition
    .sort((a, b) => a.distance - b.distance)
    .filter((friend) => friend.distance === friendsPosition[0].distance);
  console.log(nearestFriends.map((friend) => friend.name).join(", "));
}
const messages = {
  Bob: "I'm at Ximen MRT station.",
  Mary: "I have a drink near Jingmei MRT station.",
  Copper: "I just saw a concert at Taipei Arena.",
  Leslie: "I'm at home near Xiaobitan station.",
  Vivian: "I'm at Xindian station waiting for you.",
};
findAndPrint(messages, "Wanlong"); // print Mary
findAndPrint(messages, "Songshan"); // print Copper
findAndPrint(messages, "Qizhang"); // print Leslie
findAndPrint(messages, "Ximen"); // print Bob
findAndPrint(messages, "Xindian City Hall"); // print Vivian

//////////////////////////////////////
// task 2
console.log("=== Task 2 ===");

// your code here, maybe

const bookingStatus = [
  { name: "John", booked: [15] },
  { name: "Bob", booked: [12] },
  { name: "Jenny", booked: [10] },
];
function book(consultants, hour, duration, criteria) {
  // your code here
  // list hour that wanted to book
  let bookHours = [];
  for (let i = 0; i < duration; i++) {
    bookHours.push(hour + i);
  }
  console.log(bookHours);
  // find available consultants
  let availableConsultants = [];
  bookingStatus.forEach((consultant) => {
    const result = consultant.booked.filter((hour) => bookHours.includes(hour));
    console.log(consultant.name, result);
  });
  // choose the best one base on criteria
}
const consultants = [
  { name: "John", rate: 4.5, price: 1000 },
  { name: "Bob", rate: 3, price: 1200 },
  { name: "Jenny", rate: 3.8, price: 800 },
];
book(consultants, 15, 1, "price"); // Jenny
book(consultants, 11, 2, "price"); // Jenny
book(consultants, 10, 2, "price"); // John
book(consultants, 20, 2, "rate"); // John
book(consultants, 11, 1, "rate"); // Bob
book(consultants, 11, 2, "rate"); // No Service
book(consultants, 14, 3, "price"); // John

//////////////////////////////////////
// task 3
console.log("=== Task 3 ===");

function func(...data) {
  // your code here
}
func("彭大牆", "陳王明雅", "吳明"); // print 彭大牆
func("郭靜雅", "王立強", "郭林靜宜", "郭立恆", "林花花"); // print 林花花
func("郭宣雅", "林靜宜", "郭宣恆", "林靜花"); // print 沒有
func("郭宣雅", "夏曼藍波安", "郭宣恆"); // print 夏曼藍波安

//////////////////////////////////////
// task 4
console.log("=== Task 4 ===");

function getNumber(index) {
  // your code here
}
getNumber(1); // print 4
getNumber(5); // print 15
getNumber(10); // print 25
getNumber(30); // print 70

//////////////////////////////////////
// task 5
console.log("=== Task 5 ===");

function find(spaces, stat, n) {
  // your code here
}
find([3, 1, 5, 4, 3, 2], [0, 1, 0, 1, 1, 1], 2); // print 5
find([1, 0, 5, 1, 3], [0, 1, 0, 1, 1], 4); // print -1
find([4, 6, 5, 8], [0, 1, 1, 1], 4); // print 2
