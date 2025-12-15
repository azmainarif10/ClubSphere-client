import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import Load from '../Load/Load';

const Profile = () => {
  const { user, loading, setUser, updateUser } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.displayName || '');
      setUrl(user.photoURL || '');
    }
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateUser(name, url);

      setUser((prev) => ({
        ...prev,
        displayName: name,
        photoURL: url,
      }));

      toast.success('Profile Updated!');
    } catch (error) {
      toast.error(error.message);
    }
  }

  if (loading) return  <Load></Load>;

  if (!user) {
    return (
      <div className="flex justify-center items-center">
        <p className="lg:text-4xl text-2xl py-10 font-extrabold text-blue-300">
          No user is logged in
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center pt-20">
      <div className="w-full lg:w-4/12 h-96 flex flex-col justify-center rounded-3xl overflow-hidden items-center shadow-2xl">
        <div className="bg-blue-300 w-full h-1/2 flex justify-start items-start p-5">
          <p className="text-white text-2xl font-bold">Profile</p>
        </div>

        <div className="absolute top-20 mx-auto left-0 right-0 h-40 w-40">
          <img
            className="h-40 w-40 rounded-full object-cover"
            src={user.photoURL}
            alt={user.displayName || 'User'}
          />
        </div>

        <div className="bg-base-200 w-full text-center h-1/2 flex flex-col justify-center items-center">
          <p className="mt-16 text-lg font-medium">{user.displayName}</p>
          <p className="mt-2 text-lg font-medium">{user.email}</p>
        </div>
      </div>

      <div className="mt-5 mb-5 w-full lg:w-4/12">
        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset bg-blue-50 border-base-300 rounded-box w-full border p-4">
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input w-full"
              placeholder="Your name"
            />

            <label className="label mt-2">Photo Url</label>
            <input
              type="text"
              name="url"
              value={url}
              className="input w-full"
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Photo URL"
            />

            <button
              type="submit"
              className="btn bg-blue-300 text-white mt-4 w-full"
            >
              Update Profile
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Profile;
