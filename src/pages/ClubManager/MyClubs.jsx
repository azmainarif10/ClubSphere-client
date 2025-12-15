import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxios from "../../Utils/axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import useSecureAxios from "../../Utils/secureAxios";

const MyClubs = () => {
  const instance = useAxios();
  const secureInstance = useSecureAxios()
  const { user } = useContext(AuthContext);
  const [editingClub, setEditingClub] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const { data: clubs = [], refetch } = useQuery({
    queryKey: ["myClubs", user?.email],
    queryFn: async () => {
      const res = await instance.get(`/my-clubs?email=${user.email}`);
      return res.data;
    },
  });

  const createClubMutation = useMutation({
    mutationFn: async (newClub) => {
      const res = await secureInstance.post("/clubs", newClub);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Created!", "Club has been added", "success");
      refetch();
      closeModal();
    },
  });

  const updateClubMutation = useMutation({
    mutationFn: async ({ id, data }) => {

     
      const res = await secureInstance.patch(`/clubs/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Updated!", "Club updated successfully", "success");
      refetch();

      closeModal();
    },
  });


  const deleteClubMutation = useMutation({

    mutationFn: async (id) => {

      const res = await secureInstance.delete(`/clubs/${id}`);

      return res.data;

    },

    onSuccess: () => {

      Swal.fire("Deleted!", "Club removed", "success");

      refetch();

    },

  });


  const handleCreate = (data) => {
    createClubMutation.mutate({ ...data, managerEmail: user.email });
  };

  const handleUpdate = (data) => {
    const { _id, ...updateData } = data;
    updateClubMutation.mutate({ id: selectedId, data:updateData });
  };

  const openModal = (club) => {
    if (club) {
      setEditingClub(club);
      setSelectedId(club._id);
      reset(club);
    } else {
      setEditingClub(null);
      setSelectedId(null);
      reset();
    }
    document.getElementById("clubModal").showModal();
  };

  const closeModal = () => {
    document.getElementById("clubModal").close();
    setEditingClub(null);
    reset();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Clubs</h2>
        <button className="btn bg-blue-400 text-white" onClick={() => openModal()}>
          + Create Club
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Club Name</th>
              <th>Category</th>
              <th>Location</th>
              <th>Fee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((club, index) => (
              <tr key={club._id}>
                <td>{index + 1}</td>
                <td>{club.clubName}</td>
                <td>{club.category}</td>
                <td>{club.location}</td>
                <td>${club.membershipFee}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm bg-green-600 text-white"
                    onClick={() => openModal(club)}
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
                        if (result.isConfirmed) {
                          deleteClubMutation.mutate(club._id);
                        }
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

      <dialog id="clubModal" className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <h3 className="font-bold text-xl mb-4">
            {editingClub ? "Update Club" : "Create New Club"}
          </h3>

          <form
            onSubmit={handleSubmit(editingClub ? handleUpdate : handleCreate)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input {...register("clubName")} className="input input-bordered" placeholder="Club Name" />
            <input {...register("location")} className="input input-bordered" placeholder="Location" />
            <input {...register("membershipFee")} className="input input-bordered" placeholder="Membership Fee" />
            <input {...register("category")} className="input input-bordered" placeholder="Category" />
            <input {...register("bannerImage")} className="input input-bordered" placeholder="Banner Image URL" />

            <textarea {...register("description")} className="textarea textarea-bordered col-span-2" placeholder="Description" />

            <button className="btn bg-blue-400 text-white col-span-2">
              {editingClub ? "Update Club" : "Create Club"}
            </button>
          </form>

          <div className="modal-action">
            <button className="btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      </dialog>
    </div>
  );
  ;
}
  export default MyClubs;
