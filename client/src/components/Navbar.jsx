
function Navbar({ playerid }) {

    return(
        <div className="flex flex-row  bg-white justify-between border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 border-b-2">
            <h2>Code Compete</h2>
            <h2>{playerid}</h2>
        </div>
    );
}

export default Navbar;
