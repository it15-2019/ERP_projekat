import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./user.css";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateUser } from "../../redux/apiCalls";

export default function User() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const user = useSelector((state) => state.user.currentUser);

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
      updateUser(userId, user, dispatch);
      history.push('/');
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
            updateUser(userId, user, dispatch);
            history.push('/');
          });
        }
      )
    }
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
      </div>
      <div className="userContainer">
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
            <div className="userUpdateUpload">
              <img src={user.img} alt="" className="userUpdateImg" />
                <input
                  name="img"
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
            </div>
            <form className="userUpdateForm">
            <div className="userUpdateItem">
              <label>Username</label>
              <input
                type="text"
                name="username"
                className="userUpdateInput"
                placeholder={user.username}
                onChange={handleChange}
              />
            </div>
            <div className="userUpdateItem">
              <label>City</label>
              <input
                type="text"
                name="city"
                className="userUpdateInput"
                placeholder={user.city}
                onChange={handleChange}
              />
            </div>
            <div className="userUpdateItem">
              <label>First name</label>
              <input
                type="text"
                name="firstName"
                className="userUpdateInput"
                placeholder={user.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="userUpdateItem">
              <label>Address</label>
              <input
                type="text"
                name="address"
                className="userUpdateInput"
                placeholder={user.address}
                onChange={handleChange}
              />
            </div>
            <div className="userUpdateItem">
              <label>Last name</label>
              <input
                type="text"
                name="lastName"
                className="userUpdateInput"
                placeholder={user.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="userUpdateItem">
              <label>Phone</label>
              <input
                type="text"
                name="phoneNumber"
                className="userUpdateInput"
                placeholder={user.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="userUpdateItem">
              <label>Email</label>
              <input
                type="text"
                name="email"
                className="userUpdateInput"
                placeholder={user.email}
                onChange={handleChange}
              />
            </div> 
            <div className="userUpdateItem">
              <label>Gender</label>
              <select className="userUpdateSelect" name="gender" defaultValue={user.gender}>
                <option value="Male" onChange={handleChange}>Male</option>
                <option value="Female" onChange={handleChange}>Female</option>
              </select>
            </div>
            <div className="userUpdateItem">
              <button className="userUpdateButton" onClick={handleClick}>Update</button>
            </div>
            <div className="userUpdateItem">
              <label>Date of birth</label>
              <input
                type="text"
                name="birthday"
                className="userUpdateInput"
                onChange={handleChange}
                placeholder={user.birthday}
              />
            </div> 
          </form>
        </div>
      </div>
    </div>   
  );
}
