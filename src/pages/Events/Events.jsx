import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Utils/axios";
import { Link } from "react-router";
import Load from "../Load/Load";

const Events = () => {
    const instance = useAxios();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("newest");

    const { data: events = [], isLoading } = useQuery({
        queryKey: ["events", search, category, sort],
        queryFn: async () => {
            const res = await instance.get(
                `/events?search=${search}&category=${category}&sort=${sort}`
            );
            return res.data;
        },
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h1>

            <div className="flex flex-wrap gap-4 mb-8 justify-between">
                <input
                    type="text"
                    placeholder="Search events..."
                    className="input input-bordered w-full md:w-1/3"
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="select select-bordered"
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    
      <option value="Technology">Technology</option>
      <option value="Travelling">Travelling</option>
      <option value="Literature">Literature</option>
      <option value="Photography">Photography</option>
                </select>

                <select
                    className="select select-bordered"
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="date">Event Date</option>
                </select>
            </div>

            {isLoading && <Load></Load>}

            <div
                className="  grid   grid-cols-1  sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4    gap-6   "
            >
                {events.map((event) => (
                    <div
                        key={event._id}
                        className="card bg-base-100 shadow-md hover:shadow-xl transition rounded-xl"
                    >
                        <figure>
                            <img
                                src={event.eventsImage}
                                alt={event.title}
                                className="w-full h-40 object-cover rounded-t-xl"
                            />
                        </figure>

                        <div className="card-body">
                            <h2 className="card-title">{event.title}</h2>
                        <p className="text-gray-600 mb-1"><b>Category:</b> {event.category}</p>


                            <p className="text-sm text-gray-500">
                                {new Date(event.eventDate).toDateString()}
                            </p>

                            <p className="text-sm">
                                {event.isPaid ? (
                                    <span className="text-green-600 font-medium">
                                        Fee: ${event.eventFee}
                                    </span>
                                ) : (
                                    <span className="text-blue-300 font-medium">Free Event</span>
                                )}
                            </p>

                            <div className="card-actions mt-3">
                                <Link
                                    to={`/events/${event._id}`}
                                    className="btn bg-blue-300 text-white btn-sm w-full"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {events.length === 0 && !isLoading && (
                <p className="text-center text-gray-500 mt-10">No events found.</p>
            )}
        </div>
    );
};

export default Events;
