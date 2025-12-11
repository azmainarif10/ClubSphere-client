import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxios from "../../Utils/axios";
import { AuthContext } from "../../context/AuthContext";

const EventsManagement = () => {
  const { user } = useContext(AuthContext);
  const instance = useAxios();
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const { data: events = [], refetch } = useQuery({
    queryKey: ["managerEvents", user?.email],
    queryFn: async () => {
      const res = await instance.get(`/manager/events?managerEmail=${user?.email}`);
      return res.data;
    },
  });

  const createEventMutation = useMutation({
    mutationFn: async (newEvent) => {
      const res = await instance.post("/events", newEvent);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Created!", "Event has been added", "success");
      refetch();
      closeModal();
    },
  });

  const updateEventMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await instance.patch(`/manager/events/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Updated!", "Event updated successfully", "success");
      refetch();
      closeModal();
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: async (id) => {
      const res = await instance.delete(`/manager/events/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Event removed", "success");
      refetch();
    },
  });

  const handleCreate = (data) => {
    createEventMutation.mutate({ ...data, managerEmail: user.email });
  };

  const handleUpdate = (data) => {
      const { _id, ...updateData } = data;
    updateEventMutation.mutate({ id: selectedId, data:updateData});
  };

  const openModal = (event) => {
    if (event) {
      setEditingEvent(event);
      setSelectedId(event._id);
      reset(event);
    } else {
      setEditingEvent(null);
      setSelectedId(null);
      reset();
    }
    document.getElementById("eventModal").showModal();
  };

  const closeModal = () => {
    document.getElementById("eventModal").close();
    setEditingEvent(null);
    reset();
  };

  return (
      <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Events Management</h2>
        <button
          className="btn bg-blue-400 text-white w-full md:w-auto"
          onClick={() => openModal()}
        >
          + Create Event
        </button>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Date</th>
              <th>Location</th>
              <th>Paid?</th>
              <th>Fee</th>
              <th>Max Attendees</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event._id}>
                <td>{index + 1}</td>
                <td>{event.title}</td>
                <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                <td>{event.location}</td>
                <td>{event.isPaid ? "Yes" : "No"}</td>
                <td>{event.eventFee || "-"}</td>
                <td>{event.maxAttendees || "-"}</td>
                <td className="flex gap-2 flex-wrap">
                  <button
                    className="btn btn-sm bg-green-600 text-white"
                    onClick={() => openModal(event)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm bg-red-600 text-white"
                    onClick={() =>
                      Swal.fire({
                        title: "Delete?",
                        text: "This action cannot be undone!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Yes, delete!",
                      }).then((result) => {
                        if (result.isConfirmed) deleteEventMutation.mutate(event._id);
                      })
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
       <div className="md:hidden flex flex-col gap-4">
        {events.map((event, index) => (
          <div key={event._id} className="p-4 rounded-xl shadow bg-white flex flex-col gap-2">
            <div className="font-semibold text-lg">Event #{index + 1}</div>
            <div><span className="font-semibold">Title:</span> {event.title}</div>
            <div><span className="font-semibold">Date:</span> {new Date(event.eventDate).toLocaleDateString()}</div>
            <div><span className="font-semibold">Location:</span> {event.location}</div>
            <div><span className="font-semibold">Paid:</span> {event.isPaid ? "Yes" : "No"}</div>
            <div><span className="font-semibold">Fee:</span> {event.eventFee || "-"}</div>
            <div><span className="font-semibold">Max Attendees:</span> {event.maxAttendees || "-"}</div>
            <div className="flex gap-2 mt-2">
              <button
                className="btn btn-sm bg-green-600 text-white flex-1"
                onClick={() => openModal(event)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm bg-red-600 text-white flex-1"
                onClick={() =>
                  Swal.fire({
                    title: "Delete?",
                    text: "This action cannot be undone!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, delete!",
                  }).then((result) => {
                    if (result.isConfirmed) deleteEventMutation.mutate(event._id);
                  })
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <dialog id="eventModal" className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <h3 className="font-bold text-xl mb-4">
            {editingEvent ? "Update Event" : "Create New Event"}
          </h3>

          <form
            onSubmit={handleSubmit(editingEvent ? handleUpdate : handleCreate)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input {...register("title")} className="input input-bordered" placeholder="Title" />
            <input {...register("location")} className="input input-bordered" placeholder="Location" />
            <input type="date" {...register("eventDate")} className="input input-bordered" placeholder="Event Date" />
            <input type="checkbox" {...register("isPaid")} className="checkbox" />
            <input {...register("eventFee")} className="input input-bordered" placeholder="Event Fee" />
            <input {...register("maxAttendees")} className="input input-bordered" placeholder="Max Attendees" />

            <textarea {...register("description")} className="textarea textarea-bordered col-span-2" placeholder="Description" />

            <button className="btn bg-blue-400 text-white col-span-2">
              {editingEvent ? "Update Event" : "Create Event"}
            </button>
          </form>

          <div className="modal-action">
            <button className="btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EventsManagement;
