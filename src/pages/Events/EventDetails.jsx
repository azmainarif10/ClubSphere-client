import React, { use } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxios from "../../Utils/axios";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import Load from "../Load/Load";

const EventDetails = () => {
  const { id } = useParams();
  const instance = useAxios();
  const {user} = use(AuthContext)
  const { data: event, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await instance.get(`/events/${id}`);
      return res.data;
    },
  });

    const registerFreeEvent = useMutation({
    mutationFn: async (data) => {
      const res = await instance.post("/event-registered", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("You have successfully registered for the event!");
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  function handleFreeEventRegister() {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    registerFreeEvent.mutate({
      eventId: id,
      clubId: event.clubId,
      userEmail: user.email,
      status: "registered",
    });
  }

  async function  eventPay(event){

  if (!user) {
    toast.error("Please login first");
    return;
  }


     const eventInfo = {
    eventId : id,
    cost : event.eventFee,
    email:user?.email,
    title :event.title,
    clubId: event.clubId,


  }
 
   const res =  await instance.post("/event/create-checkout-session",eventInfo);
        
  
   window.location.assign(res.data.url)

}
  

  if (isLoading) return <Load></Load>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <img
        src={event.eventsImage}
        className="w-full h-72 object-cover rounded-xl mb-8"
      />

      <h1 className="text-4xl font-bold mb-4">{event.title}</h1>

      <p className="text-lg text-gray-600 mb-3">
        📅 {new Date(event.eventDate).toDateString()}
      </p>

      <p className="text-lg mb-6">
        📍 <span className="font-medium">{event.location}</span>
      </p>

      <p className="mb-6 text-gray-700 leading-relaxed">{event.description}</p>

      <p className="mb-6">
        {event.isPaid ? (
          <span className="text-green-700 font-bold text-xl">
            Event Fee: ${event.eventFee}
          </span>
        ) : (
          <span className="text-blue-300 font-bold text-xl">Free Event</span>
        )}
      </p>

     
      {
  event.isPaid? (
    <button
      onClick={() => eventPay(event)}
      className="bg-blue-300 text-white text-lg font-bold py-2 px-6 rounded"
    >
     Pay & Register
    </button>
  ) : (
    <button
      onClick={handleFreeEventRegister}
      className="bg-blue-300 text-white text-lg font-bold py-2 px-6 rounded"
    >
     Register For Free
    </button>
  )
}

     
    </div>
  );
};

export default EventDetails;
