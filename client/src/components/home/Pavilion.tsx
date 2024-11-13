import React, { useState } from "react";

interface FormData {
  name: string;
  phone?: string;
  email?: string;
  gender: string;
  location: string;
}

const VideoWithForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: '',
    email: '',
    gender: "",
    location: "",
  });
  const isMobile = window.innerWidth <= 768;

  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle form input and select change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.name && formData.gender && formData.location) {
      setFormSubmitted(true);
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {!formSubmitted ? (
        <form
          onSubmit={handleSubmit}
          style={{
            padding: "20px",
            border: "1px solid #e0e0e0",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#3c4043",
              marginBottom: "20px",
            }}
          >
            Watch Nigeria Pavilion at the Blue Zone for COP29
          </h2>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #e0e0e0",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #e0e0e0",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              Phone <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #e0e0e0",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              Gender <span style={{ color: "red" }}>*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #e0e0e0",
              }}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              Where are you watching from?{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #e0e0e0",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "green",
              color: "white",
              padding: "15px",
              fontSize: "16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
      ) : (
        <div style={{ padding: "10px" }}>
          <h3>Thank you for filling out the form. Enjoy the video!</h3>
          <iframe
            width="100%"
            height={isMobile ? "315" : "500"}
            src="https://www.youtube.com/embed/KY8QyJheuy0?si=9d6BPrireERRAByb"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default VideoWithForm;
