import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxios from "../../Utils/axios";
import { useParams } from "react-router";

const EventDetails = () => {
  const { id } = useParams();
  const instance = useAxios();

  const { data: event, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await instance.get(`/events/${id}`);
      return res.data;
    },
  });

  const { mutate: registerEvent } = useMutation({
    mutationFn: async () => {
      const res = await instance.post(`/events/register`, { eventId: id });
      return res.data;
    },
    onSuccess: () => toast.success("Registered successfully!"),
    onError: () => toast.error("Failed to register"),
  });

  if (isLoading) return <p className="text-center py-20">Loading...</p>;

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

      <button
        className="btn bg-blue-300 text-white btn-lg"
        onClick={() => registerEvent()}
      >
        {event.isPaid ? "Pay & Register" : "Register For Free"}
      </button>
    </div>
  );
};

export default EventDetails;
