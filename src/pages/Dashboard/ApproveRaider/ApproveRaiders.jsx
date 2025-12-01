
import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheck, FaEye } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const ApproveRaiders = () => {
  const axiosSecure = useAxiosSecure();

  const { data: raiders = [], refetch } = useQuery({
    queryKey: ["raiders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/raiders");
      return res.data;
    },
  });

  const updateRaiderStatus = (raider, status) => {
    const updateInfo = { status: status, email: raider.email };
   console.log('Sending update:', updateInfo);


    axiosSecure.patch(`/raiders/${raider._id}`, updateInfo).then((res) => {
      console.log('Server response:', res.data);
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Raider status is set to ${status}.`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  const handleApproval = (raider) => {
    updateRaiderStatus(raider, "approved");
  };

  const handleReject = (raider) => {
    updateRaiderStatus(raider, "rejected");
  };

  const handleDelete = (raider) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/raiders/${raider._id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Raider has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">
        Raider Pending Approval: {raiders.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {raiders.map((raider, index) => (
              <tr key={raider._id}>
                <th>{index + 1}</th>
                <td>{raider.name}</td>
                <td>{raider.email}</td>
                <td>{raider.district}</td>
                <td>
                  <span
                    className={`badge ${
                      raider.status === "approved"
                        ? "badge-success"
                        : raider.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {raider.status}
                  </span>
                </td>
                <td>



                  <button
                   
                    className="btn btn-sm btn-success mr-2"
                    
                  >
                    <FaEye />
                  </button>



                  <button
                    onClick={() => handleApproval(raider)}
                    className="btn btn-sm btn-success"
                    disabled={raider.status === "approved"}
                  >
                    <FaCheck />
                  </button>




                  <button
                    onClick={() => handleReject(raider)}
                    className="btn btn-sm btn-warning mx-1"
                    disabled={raider.status === "rejected"}
                  >
                    <RxCross2 />
                  </button>

                  <button
                    onClick={() => handleDelete(raider)}
                    className="btn btn-sm btn-error"
                  >
                    <FaRegTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRaiders;




// import { useQuery } from "@tanstack/react-query";
// import React from "react";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { FaCheck } from "react-icons/fa";
// import { RxCross2 } from "react-icons/rx";
// import { FaRegTrashCan } from "react-icons/fa6";
// import Swal from "sweetalert2";

// const ApproveRaiders = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: raiders = [], refetch } = useQuery({
//     queryKey: ["raiders", "pending"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/raiders");
//       return res.data;
//     },
//   });

//   const handleApproval = (id,email) => {
//     const updateInfo = { status: "approved" ,
//       email: email 
//      };
//     axiosSecure.patch(`/raiders/${id}`, updateInfo).then((res) => {
//       if (res.data.modifiedCount) {
//         refetch(); // Add this to refresh the data
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: "Raider has been approved",
//           showConfirmButton: false,
//           timer: 2000,
//         });
//       }
//     });
//   };

//   const handleReject = (id) => {
//     const updateInfo = { status: "rejected" };
//     axiosSecure.patch(`/raiders/${id}`, updateInfo).then((res) => {
//       if (res.data.modifiedCount) {
//         refetch();
//         Swal.fire({
//           position: "top-end",
//           icon: "info",
//           title: "Raider has been rejected",
//           showConfirmButton: false,
//           timer: 2000,
//         });
//       }
//     });
//   };

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure.delete(`/raiders/${id}`).then((res) => {
//           if (res.data.deletedCount) {
//             refetch();
//             Swal.fire({
//               title: "Deleted!",
//               text: "Raider has been deleted.",
//               icon: "success"
//             });
//           }
//         });
//       }
//     });
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-3xl font-bold mb-6">Raider Pending Approval: {raiders.length}</h2>

//       <div className="overflow-x-auto">
//         <table className="table table-zebra">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Status</th>
//               <th>District</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {raiders.map((raider, index) => (
//               <tr key={raider._id}>
//                 <th>{index + 1}</th>
//                 <td>{raider.name}</td>
//                 <td>{raider.email}</td>
//                 <td>
//                   <span className={`badge ${raider.status === 'approved' ? 'badge-success' : raider.status === 'rejected' ? 'badge-error' : 'badge-warning'}`}>
//                     {raider.status}
//                   </span>
//                 </td>
//                 <td>{raider.district}</td>
//                 <td>
//                   <button
//                     onClick={() => handleApproval(raider._id,raider.email)}
//                     className="btn btn-sm btn-success"
//                     disabled={raider.status === 'approved'}
//                   >
//                     <FaCheck />
//                   </button>

//                   <button 
//                     onClick={() => handleReject(raider._id)}
//                     className="btn btn-sm btn-warning mx-1"
//                     disabled={raider.status === 'rejected'}
//                   >
//                     <RxCross2 />
//                   </button>

//                   <button 
//                     onClick={() => handleDelete(raider._id)}
//                     className="btn btn-sm btn-error"
//                   >
//                     <FaRegTrashCan />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ApproveRaiders;