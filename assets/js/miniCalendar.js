// mini calendar functions

document.addEventListener('DOMContentLoaded', function () {
    const calendarHeader = document.getElementById('month-name');
    const calendar = document.getElementById('mini-calendar');

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // stores the food data from the local storage into a variable
    const allFoodData = localStorage.getItem('allFoodData');

    const allBmiData = localStorage.getItem('allBmiData');

    const findBmi = (allBmiData) => {

        if (allBmiData) {
            const dataArray = JSON.parse(allBmiData);
            const newBmiArray = [];

            // iterates over the bmi data to find 'Balanced' or reccommended calorie intake
            if (dataArray.length === 0) {
                newBmiArray.push('');
            } else {
                for (let i = 0; i <dataArray.length; i++) {
                    const calRec = dataArray[i].Balanced;
                    const dateOfRec = dataArray[i].date; // finds the date that the recommendation was given
                    const newObj = {};
                    newObj[dateOfRec] = calRec;
                    newBmiArray.push(newObj);
                }
            } 

            
        
            return newBmiArray;
            
        } else {
            console.log('Array not found in local storage');
        }
    } 

 
 
    
    //function creates a new array of calories and their date of entry
    const caloriesArray = (allFoodData) => {

        if (allFoodData) {
            const dataArray = JSON.parse(allFoodData);
            const newCaloriesArray = [];
    
            // iterates over the food calories for each entry
            for (let i = 0; i <dataArray.length; i++) {
                const foodCalories = dataArray[i].foodCalorie;
                const dateOfEntry = dataArray[i].date;
                const newObj = {};
                newObj[dateOfEntry] = foodCalories;
                newCaloriesArray.push(newObj);
            }
            return newCaloriesArray;
        } else {
            console.log('Array not found in local storage');
        }
    }

    const addUpCalories = (x, y) => {
        console.log(y);
        if (x == undefined){
            x = "hi";
        }
        const caloriesArray = x;
        if (y == undefined){
            y = "hi";
        }
        
        const bmiArray = y;
        let dailyTotalCal = 0;

        for (let i = 0; i < caloriesArray.length; i++) {
            const dateForCal = Object.keys(caloriesArray[i])[0];
            const dateForBmi = Object.keys(bmiArray[0])[0];

            if (dateForCal === dateForBmi) {
                dailyTotalCal += Object.values(caloriesArray[i])[0]
            }
        }
        return dailyTotalCal;
    }


    function renderCalendar() {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const todaysDate = currentDate.getDate();

        var parsedData;
        if (allBmiData == null){
        
            parsedData == parseInt(Object.values(2));
        }
        else {
            parseInt(Object.values(findBmi(allBmiData)[0])[0]);
        }
        const topBmiEntry = parsedData;

         // the calories based on the date of a bmi entry
        const bmiDateCalConsumption = addUpCalories(caloriesArray(allFoodData), findBmi(allBmiData));

        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

        const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate(); // Get the number of days in the previous month
        const daysInNextMonth = 7 - ((firstDayOfMonth + daysInMonth) % 7); // Calculate the number of days to show from the next month to complete the last week

        let html = '';
        let dayCount = 0; // Counter to keep track of the number of days displayed

        // Render previous month's days
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            html += `<div class="col text-center not-current-month">${daysInPrevMonth - i}</div>`;
            dayCount++;
        }

        // Render current month's days
        for (let i = 1; i <= daysInMonth; i++) {
            if (dayCount % 7 === 0) {
                html += `</div><div class="row">`; // Start a new row after every 7 days
            }
            
            // Check if today's date matches the current date
            if (i === todaysDate && !topBmiEntry) {
                html += `<div class="col text-center todays-date">${i}</div>`; //adds the class .todays-date
            } else if (i === todaysDate && bmiDateCalConsumption < (topBmiEntry - 50)) {
                html += `<div class="col text-center todays-date">${i}</div>`; //adds the class .todays-date
            } else if (i === todaysDate && bmiDateCalConsumption >= (topBmiEntry - 50) && bmiDateCalConsumption <= (topBmiEntry + 50)) {
                html += `<div class="col text-center target-met">${i}</div>`; //adds the class .target-met
            } else if (i === todaysDate && bmiDateCalConsumption > (topBmiEntry + 50)) {
                html += `<div class="col text-center target-passed">${i}</div>`; //adds the class .target-passed
            } else {
                    html += `<div class="col text-center other-days">${i}</div>`;
            }

            dayCount++;
        }

        // Render next month's days
        for (let i = 1; i <= daysInNextMonth; i++) {
            html += `<div class="col text-center not-current-month">${i}</div>`;
            dayCount++;
        }

        calendarHeader.innerHTML = monthNames[currentMonth];
        calendar.innerHTML = html;
    }
    

    renderCalendar();
});
