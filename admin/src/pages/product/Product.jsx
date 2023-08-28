import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./product.css";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateProduct } from "../../redux/apiCalls";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];

  const product = useSelector((state) => 
    state.product.products.find((product) => product._id === productId));

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
      const product = { ...inputs };
      updateProduct(productId, product, dispatch);
      history.push('/products');
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
            const product = { ...inputs, img: downloadURL };
            updateProduct(productId, product, dispatch);
            history.push('/products');
          });
        }
      )
    }
  };  

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">ID:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div>
              <span className="productInfoKey">DESCRIPTION:</span>
              <span className="productInfoValue">{product.desc}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input type="text" name="title" placeholder={product.title} onChange={handleChange}/>
            <label>Product Description</label>
            <input type="text" name="desc" placeholder={product.desc} onChange={handleChange}/>
            <label>Price</label>
            <input type="number" name="price" placeholder={product.price} onChange={handleChange}/>
            <label>Categories</label>
            <input type="text" name="categories" placeholder={product.categories} onChange={handleChange} />
            <label>In Stock</label>
            <select name="inStock" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <input
                name="img"
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button onClick={handleClick} className="productButton">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
