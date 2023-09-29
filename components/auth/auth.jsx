import React, { useState } from "react";
import "../../Pages/script.js";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./popup.css";
import { useCookies, Cookies } from "react-cookie";

function Auth() {
  const { register, handleSubmit } = useForm();
  const [cookies, setCookie] = useCookies(["user-id"]);
  function connectForm(user) {
    setCookie("user-id", user.pseudo);
  }

  return (
    <div className="Auth">
      <form onSubmit={handleSubmit(connectForm)}>
        <TextField
          {...register("pseudo")}
          id="outlined-multiline-static"
          label="Pseudo"
          multiline
          maxRows={4}
          placeholder="Default Value"
        />
        <Button type="submit" variant="contained">
          Connexion
        </Button>
      </form>
    </div>
  );
}

export default Auth;
