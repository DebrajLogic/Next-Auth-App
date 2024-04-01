"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function SignupPage() {
  const [user, setUser] = useState({ email: "", password: "", username: "" });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
    } catch (error) {
      console.log("Signup failed");
    }
  };

  return <div>SignupPage</div>;
}

export default SignupPage;
