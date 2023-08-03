import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import "./newUser.css";
import { Phone } from "@material-ui/icons";


export default function NewUser() {
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const [phone , setPhone] = useState([]);
    const dispatch = useDispatch();
  
    const handleChange = (e) => {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    };
    const handleEmail = (e) => {
      setEmail(e.target.value);
    };
    const handlePassword = (e) => {
      setPassword(e.target.value);
    };
    const handlePhone = (e) => {
      setPhone(e.target.value);
    };
  
    const handleClick = (e) => {
      e.preventDefault();
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage();
  const storageRef = ref(storage, 'images/rivers.jpg');
  
  const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      const product = ({...inputs, img: downloadURL });
      addProduct(product , dispatch);
    });
  }
);
    };

  return (
    <div className="newUser">
      <h1 className="addUserTitle">New Product</h1>
      <form className="addUserForm">
        <div className="addUserItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          </div>
        <div className="addUser">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="username"
            onChange={handleChange}
          />
          </div>

        <div className="newUserItem">
          <label>Full Name</label>
          <input type="text" 
          placeholder="Shivam Keluskar"
          onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email"
          value={email}
          placeholder="john@gmail.com" 
          onChange={handleEmail}/>
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" 
          value={password}
          placeholder="password" 
          onChange={handlePassword}/>
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text"
          value={phone}
           placeholder="+91 9967644583"
           onChange={handlePhone} />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" placeholder="New York | USA" />
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="other">Other</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Active</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button onClick={handleClick} className="newUserButton">Create</button>
      </form>
    </div>
  );
}
