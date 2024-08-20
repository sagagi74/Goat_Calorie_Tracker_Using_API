
var timeDisplayEl = $('#time-display');
var trackerDisplayBmiEl = $('#project-display-bmi');
 
var trackerFormBmiEl = $('#project-form-bmi');
var trackerBmiAgeEl = $('#age-input-bmi');
var trackerBmiGenderEl = $('#gender-input-bmi');
var trackerBmiHeightEl = $('#height-input-bmi');
var trackerBmiWeightEl = $('#weight-input-bmi');
var trackerBmiDateInputEl = $('#date-input-bmi');

//adding additional fields and declare 
var trackerBmiFirstNameEl = $('#firstName-input-bmi');
var trackerBmiLastNameEl = $('#lastName-input-bmi');
var trackerBmiNeckEl = $('#neck-input-bmi');
var trackerBmiHipEl = $('#hip-input-bmi');

//edning with adding additional fields
var displayFirstNameEl = $('#fName');
var diaplyLastNameEl = $('#lname');

//global variables
var bmiCalorieBalance;
var globalCalories_data;
let CaloriesobjectData;
let BMIarrayData;
let BFParrayData;



const firstNameElement = document.getElementById('displayFirstName');
const lastNameElement = document.getElementById('displayLastName');
const ageElement = document.getElementById('displayAge');
const genderElement = document.getElementById('displayGender');
const heightElement = document.getElementById('displayHeight');
const weightElement = document.getElementById('displayWeight');
const neckElement = document.getElementById('displayNeck');
const hipElement=  document.getElementById('displayHip');
const BMIElement = document.getElementById('displayBMI');
const BFPElement = document.getElementById('displayBFP');
const BlancedElement = document.getElementById('displayBalanced');

const HeavyGainElement=  document.getElementById('displayHeavyGain');
const displayHeavyLossElement = document.getElementById('displayHeavyLoss');
const MildGainElement = document.getElementById('displayMildGain');
const MildLossElement = document.getElementById('displayMildLoss');



// DISPLAYS TIME
function displayTime() {
  var currentTime = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
  timeDisplayEl.text(currentTime);
}

renderLastuserInfo();

function renderLastuserInfo() {

 
 var allBmiData = bmiLocalStorage();

 // get last inputed info 

 //console.log (allBmiData)

 if (allBmiData.length != 0){
   var LastIndex = allBmiData.length -1;
   var bmi = allBmiData[LastIndex];  
   
   var first = bmi.firstname;
   var last = bmi.lastname;
   var age = bmi.age;
   var gender = bmi.gender;
   var height = Math.round(bmi.height * 0.393701);
   var BFPResults = (bmi.BFPResults * -1);
   var BMIResults = bmi.BMIResults;
   var Balanced = bmi.Balanced;
   var hip = bmi.hip;
   var neck = bmi.neck;
   var weight = Math.round(bmi.weight * 2.20462);
   var heavyGain = bmi.HeavyWeightGain
   var heavyLoss = bmi.HeavyWeightLoss
   var mildGain = bmi.MildWeightGain
   var mildLoss = bmi.MildWeightLoss
  


   firstNameElement.textContent = firstNameElement.textContent + ": " + first;
   lastNameElement.textContent = lastNameElement.textContent + ": " + last;
   ageElement.textContent = ageElement.textContent + ": " + age;
   genderElement.textContent = genderElement.textContent + ": " + gender;
   heightElement.textContent = heightElement.textContent + ": " + height + " in";
   weightElement.textContent = weightElement.textContent + ": " + weight + " lb";
   neckElement.textContent = neckElement.textContent + ": " + neck + " in";
   hipElement.textContent = hipElement.textContent + ": " + hip + " in";
   BMIElement.textContent = BMIElement.textContent + ": " + BMIResults;
   BFPElement.textContent = BFPElement.textContent + ": " + BFPResults + "%";
   BlancedElement.textContent = "Recommended Calories Per Day: " + Balanced;
   HeavyGainElement.textContent = "Heavy Weight Gain: " + heavyGain + " Calories";
   displayHeavyLossElement.textContent = "Heavy Weight Loss: " + heavyLoss+" Calories";
   MildGainElement.textContent = "Mild Weight Gain: " + mildGain + " Calories";
   MildLossElement.textContent = "Mild Weight Loss: " + mildLoss + " Calories";
   
 
   
 }



}

 



// BMI INPUT SECTION

