
function Navbar({conDetails}) {
    return(
        <div className="flex flex-row  bg-white justify-between border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 border-b-2">
            <h2>CodeCompete</h2>
            {conDetails.id ? <h3>Player ID : {conDetails.id}</h3> : <h3>not connected</h3>}
        </div>
    );
}

export default Navbar;
