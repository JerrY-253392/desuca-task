import React, { useEffect, useState } from "react";
import { updateProfile } from "../api/auth";
import secureLocalStorage from "react-secure-storage";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    userName: "John Doe",
    email: "johndoe@gmail.com ",
    password: "John123",
    role: "admin",
  });

  useEffect(() => {
    const role = secureLocalStorage.getItem("role");
    const id = secureLocalStorage.getItem("id");

    const fetchUser = async () => {
      try {
        let response;
        if (role === "admin") {
          response = await getMyDetails();
        } else if (role === "manager") {
          response = await getManager(id);
        } else {
          response = await getUserDetail();
        }
        console.log(response);
        setProfile({
          ...profile,
          userName: response.data.userName,
          email: response.data.email,
          role: response.data.role,
          password: response.data.password,
        });
      } catch (error) {
        console.error("error in fetching profile", profile);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setProfile({ ...profile, image: imageUrl });
  //   }
  // };

  const handleSubmit = async (data) => {
    try {
      const response = await updateProfile(data);
      console.log(response);
      setProfile({
        ...profile,
        userName: response.user.userName,
        password: password,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white  ">
      <h2 className="text-2xl font-bold text-center mb-4">My Profile</h2>

      {/* <div className="flex flex-col items-center justify-center gap-4 mb-6">
        <img
          src={profile.image}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          />
        )}
      </div> */}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">User Name</label>
          <input
            type="text"
            name="userName"
            value={profile.userName}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full border px-3 py-2 rounded ${
              isEditing ? "border-blue-500" : "bg-gray-100"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            readOnly
            className="w-full border bg-gray-100 px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full border px-3 py-2 rounded ${
              isEditing ? "border-blue-500" : "bg-gray-100"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Assigned Role
          </label>
          <input
            type="text"
            name="role"
            value={profile.role}
            readOnly
            className="w-full border bg-gray-100 px-3 py-2 rounded"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        {isEditing ? (
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
