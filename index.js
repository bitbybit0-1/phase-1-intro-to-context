// Your code here
/*Employees always check in and check out.
Employees always check in and out on the hour.
The time is represented on a 24-hour clock (1300 is 1:00 pm); this keeps the math easier and is the standard in most of the world.
When timestamps are needed, they will be provided as Strings in the form: "YYYY-MM-DD 800" or "YYYY-MM-DD 1800" e.g. "2018-01-01 2300".
Employees will never work across days, e.g., in at 2200 and out at 0400 the next day.*/


function createEmployeeRecord(array){
return {firstName:array[0],familyName:array[1],title:array[2], payPerHour:array[3],timeInEvents:[], timeOutEvents:[] }
}
function createEmployeeRecords(employees){
const looper= employees.map(element=> createEmployeeRecord(element))
return looper
}





function createTimeInEvent(object,timeStamp){
const hour = parseInt(timeStamp.slice(11))

const date = timeStamp.slice(0,10)
object.timeInEvents.push({type:"TimeIn",hour:hour,date:date})
return object

}
function createTimeOutEvent(employee,timeStamp){
const [date,hour] = timeStamp.split(" ")
const hours=parseInt(hour)
employee.timeOutEvents.push({type:"TimeOut",hour:hours, date:date})

return employee

}
/*hoursWorkedOnDate
Argument(s)
An employee record Object
A date of the form "YYYY-MM-DD"
Returns
Hours worked, an Integer
Behavior
Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent*/
 function hoursWorkedOnDate(employee,timestamp){
    
const flush=employee.timeInEvents.filter(element=>{
    return element.date===timestamp
   })
     
const flushTwo=employee.timeOutEvents.filter(employee=>{
   return employee.date===timestamp
   
    })
    return (flushTwo[0].hour-flush[0].hour)/100
 }
function wagesEarnedOnDate(employee,timestamp){
const hours = hoursWorkedOnDate(employee,timestamp)
return hours*employee.payPerHour
}
function allWagesFor(employee){
    let payDays = employee.timeInEvents.map(timeIn=> timeIn.date)
    let accountsPayable = payDays.reduce((memo,d)=>{
        return memo+wagesEarnedOnDate(employee,d)
    },0)
return accountsPayable
}
function calculatePayroll(employee){
    return employee.reduce((accumulator,record)=>accumulator+allWagesFor(record),0)
}
   