// SAVES BMI TO LOCAL STORAGE; bmiLocalStorage, saveAllBmiDataToStorage
function bmiLocalStorage() {
  var allBmiData = localStorage.getItem('allBmiData');
  if (allBmiData) {  
    allBmiData = JSON.parse(allBmiData);    
  } else {
    allBmiData = [];
  }
  return allBmiData;
}

function saveAllBmiDataToStorage(allBmiData) {
  localStorage.setItem('allBmiData', JSON.stringify(allBmiData));  
}

// PRINTS BMI TO TABLE
function printBmiData() {
  trackerDisplayBmiEl.empty();
  var allBmiData = bmiLocalStorage();

  // CREATES ROW CONTENT FOR BMI DATA
  for (var i = 0; i < allBmiData.length; i += 1) {
    var bmi = allBmiData[i];  
    var bmiDate = dayjs(bmi.date); 
    var today = dayjs().startOf('day');  

    var rowEl = $('<tr>');  
    var ageEL = $('<td>').text((bmi.BFPResults * -1) + " %" );
    var genderEl = $('<td>').text(bmi.BMIResults);
    var heightEl = $("<td>").text(Math.round(bmi.Balanced));
    var weightEl = $('<td>').text(Math.round(bmi.weight * 2.20462) + " lb");
    var dateEl = $('<td>').text(bmiDate.format('MM/DD/YYYY'));

    var deleteEl = $(
      '<td><button class="btn btn-sm btn-delete-project" data-index="' +
        i +
        '">X</button></td>'
    );

    // COLOR CODE FOR CURRENT DATE VS PAST DATE
    if (bmiDate.isBefore(today)) {
      rowEl.addClass('project-late');
    } else if (bmiDate.isSame(today)) {
      rowEl.addClass('project-today');
    }
  
    rowEl.append(ageEL, genderEl, heightEl, weightEl, dateEl, deleteEl);
    trackerDisplayBmiEl.append(rowEl);
  }
}

// DELETES BMI INFO WHEN 'X' IS PRESSED AND REMOVES FROM LOCAL STORAGE
function handleDeleteBmi() {
  var projectIndex = parseInt($(this).attr('data-index'));
  var allBmiData = bmiLocalStorage();
  allBmiData.splice(projectIndex, 1);
  saveAllBmiDataToStorage(allBmiData);

  printBmiData();
}

// converts inches to cm
function inchesToCm(inches) {
  const centimeters = inches * 2.54;
  console.log(centimeters);
  return centimeters;
} 

// converts pounds to kg
function poundsToKg(pounds) {
  const kilograms = pounds * 0.453592;
  console.log(kilograms);
  return kilograms;
}

// BMI MODAL SUBMISSION
function handleBmiFormSubmit(event) {
  event.preventDefault();  

  var bmiAge = trackerBmiAgeEl.val().trim();     
  var bmiGender = trackerBmiGenderEl.val();
  var bmiHeight = inchesToCm(trackerBmiHeightEl.val());
  var bmiWeight = poundsToKg(trackerBmiWeightEl.val()); 
  var bmiDate = trackerBmiDateInputEl.val(); 
  //adding additional fields

  var bmiFirstName = trackerBmiFirstNameEl.val();   
  var bmiLastName = trackerBmiLastNameEl.val(); 
  var bmiNeck = trackerBmiNeckEl.val(); 
  var bmiHip = trackerBmiHipEl.val(); 
 
  //input value integer check
  var inputValues = [bmiAge,bmiHeight,bmiWeight,bmiNeck,bmiHip]

  for (var i = 0; i < inputValues.length; i++) {
    console.log (inputValues[i])
    isValidNumber(inputValues[i])
    if (!isValidNumber(inputValues[i]))
    {
        alert("Your Input values '" + inputValues[i] + "' must be integers!");
        return ; // Stop further code execution
    }
  }

  function isValidNumber(value) {
    // Check if the value is either an integer or a decimal number
    return /^\d+(\.\d+)?$/.test(value);
}
  




  //ending adding adding additional fields

  //API for Calories based on user inputs

  const Credential = {
   method: 'GET',
   headers: {
     'X-RapidAPI-Key': '4471ef3fecmshe1826f9ec6de9e5p119901jsn580c8fcbb269',
     'X-RapidAPI-Host': 'hipermega-fitness-calculator.p.rapidapi.com'
    }
  };
 
 // API Urls
   const Caloriesurl = 'https://hipermega-fitness-calculator.p.rapidapi.com/caloriesneeds?gender=' + bmiGender + '&age='+ bmiAge +'&height='+ bmiHeight + '&weight='+ bmiWeight +'&activity=active';
   const BMIurl = 'https://hipermega-fitness-calculator.p.rapidapi.com/bmi?height='+ bmiHeight +'&weight=' + bmiWeight + "'";
   //Attention Please !!!!!! BFP Calculation generate error if gender value = Female, so I have to force value to be "male" not to generate error. API Error and I repored to api vendor
  //Calories Calculation accepts gender value as "Female" but not BFP Internal Server Error 500 
   const BFPurl = 'https://hipermega-fitness-calculator.p.rapidapi.com/bfp?gender=' + "Male" + '&neck=' + bmiNeck + '&height=' + bmiHeight + '&weight=' + bmiWeight + '&hip=' + bmiHip + "'";

  


 // Calories Needed fatch from API
const fetchObjectCalories = fetch(Caloriesurl, Credential)
 .then(response => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Error fetching object data: ' + response.statusText);
  }
})
.then(data => {
  CaloriesobjectData = data;
  console.log('1 Object data assigned:', CaloriesobjectData);
})
.catch(error => {
  console.error('Unable to fetch object data:', error);
});


