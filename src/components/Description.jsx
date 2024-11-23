import "../styles.css";

export const Description = ({newAppointment, setNewAppointment})=>{
    return (
        <div>
             <label htmlFor="description"
                className='p-2 m-2 w-[320px] text-left text-gray-700'>
                    <p>Appointment description</p>
            </label>
            <input className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'
                    name="description"
                    type="text"
                    value={newAppointment.description}
                    placeholder="Your apointment's description"
                    required
                    onChange={e=>setNewAppointment(e.currentTarget.value)}/>

   
        </div>
    );
};