import "../styles.css";

export const ProcessBar = ({step, totalSteps})=>{
    const stepsArr = Array.from({ length: totalSteps }, (_, index) => index + 1);
    return (
        <div className="flex items-center justify-between w-3/4 max-w-xl mt-8">
            {
                stepsArr.map((item, index)=>(
                    <>
                        <div
                            key={item}
                            className={`w-4 h-4 rounded-full ${
                                item <= step ? "bg-blue-500" : "bg-gray-300"
                            } bg-opacity-50  flex items-center justify-center text-white text-xs`}
                        >
                            {item}
                        </div>
                        {index < stepsArr.length - 1 && (
                            <div
                            className={`h-[0.5px] flex-grow mx-2 bg-opacity-50  ${
                                index + 1 < step ? "bg-blue-500" : "bg-gray-300" 
                            }`}
                            ></div>
                        )}
                    </>
                    
                ))
            }
        </div>
    );
};