// MBI Fatch from API
const fetchArrayBMI = fetch (BMIurl, Credential)
.then(response => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Error fetching array data: ' + response.statusText);
  }
})
.then(data => {
  BMIarrayData = data;
  console.log('2 Array data assigned:', BMIarrayData);
})
.catch(error => {
  console.error('Unable to fetch array data:', error);
});

// BFP Fatch from API

const fetchArrayBFP = fetch(BFPurl, Credential)
.then(response => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Error fetching array data: ' + response.statusText);
  }
})
.then(data => {
  BFParrayData = data;
  console.log('3 Array data assigned:', BFParrayData);
})
.catch(error => {
  console.error('Unable to fetch array data:', error);
});



// Consolidate one object fetch, two array fetch into one 

Promise.all([fetchObjectCalories,fetchArrayBMI,fetchArrayBFP])
  .then(() => {
    // Both fetch requests have completed
    console.log('Both fetch requests completed');

    // Now you can access objectData and arrayData here
    // and perform any further processing or consolidation.
    console.log('fetchObjectCalories data:', CaloriesobjectData);
    console.log('fetchArrayBMI data:', BMIarrayData);
    console.log('fetchArrayBFP data:', BFParrayData)

    // Example: Consolidating data into a single object
    const consolidatedData = {
      CaloriesobjectData: CaloriesobjectData,
      BMIarrayData: BMIarrayData,
      BFParrayData: BFParrayData
    };
    console.log('Consolidated data:', consolidatedData);

    
    const CaloriesobjectValue = consolidatedData.CaloriesobjectData;
    const BMIarrayValue = consolidatedData.BMIarrayData;
    const BFParrayvalue = consolidatedData.BFParrayData
    
   // console.log('Array value:', arrayValue);

    bmiCalorieBalance = JSON.stringify(CaloriesobjectValue.balance);
    bmiCalorieBalance = JSON.stringify(CaloriesobjectValue.balance);
    bmiMildWeightLoss = JSON.stringify(CaloriesobjectValue.mildWeightLoss);
    bmiMildWeightGain = JSON.stringify(CaloriesobjectValue.mildWeightGain);
    bmiHeavyWeightLoss = JSON.stringify(CaloriesobjectValue.heavyWeightLoss );
    bmiHeavyWeightGain = JSON.stringify(CaloriesobjectValue.heavyWeightGain);
    bmiResults = JSON.stringify(BMIarrayValue[0].bmiResult);
    bfpResults = JSON.stringify(BFParrayvalue[0].body_fat);

    var bmiData = { 
      //adding additional data
  
      firstname :  bmiFirstName,
      lastname :  bmiLastName,
      age: bmiAge,
      gender: bmiGender,
      height: bmiHeight,
      weight: bmiWeight,
      date: bmiDate,
      neck: bmiNeck,
      hip: bmiHip,
      Balanced: bmiCalorieBalance,
      MildWeightLoss : bmiMildWeightLoss,
      MildWeightGain : bmiMildWeightGain,
      HeavyWeightLoss : bmiHeavyWeightLoss,
      HeavyWeightGain: bmiHeavyWeightGain,
      BMIResults : bmiResults,
      BFPResults: bfpResults 
  
  
    
      };

    var bmiDataList = bmiLocalStorage();
     bmiDataList.push(bmiData);
     saveAllBmiDataToStorage(bmiDataList);
     printBmiData();
     location.reload();
     renderLastuserInfo();
  })
  .catch(error => {
    console.error('Error consolidating data:', error);
  });

}

