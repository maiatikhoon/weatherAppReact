import React from 'react' 
import { formatToLocalTime } from '../services/weatherService'

function TimeAndLocation( {weather: {dt, name, country} }) { 

        const { day , month , date , year ,time , dayLight}  =  formatToLocalTime(country) ;
  return (
    <div>
        <div className='flex items-center justify-center my-6'>

            <p className='text-white text-xl font-extralight'>
                 {day} {date.split(",")} {month}, {year} | Local time: {time} {dayLight}    
                 
                 
            </p>
        </div> 

        <div className='flex items-center justify-center my-34'> 

                <p className='text-white text-3xl font-medium'> { `${name}, ${country}`}  </p>
        </div>
    </div>
  )
}

export default TimeAndLocation
