import { useState, useCallback , useEffect, useRef} from 'react';
import './App.css'
export default function App() {
  const [length, setLength] = useState(5);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [pass, setPass] = useState("");
  const passwordRef = useRef(null)

  const passwordGen = useCallback(() => {
    let password = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(num) string += "0123456789";
    if (char) string += "!@#$%^&*-_+=[]{}~`";
    for(let i=0; i<length; i++){
      let gen = Math.floor(Math.random() * string.length + 1);
      password += string.charAt(gen);
  }
  setPass(password);

  }, [length, num, char, setPass])
 

  const copyText = useCallback(() => {
      passwordRef.current?.select()
      passwordRef.current?.setSelectionRange(0,5)
      window.navigator.clipboard.writeText(pass)},[pass])
  useEffect(() => {passwordGen()}, [length, num, char, setPass, passwordGen])    

  return (
    <>

    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-zinc-400 bg-pink-950">

      <h1 className="text-3xl font-bold text-rose-200 text-center">
      Password Generator
      </h1>

      <div className='flex shadow rounded-lg overflow-hidden mb-4'>

        <input
        type='text'
        value={pass}
        className='outline-none w-full py-1 px-3'
        placeholder = "Password"
        readOnly
        ref = {passwordRef}
        />

        <div className='new'> 
          <button onClick = {copyText} class="Btn">
           <svg viewBox="0 0 512 512" class="svgIcon" height="1em"><path d="M288 448H64V224h64V160H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H288v64zm-64-96H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64z"></path></svg>
            <p class="text">COPY</p>
            <span class="effect"></span>
          </button>
        </div>
       

      </div>

        <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type = "range"
            min = {5}
            max = {100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
        </div>
          <div className='flex items-center gap-x-1'>

            <input 
            type="checkbox" 
            defaultChecked = {num}
            id = "numberInput"
            onChange={ () => {setNum((prev)=>!prev)}}
            />
            <label>Number</label>
          </div>

          <div className='flex items-center gap-x-1'>

          <input 
            type="checkbox" 
            defaultChecked = {char}
            id = "numberInput"
            onChange={ () => {setNum((prev)=>!prev)}}
            />
            <label>Character</label>
          </div>

        </div>
    </div>

    
    </>
    
  )
}