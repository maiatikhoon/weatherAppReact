
// import moment from "moment";  
import moment from 'moment-timezone'; 
const API_KEY = "9df68403c8c6054138d84502243eb653";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);

  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const formattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then((data) => formatCurrentWeather(data));

  return formattedCurrentWeather;
};

const formatToLocalTime = (country) => {  
 
      const d = Math.floor(Date.now() / 1000 ); 
 
       const timezone = moment.tz.zonesForCountry(country);  

       let dayZone = moment.unix(d).tz( timezone[0]);   

       const finalDateResult = dayZone.format("LLLL") ;  

       const dateArray = finalDateResult.split(" ") ; 

       const day = dateArray[0] ; 
       const month = dateArray[1] ; 

       const date = dateArray[2] ; 
       const year = dateArray[3] ;  
       const time = dateArray[4] ; 
       const dayLight = dateArray[5] ; 

       return { day , month , date , year , time , dayLight} ; 
  
};  



const calculateSunriseSunset = (time , country)=> { 
  
      
      const timezone = moment.tz.zonesForCountry(country);    

      const finalTime = moment.unix(time).tz(timezone[0]).format("LT") ;   
      
      return finalTime ; 

}

const iconUrlFromCode = (code) =>
  `https://openweathermap.org/img/wn/${code}@2x.png`;

export { iconUrlFromCode, formatToLocalTime, calculateSunriseSunset };

export default formattedWeatherData;
