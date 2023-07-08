import "./sidebar.css";
import {
  PermIdentity,
  Storefront,
  LocalMallOutlined,
  HomeOutlined
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem">
                <HomeOutlined className="sidebarIcon" />
                Home
              </li>
            </Link>
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/orders" className="link">
              <li className="sidebarListItem">
                <LocalMallOutlined className="sidebarIcon" />
                Orders
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
