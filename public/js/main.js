const submit_button=document.getElementById('submitBtn');
const cityName=document.getElementById('cityName');
const city_name=document.getElementById('city_name');
const temp=document.getElementById('temp');
const temp_status=document.getElementById('temp_status');
const day=document.getElementById('day');
const today_data=document.getElementById('today_data');
const datahide=document.querySelector('.middle_layer');


const getInfo=async(event)=>{
    event.preventDefault(); // to stop reloading page on clicking search
    let cityVal= cityName.value;

    // weekday and date must come even after city is incorrect
    const getCurrentDay = () => {
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        let currentTime = new Date();
        let day = weekday[currentTime.getDay()];
        return day;
      };
      day.innerText= getCurrentDay();
      const getCurrentTime = () => {
        var months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "June",
          "July",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ];

        var now = new Date();
        var month = months[now.getMonth()];
        var date = now.getDate();

        let hours = now.getHours();
        let mins = now.getMinutes();

        let periods = "AM";

        if (hours > 11) {
          periods = "PM";
          if (hours > 12) hours -= 12;
        }
        if (mins < 10) {
          mins = "0" + mins;
        }

        return `${month} ${date} | ${hours}:${mins}${periods}`;
      };
      today_data.innerText=  getCurrentTime();

    if(cityVal===""){
        city_name.innerText=`Please enter the city name first`;
        datahide.classList.add('data_hide');
    }
    else{
        try{
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=matric&appid=be9b5eb723e2c6af1bf3a4c1222984c0`;
        let response=await fetch(url);
        
        let data=await response.json();
        let arrData=[data];
        city_name.innerText= `${arrData[0].name},   ${arrData[0].sys.country}`;
        temp.innerText=(arrData[0].main.temp-273.15).toFixed(1);
        temp_status.innerText= arrData[0].weather[0].main;
        
        datahide.classList.remove('data_hide');

        }
        catch{
            city_name.innerText=`Please enter valid city `
            datahide.classList.add('data_hide');
        }
    }
} 
submit_button.addEventListener('click',getInfo);