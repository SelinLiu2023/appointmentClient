export const EventContent = ({event})=>{
    console.log("EventContent", event)
    const startTime = new Date(event.startTime);
    const localStartTime = startTime.toLocaleString("de-DE", {
        year: "numeric",
        month: "long", // 全称的月份
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    const endTime = new Date(event.endTime);
    const localEndTime = endTime.toLocaleString("de-DE", {
        year: "numeric",
        month: "long", // 全称的月份
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    console.log("EventContent",event);
    return(
        <div>
            <p 
                className='p-2 m-2 w-[320px] text-left text-gray-700 text-xl'>
                {event.title}
            </p>
            <p 
                className='p-2 m-2 w-[320px] text-left text-gray-700 '>
                {`Startzeit: ${localStartTime}`}
            </p>
            <p 
                className='p-2 m-2 w-[320px] text-left text-gray-700 '>
                {`Endzeit: ${localEndTime}`}
            </p>
            <p 
                className='p-2 m-2 w-[320px] text-left text-gray-700 '>
                {`Treffpunkt-Adresse: ${event.address}`}
            </p>
            {(event.mobileNumber !=="" || event.otherContact !=="")  &&
            <p 
                className='p-2 m-2 w-[320px] text-left text-gray-700 '>
                {`Kontaktmöglichkeiten: ${event.mobileNumber}  ${event.otherContact}`}
            </p>}
            <p 
                className='p-2 m-2 w-[320px] text-left text-gray-700 '>
                {`Einzelheiten: ${event.description}`}
            </p>
            <div>
                <p 
                    className='p-2 m-2 w-[320px] text-left text-gray-700 '>
                    {"Gäste :"}
                </p>
                {
                    event.gasts.map(gast=>(
                        <div>
                        <p key={gast._id}>{gast.userName}</p>
                        {gast.isJoinIn? <p>Teilnehmen</p>:<p>Nicht Teilnehmen</p>}
                        </div>
                    ))
                }
            </div>
            <div>
            <p 
                    className='p-2 m-2 w-[320px] text-left text-gray-700 '>
                    {"Aufgaben :"}
                    </p>
                    {event.tasks.length >0 &&
                    event.tasks.map((task,i)=>(
                        <div key={i}>
                        <p >{task.title}</p>
                        <p >{task.performerCount}</p>
                        {
                           task.performerCount >0 &&  task.performers.map(performer=>(
                            <p>performer.userName</p>
                           ))
                        }
                        </div>
                    ))
                }
                
            </div>
        </div>
    );
}