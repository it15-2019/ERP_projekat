import { useState } from "react";
import "./register.css";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { register } from "../../redux/apiCalls";
import { Link } from "react-router-dom";

export default function Register() {

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (file == null)
    {
      const user = { ...inputs };
      register(dispatch, user);
      history.push('/login');
    }
    else 
    {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const user = { ...inputs, img: downloadURL };
            Register(dispatch, user);
            history.push('/login');
          });
        }
      )
    }
  };

  return (
    <div className="user">
      <div className="userContainer">
        <div className="userUpdate">
        <h1 className="userTitle">Register User</h1>
            <div className="userUpdateUpload">
              <img src="https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" alt="" className="userUpdateImg" />
                <input
                  name="img"
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
            </div>
            <form className="userUpdateForm" onSubmit={handleClick}>
            <div className="userUpdateItem">
              <label>Username</label>
              <input
                type="text"
                name="username"
                className="userUpdateInput"
                placeholder="Username"
                onChange={handleChange}
                required="true"
              />
            </div>
            <div className="userUpdateItem">
              <label>City</label>
              <input
                type="text"
                name="city"
                className="userUpdateInput"
                placeholder="City"
                onChange={handleChange}
                required="true"
              />
            </div>
            <div className="userUpdateItem">
              <label>First name</label>
              <input
                type="text"
                name="firstName"
                className="userUpdateInput"
                placeholder="First Name"
                onChange={handleChange}
                required="true"
              />
            </div>
            <div className="userUpdateItem">
              <label>Address</label>
              <input
                type="text"
                name="address"
                className="userUpdateInput"
                placeholder="Address"
                onChange={handleChange}
                required="true"
              />
            </div>
            <div className="userUpdateItem">
              <label>Last name</label>
              <input
                type="text"
                name="lastName"
                className="userUpdateInput"
                placeholder="Last Name"
                onChange={handleChange}
                required="true"
              />
            </div>
            <div className="userUpdateItem">
              <label>Phone number</label>
              <input
                type="text"
                name="phoneNumber"
                className="userUpdateInput"
                placeholder="Phone number"
                onChange={handleChange}
                required="true"
              />
            </div>
            <div className="userUpdateItem">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="userUpdateInput"
                placeholder="Email"
                onChange={handleChange}
                required="true"
              />
            </div> 
            <div className="userUpdateItem">
              <label>Date of birth</label>
              <input
                type="text"
                name="birthday"
                className="userUpdateInput"
                onChange={handleChange}
                placeholder="DD/MM/YYYY"
                required="true"
              />
            </div>
            <div className="userUpdateItem">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="userUpdateInput"
                placeholder="Password"
                onChange={handleChange}
                required="true"
              />
            </div>
            <div className="userUpdateItem">
              <button className="userUpdateButton">REGISTER</button>
            </div>
            <div className="userUpdateRatio">
              <label>Gender</label>
              <input className="radioInput" type="radio" name="gender" value="female" onChange={handleChange}/>
              <span className="radioInput">Female</span>
              <input className="radioInput" type="radio" name="gender" value="male" onChange={handleChange}/>
              <span className="radioInput">Male</span>
              <input className="radioInput" type="radio" name="gender" value="other" onChange={handleChange} defaultChecked="true"/>
              <span className="radioInput">Other</span>
            </div>
            <p>If you have account, login <Link to="/login">HERE</Link></p>
          </form>
        </div>
      </div>
    </div>   
  );
}
