import './App.css';
import {useState} from "react";
import Cat from './Cat';
import GetAllCats from './GetAllCats';
import UpdateCat from './UpdateCat';
import DeleteCat from './DeleteCat';
import GetCat from './GetCat';

function App() {

  const [initialValue, setInitialValue] = useState(1234);

  const handleInitialValue = (event) => {
    setInitialValue(event.target.value);
  };
  return (
    <div>

      {/* <input onChange={handleInitialValue}/> */}

      <Cat initValue={initialValue} changeParentHandler={setInitialValue}/>
      <GetAllCats/>
      <UpdateCat/>
      <DeleteCat/>
      <GetCat/>
    </div>
  );
}

export default App;