trackerFormBmiEl.on('submit', handleBmiFormSubmit);
trackerDisplayBmiEl.on('click', '.btn-delete-project', handleDeleteBmi);
printBmiData();

// FOOD INPUT SECTION

var displayFoodEl = $('#display-food');
var formFoodEl = $('#form-food');
var inputFoodEl = $('#input-food');
var dateInputFoodEl = $('#date-input-food');

// SAVES FOOD TO LOCAL STORAGE; foodLocalStorage, saveAllFoodDataToStorage
function foodLocalStorage() {

  var allFoodData = localStorage.getItem('allFoodData');
  if (allFoodData) {  
    allFoodData = JSON.parse(allFoodData);    
  } else {
    allFoodData = [];
  }
  return allFoodData;
}

function saveAllFoodDataToStorage(allFoodData) {
  localStorage.setItem('allFoodData', JSON.stringify(allFoodData));  
}

// PRINTS FOOD TO TABLE
function printFoodData() {
  displayFoodEl.empty();
  var allFoodData = foodLocalStorage();

  // CREATES ROW CONTENT FOR FOOD DATA
  for (var i = 0; i < allFoodData.length; i += 1) {
    var foods = allFoodData[i];  
    var foodsDate = dayjs(foods.date); 
    var today = dayjs().startOf('day');  

    var secondRowEl = $('<tr>');  
    var foodSelectionEl = $('<td>').text(foods.foodSelection);
    var foodCalorieEl = $('<td>').text(foods.foodCalorie);
    var foodDateEl = $('<td>').text(foodsDate.format('MM/DD/YYYY'));

    var secondDeleteEl = $(
      '<td><button class="btn btn-sm btn-delete-project" data-index="' +
        i +
        '">X</button></td>'
    );

    // COLOR CODE FOR CURRENT DATE VS PAST DATE
    if (foodsDate.isBefore(today)) {
      secondRowEl.addClass('project-late');
    } else if (foodsDate.isSame(today)) {
      secondRowEl.addClass('project-today');
    }
  
    
    secondRowEl.append( foodDateEl, foodSelectionEl, foodCalorieEl, secondDeleteEl);
    displayFoodEl.append(secondRowEl);
  }
}

// DELETES FOOD INFO WHEN 'X' IS PRESSED AND REMOVES FROM LOCAL STORAGE
function handleDeleteFood() {
  var projectIndex = parseInt($(this).attr('data-index'));
  var allFoodData = foodLocalStorage();
  allFoodData.splice(projectIndex, 1);
  saveAllFoodDataToStorage(allFoodData);

  printFoodData();
}

// FOOD MODAL SUBMISSION
function handleFoodFormSubmit(event) {
  event.preventDefault();  
  var ingredient = inputFoodEl.val().trim();
  var foodsDate = dateInputFoodEl.val(); 

  getCaloriesFromAPI(ingredient);
  var caloriesPromise = getCaloriesFromAPI(ingredient);
  caloriesPromise.then(function(calories){
    
    var foodData = {     
      foodSelection: ingredient,
      date: foodsDate,
      foodCalorie: calories,
    };
    
    var foodDataList = foodLocalStorage();
    
    foodDataList.push(foodData);
    saveAllFoodDataToStorage(foodDataList);
  
    printFoodData();
  
    inputFoodEl.val('');
    dateInputFoodEl.val('');
  })
}

formFoodEl.on('submit', handleFoodFormSubmit);
displayFoodEl.on('click', '.btn-delete-project', handleDeleteFood);
printFoodData();

displayTime();
setInterval(displayTime, 1000);  


//API Calories
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9dbcd8e5dfmsha70214446503936p14ec91jsn5d557cae99ce',
		'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
	}
};


var getCaloriesFromAPI = function (ingredient) {
  var apiUrl = 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=' + ingredient;
  //gets data from our API and also gives them the passkey
  return fetch(apiUrl, options)
    .then(function (response) {
      if (response.ok) {
        return response.json().then(function (data) {
          //this returns an integer
          return data[0].calories;
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })

};
