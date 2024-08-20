var calendarEl = document.querySelector(".calendar");
var monthDisplayEl = $('#month');

var text = "Example ";
var currenyday = dayjs().format('D');

function displayTime() 
{
var currentTime = dayjs().format('MMMM YYYY');
monthDisplayEl.text(currentTime);
}

// This loop adds the dates and the data for each date on the calandar
for(let i =1; i <= 31; i++) {
       calendarEl.insertAdjacentHTML("beforeend", `
       <div id=day> ${i}
        <ul id="day${i}" class="dayUl">

        <li id="Calories${i}">Calories: </li>
        <li id="Weight${i}">Weight: </li>
        <li id="BMI${i}">BMI: </li>

       </ul> 
       </div>`);
}


//This gets the data from local storage and parses it. 
var allFoodData = localStorage.getItem('allFoodData');
allFoodData = JSON.parse(allFoodData);


var bmiData = localStorage.getItem('allBmiData');
bmiData = JSON.parse(bmiData);

//this accounts for multiple foods being submitted and updates new calories just for that day
var caloriesFinalList = {};

getCal();
function getCal(){
       for (var i = 0; i < allFoodData.length; i++) {

              foodDateIfSame= dayjs(allFoodData[i].date).format('D');
              if (!caloriesFinalList[foodDateIfSame]){
                     caloriesFinalList[foodDateIfSame]= 0;
              }
                            
              caloriesFinalList[foodDateIfSame] += (allFoodData[i].foodCalorie);   
       }    
}

var allData = {};


// this function gets the data from the local storage and saves it in var as an objects
function getData()
{


       //Added this code so we can initilize the data for each day. Otherwise we get error if nothing is in the local storage. 

       if (!bmiData)
       {   
              bmiData = [];
              
              for (let index = 0; index < 31; index++) {
                     allData[specificDate] = 
                     {
                         bmi: 0,
                         weight: 0,
                     };
              }
       }
      
              
       
       for (var i = 0; i < bmiData.length; i++)
       {
              const specificDayData = bmiData[i];
              var specificDate = dayjs(specificDayData.date).format('D');
              // console.log(specificDay);
              // console.log(specificDay.date);

              if (!allData[specificDate])
              {

                     // console.log("NO found")
                     //if iotds not there then define the object and set it to zero
                     allData[specificDate] = 
                     {
                         bmi: 0,
                         weight: 0,
                     };
                     // console.log( allData[specificDay.date].bmi);
                     // console.log( allData[specificDay.date].weigh)
               }
               // If the date is there then set the object to the data
              //  console.log("found")

               allData[specificDate].weight = Math.round(specificDayData.weight * 2.20462); // converts kg to lb and rounds number
               allData[specificDate].bmi = specificDayData.BMIResults;
              
       }

}

getData();
// console.log(bmiData);
// console.log(allData);
// console.log(allData[20].weight);
// console.log(allData[2].bmi);


//this allows for all the items in the data set to be put into the calendar
for (var i = 0; i < 31; i ++) {
       //this variable selects just the day of the month so that we can have it select the day on the calendar as well
       var dateFromStorage = i +1; //dayjs(allFoodData[i].date).format('D');
    
       //So these if statments will go over the 31 days and see if there is any daya for that date if not then set the data to zero if yes then display that data or display 0; 
       if (!allData[dateFromStorage])
       {
              allData[dateFromStorage] =
              {
                     bmi: 0,
                     weight: 0,
              }
              
       }

       if (!caloriesFinalList[dateFromStorage])
       {
              
              caloriesFinalList[dateFromStorage]= 0;
       }


       
       var calText = caloriesFinalList[dateFromStorage].toFixed(0);      
       var bmiText = allData[dateFromStorage].bmi;  
       var weightText = allData[dateFromStorage].weight;
       
       


       var cal = "#Calories" + dateFromStorage ;
       var bmi = "#BMI" + dateFromStorage;
       var weight = "#Weight" + dateFromStorage; 

       var calorieEl = $(cal);
       var bmiEl = $(bmi);
       var weightEl = $(weight);
       calorieEl.text("Calories: " + calText);  
       weightEl.text("Weight: " + weightText)
       bmiEl.text("BMI: " +bmiText )
}




// data retrieved from index.html and printed onto this page
displayTime();