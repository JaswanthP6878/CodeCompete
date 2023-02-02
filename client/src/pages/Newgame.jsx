import Navbar from "../components/Navbar";
import Editor from "../components/editor";
import { useLocation } from "react-router-dom";

function NewGame(){
    const {state} = useLocation()

      return (
        <div className='container mx-5'>
          <Navbar playerid = {state.player.playerID}/>
          <div>
            <Editor />
          </div>
        </div>
      )

 } 
//  conDetails = {socket}

export default NewGame;