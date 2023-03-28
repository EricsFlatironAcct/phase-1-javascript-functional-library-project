/*
myKeys(object)
Parameter(s): an object
Return value: An array
Behavior: Retrieve all the names of the object's enumerable properties.
*/
function myKeys(object){
    return Object.keys(object)
}

/*
myValues(object)
Parameter(s): an object
Return value: an array
Behavior: Return all of the values of the object's properties.
*/
function myValues(object){
    return Object.values(object)
}
/*
myEach(collection, callback)
Parameter(s):a collection (either an object or an array), a callback function
Return value: The original collection
Behavior: Iterates over the collection of elements, passing each element in turn to the callback function. Returns the original, unmodified, collection.
*/
function myEach(collection, callback){
    let collectionArr = myValues(collection) //Creates a copy of an array from an array or object's values
    for (let i=0;i<collectionArr.length;i++) callback(collectionArr[i]) //sends each value to the callback function
    return collection
}
/* 
myMap(collection, callback)
Parameter(s): a collection (either an object or an array), a callback function
Return value: A new array
Behavior: Produces a new array of values by mapping each value in collection through a transformation function, callback. Returns the new array without modifying the original.
*/

function myMap(collection, callback){
    let collectionArr = myValues(collection)
    const returnArr = []
    for (let i =0; i<collectionArr.length; i++) returnArr.push(callback(collectionArr[i]))
    return returnArr
}
/*
myReduce(collection, callback, acc)
Parameter(s): a collection (either an object or an array), a callback function, a starting value for the accumulator (optional)
Return value: A single value
Behavior: Reduce iterates through a collection of values and boils it down into a single value. 
acc (short for accumulator) starts at the value that's passed in as an argument, and with each successive step is updated to the return value of callback. 
If a start value is not passed to myReduce, the first value in the collection should be used as the start value.
The callback is passed three arguments: the current value of acc, the current element/value in our iteration, and a reference to the entire collection.
*/
function myReduce(collection, callback, acc = undefined){
    let collectionArr = myValues(collection)
    let iterator = 0
    if (acc == undefined){
        iterator = 1
        acc = collectionArr[0]
    }
    for (let i = iterator; i<collectionArr.length; i++) 
        acc = callback(acc, collectionArr[i], collectionArr)
    return acc;
}
/*
myFind(collection, predicate)
Parameter(s): a collection (either an object or an array), a predicate (a callback function that returns true or false)
Return value: A single value
Behavior: Looks through each value in the collection, returning the first one that passes a truth test (predicate) or undefined if no value passes the test. 
The function should return as soon as it finds an acceptable element, without traversing the rest of the collection.
*/
function myFind(collection, predicate){
    let collectionArr = myValues(collection)
    for(let i = 0; i<collectionArr.length;i++)  
        if (predicate(collectionArr[i]) === true) 
            return collectionArr[i]
    return undefined
}
/*
myFilter(collection, predicate)
Parameter(s): a collection (either an object or an array), a predicate (a callback function that returns true or false)
Return value: An array
Behavior: Looks through each value in the collection, returning an array of all the values that pass a truth test (predicate). 
If no matching values are found, it should return an empty array.
*/
function myFilter(collection, predicate){
    let collectionArr = myValues(collection)
    const returnArr = []
    for (let i =0; i<collectionArr.length; i++) 
        if(predicate(collectionArr[i])) 
            returnArr.push(collectionArr[i])
    return returnArr
}
/*
mySize(collection)
Parameter(s): a collection (either an object or an array)
Return value: An integer
Behavior: Return the number of values in the collection.
*/
function mySize(collection){
    if(typeof collection === Array) 
        return collection.length 
    else 
        return myKeys(collection).length 
}
/*
myFirst(array, [n])
Parameter(s): an array, an integer (optional)
Return value: A single element OR an array
Behavior: Returns the first element of an array. Passing n will return the first n elements of the array.
*/
function myFirst(array, n = undefined){
    if (n==undefined) 
        return array[0]
    const returnArr = []
    for (let i =0;i<n;i++) 
        returnArr.push(array[i])
    return returnArr
}
/*
myLast(array, [n])
Parameter(s): an array, an integer (optional)
Return value: A single element OR an array
Behavior: Returns the last element of an array. Passing n will return the last n elements of the array.
*/
function myLast(array, n= undefined){
    if (n==undefined)
        return array[array.length-1]
    const returnArr  = []
    for (let i = array.length-n; i<array.length;i++)
        returnArr.push(array[i])
    return returnArr
}


/*
BONUS: mySortBy
Note: Coding the mySortBy function is optional for this lab, so the tests for it have been disabled. You are free to skip it, but if you'd like to complete this additional challenge, simply un-comment out the relevant test code in test/indexTest.js.
mySortBy(array, callback)
Parameter(s): an array, a callback function
Return value: A new array
Behavior: Returns a sorted copy of array, ranked in ascending order by the results of running each value through callback. The values from the original array (not the transformed values) should be returned in the sorted copy, in ascending order by the value returned by callback.
Note: The point of this exercise is not to write your own sorting algorithm and you are free to use the native JS sort. You will, however, need to construct your compareFunction (see the documentation) so that it will handle either numeric or string values.
Example function calls:
mySortBy([1, 2, 3, 4, 5, 6], function(num){ return Math.sin(num) });
=> [5, 4, 6, 3, 1, 2];
const stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
mySortBy(stooges, function(stooge){ return stooge.name });
=> [{name: 'curly', age: 60}, {name: 'larry', age: 50}, {name: 'moe', age: 40}];
BONUS: If you would like to go deeper and try to construct your own sorting algorithm, this is a great extension. Check out this list of sorting algorithms implemented in JS with additional resources.
*/
function mySortBy(array, callback) {
    const sortedArr = [...array]
    if (typeof sortedArr[0] === 'number')sortedArr.sort((a, b) => callback(a)-callback(b))
    else sortedArr.sort((a, b) => callback(a).localeCompare(callback(b)))
    return sortedArr
  }
/*
BONUS: myFlatten
Note: Coding the myFlatten function is optional for this lab, so the tests for it have been disabled. You are free to skip it, but if you'd like to complete this additional challenge, simply un-comment out the relevant test code in test/indexTest.js.
myFlatten(array, [shallow], newArr=[])
Parameter(s): an array, a boolean value (optional), a new array (with an assigned default value of an empty array) that will contain the flattened elements
Return value: The new array
Behavior: Flattens a nested array (the nesting can be to any depth).
If you pass true for the second argument, the array will only be flattened a single level.
Example function calls:
myFlatten([1, [2], [3, [[4]]]]);
=> [1, 2, 3, 4];
myFlatten([1, [2], [3, [[4]]]], true);
=> [1, 2, 3, [[4]]];
Hint: This one is challenging! You will need to use recursion to make this work for the multi-level case. Think about why we need that third argument here. Also think about how to handle the two optional arguments when you call the function recursively.
*/
