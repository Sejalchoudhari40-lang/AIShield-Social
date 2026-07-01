import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import {
  FaUserCircle,
  FaImage,
  FaEnvelope,
  FaRobot,
  FaShieldAlt,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";

import {
  getCurrentUser,
  updateProfile,
  changePassword,
} from "../services/api";

function Profile() {

  const [user, setUser] = useState({
    username: "",
    email: "",
    total_uploads: 0,
    positive_analysis: 0,
    safe_content: 0,
    member_since: "",
  });

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(false);

  const [showPasswordModal, setShowPasswordModal] =
    useState(false);

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [changingPassword, setChangingPassword] =
    useState(false);

  useEffect(() => {

    async function loadUser() {

      try {

        const data = await getCurrentUser();

        setUser(data);

        setFormData({
          username: data.username,
          email: data.email,
        });

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    loadUser();

  }, []);

  function handleCancel() {

    setEditing(false);

    setFormData({
      username: user.username,
      email: user.email,
    });

  }

  async function handleSave() {

    try {

      const data = await updateProfile(
        formData.username,
        formData.email
      );

      setUser({
        ...user,
        username: data.username,
        email: data.email,
      });

      setEditing(false);

      alert("Profile Updated Successfully ✅");

    } catch (error) {

      console.error(error);

      alert("Profile Update Failed");

    }

  }

  async function handleChangePassword() {

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      setChangingPassword(true);

      await changePassword(
        currentPassword,
        newPassword
      );

      alert("Password Changed Successfully ✅");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setShowPasswordModal(false);

    } catch (error) {

      console.error(error);

      alert("Current Password Incorrect");

    } finally {

      setChangingPassword(false);

    }

  }

  if (loading) {

    return (

      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-2xl text-white">

        Loading Profile...

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-slate-950">

      <Navbar />

      <div className="mx-auto max-w-6xl p-10">
               {/* ===========================
            Profile Header
        =========================== */}

        <div className="rounded-3xl border border-cyan-500/20 bg-slate-900 p-10 shadow-xl">

          <div className="flex flex-col items-center">

            <FaUserCircle className="text-8xl text-cyan-400" />

            {editing ? (

              <input
                value={formData.username}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    username: e.target.value,
                  })
                }
                className="mt-5 w-72 rounded-xl border border-white/10 bg-slate-800 px-5 py-3 text-center text-2xl font-bold text-white outline-none"
              />

            ) : (

              <h1 className="mt-5 text-3xl font-bold text-white">
                {user.username}
              </h1>

            )}

            {editing ? (

              <input
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="mt-4 w-80 rounded-xl border border-white/10 bg-slate-800 px-5 py-3 text-center text-white outline-none"
              />

            ) : (

              <p className="mt-3 flex items-center gap-2 text-gray-400">

                <FaEnvelope />

                {user.email}

              </p>

            )}

            <div className="mt-5 rounded-full bg-green-500/20 px-5 py-2">

              <p className="text-sm font-semibold text-green-400">
                🟢 Verified AIShield User
              </p>

            </div>

          </div>

          {/* Statistics */}

          <div className="mt-10 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl bg-slate-800 p-6 text-center">

              <FaImage className="mx-auto text-3xl text-cyan-400" />

              <h2 className="mt-4 text-3xl font-bold text-white">
                {user.total_uploads}
              </h2>

              <p className="mt-2 text-gray-400">
                Total Uploads
              </p>

            </div>

            <div className="rounded-2xl bg-slate-800 p-6 text-center">

              <FaRobot className="mx-auto text-3xl text-green-400" />

              <h2 className="mt-4 text-3xl font-bold text-white">
                {user.positive_analysis}
              </h2>

              <p className="mt-2 text-gray-400">
                Positive Analysis
              </p>

            </div>

            <div className="rounded-2xl bg-slate-800 p-6 text-center">

              <FaShieldAlt className="mx-auto text-3xl text-purple-400" />

              <h2 className="mt-4 text-3xl font-bold text-white">
                {user.safe_content}
              </h2>

              <p className="mt-2 text-gray-400">
                Safe Content
              </p>

            </div>

          </div>

        </div> 
                {/* ===========================
            Account Information
        =========================== */}

        <div className="mt-10 rounded-3xl border border-white/10 bg-slate-900 p-8">

          <div className="mb-8 flex items-center justify-between">

            <h2 className="text-2xl font-bold text-white">
              Account Information
            </h2>

            {!editing ? (

              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2 font-semibold text-white transition hover:bg-cyan-600"
              >
                <FaEdit />
                Edit Profile
              </button>

            ) : (

              <div className="flex gap-3">

                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 rounded-xl bg-green-500 px-5 py-2 font-semibold text-white transition hover:bg-green-600"
                >
                  <FaSave />
                  Save
                </button>

                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-2 font-semibold text-white transition hover:bg-red-600"
                >
                  <FaTimes />
                  Cancel
                </button>

              </div>

            )}

          </div>

          <div className="space-y-5">

            <div className="flex items-center justify-between border-b border-white/10 pb-4">

              <span className="text-gray-400">
                Username
              </span>

              <span className="font-semibold text-white">
                {user.username}
              </span>

            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-4">

              <span className="text-gray-400">
                Email
              </span>

              <span className="font-semibold text-white">
                {user.email}
              </span>

            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-4">

              <span className="text-gray-400">
                Account Status
              </span>

              <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm font-semibold text-green-400">
                Active ✅
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-gray-400">
                Member Since
              </span>

              <span className="font-semibold text-white">
                {user.member_since}
              </span>

            </div>

          </div>

        </div>

        {/* ===========================
            Quick Actions
        =========================== */}

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          <button
            onClick={() => setEditing(true)}
            className="rounded-2xl border border-cyan-500/30 bg-slate-900 p-5 font-semibold text-cyan-400 transition hover:bg-cyan-500 hover:text-white"
          >
            ✏️ Edit Profile
          </button>

          <button
            onClick={() => setShowPasswordModal(true)}
            className="rounded-2xl border border-yellow-500/30 bg-slate-900 p-5 font-semibold text-yellow-400 transition hover:bg-yellow-500 hover:text-white"
          >
            🔒 Change Password
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="rounded-2xl border border-red-500/30 bg-slate-900 p-5 font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            🚪 Logout
          </button>

        </div>
                {/* ===========================
            Change Password Modal
        =========================== */}

        {showPasswordModal && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">

              <h2 className="mb-6 text-2xl font-bold text-white">
                🔒 Change Password
              </h2>

              <div className="space-y-5">

                <div>

                  <label className="mb-2 block text-sm text-gray-400">
                    Current Password
                  </label>

                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) =>
                      setCurrentPassword(e.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm text-gray-400">
                    New Password
                  </label>

                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(e.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm text-gray-400">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
                  />

                </div>

              </div>

              <div className="mt-8 flex justify-end gap-3">

                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                  className="rounded-xl border border-white/10 px-5 py-2 text-white transition hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  onClick={handleChangePassword}
                  disabled={changingPassword}
                  className="rounded-xl bg-cyan-500 px-5 py-2 font-semibold text-white transition hover:bg-cyan-600 disabled:opacity-50"
                >
                  {changingPassword
                    ? "Changing..."
                    : "Change Password"}
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>

  );

}

export default Profile;