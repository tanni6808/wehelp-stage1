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
  { name: "John", booked: [] },
  { name: "Bob", booked: [] },
  { name: "Jenny", booked: [] },
];
function book(consultants, hour, duration, criteria) {
  // your code here
  // list hour that wanted to book
  let bookHours = [];
  for (let i = 0; i < duration; i++) {
    bookHours.push(hour + i);
  }
  // console.log(bookHours);
  // find available consultants
  let availableConsultants = [];
  bookingStatus.forEach((consultant) => {
    const result = consultant.booked.filter((hour) => bookHours.includes(hour));
    // console.log(consultant.name, result[0]);
    if (!result[0]) {
      availableConsultants.push(
        consultants.filter((el) => el.name == consultant.name)[0]
      );
    }
  });
  if (!availableConsultants[0]) {
    console.log("No Service");
    return;
  }
  // choose the best one base on criteria
  if (criteria == "price")
    availableConsultants.sort((a, b) => a.price - b.price);
  else availableConsultants.sort((a, b) => b.rate - a.rate);
  const bookedConsultant = availableConsultants[0];
  console.log(bookedConsultant.name);

  // mark booking status
  bookHours.forEach((hour) =>
    bookingStatus
      .filter((el) => el.name == bookedConsultant.name)[0]
      .booked.push(hour)
  );
  // console.log(bookingStatus);
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

const findMiddleName = function (name) {
  if (name.length == 2 || name.length == 3) return name[1];
  if (name.length == 4 || name.length == 5) return name[2];
};

function func(...data) {
  // your code here
  // create an array for data
  const names = [...data];
  const middleNames = names.map((name) => findMiddleName(name));
  let unique = false;
  // for each middle name, use filter to find the same; if length>1, it's not unique
  middleNames.forEach((middlename) => {
    if (middleNames.filter((el) => el == middlename).length == 1) {
      console.log(names[middleNames.indexOf(middlename)]);
      unique = true;
    }
  });
  if (!unique) console.log("沒有");
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
  let acc = 0;
  let i = 0;
  while (i < index) {
    if ((i + 1) % 3 === 0) {
      acc -= 1;
    } else acc += 4;
    i++;
  }
  console.log(acc);
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
  // set stat of unavailable car to -1
  for (i = 0; i < spaces.length; i++) {
    if (stat[i] === 0) spaces[i] = -1;
  }
  // calc. difference between n & space in every car
  const diff = spaces.map((space) => space - n);
  // filter & sort diff
  const diffSorted = diff.filter((d) => d >= 0).sort((a, b) => a - b);
  // if there's no avaliable car
  if (!diffSorted.length) {
    console.log(-1);
    return;
  }
  // choose the first one
  const indexOfCar = spaces.indexOf(diffSorted[0] + n);
  // print the index of most fitted car
  console.log(indexOfCar);
}
find([3, 1, 5, 4, 3, 2], [0, 1, 0, 1, 1, 1], 2); // print 5
find([1, 0, 5, 1, 3], [0, 1, 0, 1, 1], 4); // print -1
find([4, 6, 5, 8], [0, 1, 1, 1], 4); // print 2
