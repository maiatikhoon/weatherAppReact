
import './App.css' 

import TopButtons from './components/TopButtons'
import Inputs from './components/Inputs' 
import TimeAndLocation from './components/TimeAndLocation'
import TemperatureAndDetails from './components/TemperatureAndDetails'
import getFormattedWeatherData from './services/weatherService'
import {  useEffect, useState } from 'react' 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
 
     const [query , setQuery ] = useState( {q:"london"}) ; 
     const [units, setUnits ] = useState("metric") ; 
     const [weather , setWeather ] = useState(null) ; 

     useEffect( ()=> {  

        const message = query.q ? query.q : "current loaction ." ; 

        toast.info("Fetching weather for "+ message) ; 
      
        const fetchWeather = async()=> {
               await getFormattedWeatherData( {...query, units} )  
               .then(data => {  
                    // console.log(data) ; 

                    toast.success(`Successfully fetched weather for ${data.name} , ${data.country}`) ;
                    setWeather(data)} 
               ) 
        } 

        fetchWeather() ;
        
     } , [query , units])  ;

     
     const formatBackground = ()=> {
          if(!weather) return 'from-cyan-700 to-blue-700' ; 

          const threeshold = units === "metric" ? 20 : 60 ;

          if(weather.temp <= threeshold) { 
               return 'from-cyan-700 to-blue-700' ;
          } 


          return "from-yellow-700 to-orange-700" ;
     }

  return (
       <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 shadow-xl
       shadow-gray-400 mb-4 ${formatBackground()} `}>  

            <TopButtons setQuery= {setQuery}/> 
            <Inputs setQuery= {setQuery} units={units} setUnits={setUnits}/>  

          {weather && ( 
            <div>
            <TimeAndLocation weather={weather}/> 
            <TemperatureAndDetails weather={weather}/>
            </div>
          )}   

          <ToastContainer autoClose={2000} theme='colored' newestOnTop={true}/> 
          
       </div>

  )
}

export default App
