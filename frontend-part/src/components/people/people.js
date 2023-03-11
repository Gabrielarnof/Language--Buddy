import "./people.css";
import { useState } from "react";
import { useEffect } from "react";
import StudentHeader from "../studentHeader/studentHeader";
import { useNavigate } from "react-router-dom";
import SearchFilter from "../filter/SearchFilter";

function People() {
  const nav = useNavigate("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //encode JWTtoken and get current id user
  let token = localStorage.getItem("jwtToken");
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  let result = JSON.parse(jsonPayload);
  let current_id = result.sub;

  useEffect(() => {
    (async () => {
      await fetch("http://localhost:4000/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            nav("/login");
            throw new Error("Something bad with connection");
          }
          return res.json();
        })
        .then(
          (data) => {
            const newArr = data.filter((el) => el.id !== current_id);
            setStudents(newArr);
            setLoading(false);
          },
          (error) => {
            setError(error.toString());
            console.log(error);
            setLoading(false);
          }
        );
    })();
  }, []);

  return (
    <div>
      <div className="wrapper">
           <StudentHeader />

          {loading ? (
            <p>The list of students is loading...</p>
          ) : error != "" ? (
            <p>{error}</p>
          ) : (
            <SearchFilter students={students} />
          )}
      </div>
    </div>
  );
}

export default People;
