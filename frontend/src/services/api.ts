const API_URL = "http://127.0.0.1:8000";

export const IMAGE_URL = `${API_URL}/uploads/`;

/* ===========================
   Complete AI Analysis API
=========================== */

export async function analyzeComplete(
  file: File,
  caption: string
) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("caption", caption);

  const response = await fetch(`${API_URL}/analyze-complete`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Analysis Failed");
  }

  return response.json();
}

/* ===========================
   Image Analysis
=========================== */

export async function analyzeImage() {
  const response = await fetch(`${API_URL}/analyze`);

  if (!response.ok) {
    throw new Error("Analysis Failed");
  }

  return response.json();
}

/* ===========================
   History
=========================== */

export async function getHistory() {
  const response = await fetch(`${API_URL}/history`);

  if (!response.ok) {
    throw new Error("History Failed");
  }

  return response.json();
}

/* ===========================
   Dashboard
=========================== */

export async function getDashboard() {
  const response = await fetch(`${API_URL}/dashboard`);

  if (!response.ok) {
    throw new Error("Dashboard Failed");
  }

  return response.json();
}

/* ===========================
   Recent Activity
=========================== */

export async function getRecentActivity() {
  const response = await fetch(`${API_URL}/recent-activity`);

  if (!response.ok) {
    throw new Error("Recent Activity Failed");
  }

  return response.json();
}
/* ===========================
   Current User
=========================== */

export async function getCurrentUser() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("User Fetch Failed");
  }

  return response.json();
}
/* ===========================
   Export History CSV
=========================== */

export async function exportHistoryCSV() {
  const response = await fetch(
    `${API_URL}/history/export`
  );

  if (!response.ok) {
    throw new Error("Export Failed");
  }

  return await response.blob();
}
/* ===========================
   Update Profile
=========================== */

export async function updateProfile(
  username: string,
  email: string
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/profile/update`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        username,
        email,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Profile Update Failed");
  }

  return response.json();
}
/* ===========================
   Change Password
=========================== */

export async function changePassword(
  currentPassword: string,
  newPassword: string
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/change-password`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Password Change Failed");
  }

  return response.json();
}