export const Modal = ({children})=>{
    return(
        <div className='w-screen h-screen fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 flex-col'>
            {children}
            <button onClick={closeModel} 
                className="absolute bottom-10 text-gray-400 hover:text-black">
                    Schließen
                </button>
        </div>
    );
}