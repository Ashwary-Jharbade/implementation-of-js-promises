// Nested promise call

function findOutPlanetEarthCore(flag) {
  return new Promise((resolve, reject) => {
    if (flag) {
      console.log("Crust");
      resolve(
        new Promise((resolve, reject) => {
          if (flag) {
            console.log("Mantle");
            resolve(
              new Promise((resolve, reject) => {
                if (flag) {
                  console.log("Outer Core");
                  resolve(
                    new Promise((resolve, reject) => {
                      if (flag) {
                        console.log("Innner core");
                        resolve("Mission Accomplished");
                      }
                      reject("No Inner Core");
                    })
                  );
                }
                reject("No Outer Core");
              })
            );
          }
          reject("No Mantle");
        })
      );
    }
    reject("No Crust");
  });
}

findOutPlanetEarthCore(true)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });

// o/p
// Crust
// Mantle
// Outer Core
// Innner core
// Mission Accomplished

findOutPlanetEarthCore(false)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });

// o/p
// index.html:1 Uncaught (in promise) No Crust

// Nested function returning promise and Prmoise chaining

function greaterThan10(a, b) {
  return new Promise((resolve, reject) => {
    if (a + b > 10) {
      resolve(greaterThan20(a + b, 10));
    }
    reject(a + b);
  });
}

function greaterThan20(a, b) {
  return new Promise((resolve, reject) => {
    if (a + b > 20) {
      resolve(greaterThan30(a + b, 10));
    }
    reject(a + b);
  });
}

function greaterThan30(a, b) {
  return new Promise((resolve, reject) => {
    if (a + b > 30) {
      resolve(a + b);
    }
    reject(a + b);
  });
}

greaterThan10(5, 6)
  .then((data) => {
    return data;
  })
  .then((res) => {
    return res;
  })
  .then((result) => {
    console.log(result); // o/p 31
  })
  .catch((err) => {
    console.error(err);
  });

// Prmoise.all
Promise.all([
  greaterThan10(5, 6),
  greaterThan20(10, 11),
  greaterThan30(20, 15),
]).then((val) => {
  console.log(val); // o/p [31, 31, 35]
});

Promise.all([
  greaterThan10(5, 6),
  greaterThan20(10, 10),
  greaterThan30(20, 15),
]).then((val) => {
  console.log(val); // o/p Uncaught (in promise) 20
});

// Prmoise.allSettled
Promise.allSettled([
  greaterThan10(5, 6),
  greaterThan20(10, 10),
  greaterThan30(20, 15),
]).then((val) => {
  console.log(val);
  // o/p
  // (3) [{…}, {…}, {…}]
  // 0: {status: 'fulfilled', value: 31}
  // 1: {status: 'rejected', reason: 20}
  // 2: {status: 'fulfilled', value: 35}
  // length: 3
  // [[Prototype]]: Array(0)
});

// Prmoise.any
Promise.any([
  greaterThan10(5, 6),
  greaterThan20(10, 11),
  greaterThan30(20, 15),
]).then((val) => {
  console.log({ "Promise.any": val }); // o/p - {Promise.any: 35}
});

Promise.any([
  greaterThan10(5, 6),
  greaterThan20(10, 11),
  greaterThan30(20, 10),
]).then((val) => {
  console.log({ "Promise.any": val }); // o/p - {Promise.any: 31}
});

Promise.any([
  greaterThan10(5, 6),
  greaterThan20(10, 10),
  greaterThan30(20, 10),
]).then((val) => {
  console.log({ "Promise.any": val }); // o/p - {Promise.any: 31}
});

// Prmoise.race
Promise.race([greaterThan10(5, 6), greaterThan30(10, 21)]).then((val) => {
  console.log("Promise.race", val);
});

let promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "one");
});

let promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "two");
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value);
  // Both resolve, but promise2 is faster
});
// expected output: "two"

promise1 = new Promise((resolve, reject) => {
  setTimeout(reject, 500, "one");
});

promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "two");
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value);
  // Both resolve, but promise2 is faster
});
// expected output: "two"

promise1 = new Promise((resolve, reject) => {
  setTimeout(reject, 50, "one");
});

promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "two");
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value);
  // Both resolve, but promise1 is faster
});
// expected output: Uncaught (in promise) one
