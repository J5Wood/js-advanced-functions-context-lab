function createEmployeeRecord(employee) {
    const newEmployee = {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return newEmployee;
}

function createEmployeeRecords(employees) {
    const employeeRecords = employees.map(employee => createEmployeeRecord(employee));
    return employeeRecords;
}

function formatDateHour(time, type) {
    return {type: type, date: time.split(" ")[0], hour: parseInt(time.split(" ")[1])}
}

function createTimeInEvent(time) {
    this.timeInEvents.push(formatDateHour(time, "TimeIn"));
    return this;
}

function createTimeOutEvent(time) {
    this.timeOutEvents.push(formatDateHour(time, "TimeOut"));
    return this;
}

function hoursWorkedOnDate(requestedDate) {
    const clockIn = this.timeInEvents.find( workday => workday.date === requestedDate).hour;
    const clockOut = this.timeOutEvents.find( workday => workday.date === requestedDate).hour;
    const hours = (clockOut - clockIn) * .01;
    return hours;
}

function wagesEarnedOnDate(date) {
    return this.payPerHour * hoursWorkedOnDate.call(this, date);
}

function calculatePayroll(employees) {
    const wageList = employees.map(employee => allWagesFor.call(employee));
    return wageList.reduce((total, arr) => total + arr);
}

function findEmployeeByFirstName(employees, name) {
    return employees.find(employee => employee.firstName === name);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}