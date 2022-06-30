import React, { useEffect, useState, useRef } from "react"

const allCountriesAPI : string  = "https://restcountries.com/v3.1/all"

function App() {

  const [random,setRandom] = useState <string> ('')
  const [countries,setCountries] = useState <any>([])
  const [countriesNum,setCountriesNum] = useState <number> (8)
  const [page,setPage] = useState <number> (1)
  const [displayCountries,setDisplayCountries] = useState([])

  const [inputValue,setInputValue] = useState('')
  const [optionValue,setOptionValue] = useState('')

  const fetchCountries = async (API : string) => {
    await fetch(API)
      .then((res) => res.json())
      .then( (data) => {
      setCountries(data)
        console.log(data)
      
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    fetchCountries(allCountriesAPI)
 
  }, [])

  
  const handleScroll =  (e)  => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom){
      console.log('BOTTOM!')
    }
  }



  //            const lastIndex = page * countriesNum
  // const firstIndex = lastIndex - countriesNum
  // const array = countries.slice(firstIndex,lastIndex)
  
  const search = (value) =>{
    setInputValue(value)
   
    setTimeout(() => {
      fetchCountries(inputValue?`https://restcountries.com/v3.1/name/${inputValue}`:'https://restcountries.com/v3.1/all' )
    }, 300);
    
  

  }
 

  return <main 
    onScroll={handleScroll}
    // style={{height:`${bodyHeight}vh`}}
   className="w-screen min-h-screen overflow-y-scroll flex flex-col justify-start gap-10 pb-2 items-center bg-lightBg">

    {/* Navbar */}
    <nav className="w-full h-14 flex justify-around items-center   bg-white">
    <header>
      <h1>Where in the world?</h1>
    </header>
    <button className="w-36 h-full flex justify-between items-center ">
    <span>Icon</span>
    <h2>Dark Mode</h2>
    </button>
    </nav>

    <header className="w-11/12 h-20 flex justify-between items-center">
    <div className="w-2/5 h-3/4 flex justify-between px-2 items-center bg-white">
      <div className="h-full w-16 flex justify-center items-center">

      <span>Icon</span>
      </div>
      <input
      value={inputValue}
      onChange={(e) => search(e.target.value)}
       type="text" 
      placeholder="Search for a country..."
      className="w-full h-2/3 px-2 outline-none " />
    </div>
<form className="w-1/5 h-3/4 flex justify-center items-center">

      <select value={optionValue} onChange={(e) => {
        if(e.target.value){
          fetchCountries(`https://restcountries.com/v3.1/subregion/${e.target.value}`)
        }
      }}  className="w-full h-full">
        <option value="" hidden={true}>Filter by Region</option>
        <option value="europe">Europe</option>
        <option value="asia">Asia</option>
        <option value="africa">Africa</option>
        <option value="ame">America</option>
        <option value="Oceania">Oceania</option>


      </select>
</form>
    </header>

    <article
    style={{minHeight: '60vh'}}
     className="w-11/12 grid grid-cols-4 gap-6  ">
       {countries.length? countries.map((country) =>{
         return <div 
         style={{height:'55vh'}}
         className="w-full  flex flex-col justify-start items-center gap-2 pb-2  bg-white">
           <img className="w-full h-2/3" src={country.flags.png} alt="" />
           <div className="w-full h-1/3 flex flex-col justify-center gap-2 items-start px-4">
           <h2 className="text-xl font-bold">{country.name.common}</h2>

           <div className="w-full h-full ">
             <div className="w-full flex justify-start items-start gap-1">
               <p  className="font-semibold">Population:</p>
               <span>{country.population}</span>
             </div>

              <div className="w-full flex justify-start items-start gap-1">
               <p  className="font-semibold">Region:</p>
               <span>{country.region}</span>
             </div>

              <div className="w-full flex justify-start items-start gap-1">
               <p className="font-semibold">Capital:</p>
               <span className="text-gray">{country.capital}</span>
             </div>
           </div>

           </div>
            
         </div>
       }): ''}
    </article>

  </main>
}

export default App
