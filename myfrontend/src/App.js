import './App.css';
import {useState} from "react";
import GetAllCat from './GetAllCat';
import AddCat from './AddCat';
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

      <GetAllCat initValue={initialValue} changeParentHandler={setInitialValue}/>
      <AddCat/>
      <UpdateCat/>
      <DeleteCat/>
      <GetCat/>
    </div>
  );
}

export default App;
