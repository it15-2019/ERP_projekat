import "./orderList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrders } from "../../redux/apiCalls";

export default function OrderList() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {
    getOrders(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteOrder(id, dispatch);
  };

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  const columns = [
    {
      field: "name",
      headerName: "Customer name",
      width: 200,
      renderCell: (params) => {
        return (
            <p>{params.row.shipping.name}</p>
        );
      },
    },
    { field: "userId", headerName: "User ID", width: 200 },
    { field: "total", headerName: "Total (RSD)", width: 150 },
    { 
      field: "delivery_status", 
      headerName: "Delivery status", 
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Button type={params.row.delivery_status} />
          </>
        );
      },
    },

    {
      field: "action", 
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/order/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
      />
    </div>
  );
}
