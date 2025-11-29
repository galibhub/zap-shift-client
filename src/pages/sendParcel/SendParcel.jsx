import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();



  const {user}=useAuth();
  const axiosSecure=useAxiosSecure();


  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
   //explore useMemo useCallback

  const senderRegion = useWatch({control,name: 'senderRegion'});
  const receiverRegion=useWatch({control,name:'receiverRegion'})

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

//   console.log(regions);

  const handleSendParcel = (data) => {
  console.log(data);
  const isDocument = data.parcelType === 'document';
  const isSameDistrict = data.senderDistrict === data.receiverDistrict;

  const parcelWeight = parseFloat(data.parcelWeight);
  let cost = 0;
  
  if (isDocument) {
    cost = isSameDistrict ? 60 : 80;
  } else {
    if (parcelWeight < 3) {
      cost = isSameDistrict ? 110 : 150;
    } else {
      const minCharge = isSameDistrict ? 110 : 150;
      const extraWeight = parcelWeight - 3;
      const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;
      cost = minCharge + extraCharge;
    }
  }
  data.cost=cost;
  console.log('cost:', cost);
 

  Swal.fire({
  title: "Agree with the Cost ?",
  text: `You will be charged ${cost} taka!`,
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "I Agree! "
}).then((result) => {
  if (result.isConfirmed) {

     //save the parcel into to the database
     axiosSecure.post('/parcels',data)
     .then(res=>{
        console.log('after saving parcel',res.data);
     })

    // Swal.fire({
    //   title: "Deleted!",
    //   text: "Your file has been deleted.",
    //   icon: "success"
    // });
  }
});
};
  return (
    <div>
      <h2 className="text-5xl font-bold">Send A Parcel</h2>

      <form
        onSubmit={handleSubmit(handleSendParcel)}
        className="mt-12 p-4 text-black"
      >
        {/* Parcel type */}
        <div>
          <label className="label mr-4">
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              className="radio"
              defaultChecked
            />
            Document
          </label>

          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              value="non-document"
              className="radio "
            />
            Non-Document
          </label>
        </div>

        {/* parcel info: name,weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              className="input w-full"
              {...register("parcelName")}
              placeholder="Parcel name"
            />
          </fieldset>

          <fieldset className="fieldset">
            <label className="label">Parcel Weight (kg)</label>
            <input
              type="number"
              className="input w-full"
              {...register("parcelWeight")}
              placeholder="Parcel Weight"
            />
          </fieldset>
        </div>

        {/* two column Sender and Receiver */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Sender Details Column */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Sender Details</h4>
            <label className="label">Sender Name</label>
            <input
              type="text"
              className="input w-full"
              {...register("senderName")}
              defaultValue={user?.displayName}
              placeholder="Sender name"
            />

            {/*Sender email */}
            <label className="label">Sender Email</label>
            <input
              type="text"
              className="input w-full"
              {...register("senderEmail")}
              defaultValue={user?.email}
              placeholder="Sender Email"
            />

            {/* sender region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Region</legend>
              <select
                {...register("senderRegion")}
                defaultValue="Pick a Region"
                className="select"
              >
                <option disabled={true}>Pick a Region</option>

                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>



  {/* sender district */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Districts</legend>
              <select
                {...register("senderDistrict")}
                defaultValue="Pick a District"
                className="select"
              >
                <option disabled={true}>Pick a District</option>

                {districtsByRegion(senderRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>



            {/* Sender Address */}
            <label className="label mt-3">Sender Address</label>
            <input
              type="text"
              className="input w-full"
              {...register("senderAddress")}
              placeholder="Sender Address"
            />

           
          </fieldset>
{/* //------------------------------------------------------------------------------------// */}
          {/* Receiver Details Column */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Receiver Details</h4>

            <label className="label">Receiver Name</label>
            <input
              type="text"
              className="input w-full"
              {...register("receiverName")}
              placeholder="Receiver name"
            />

            {/* Receiver Email */}
            <label className="label">Receiver Email</label>
            <input
              type="text"
              className="input w-full"
              {...register("receiverEmail")}
              placeholder="Receiver Email"
            />

   {/* Reveiver region */}
  <fieldset className="fieldset">
  <legend className="fieldset-legend">Receiver Region</legend>
  <select
    {...register("receiverRegion")}
    defaultValue="Pick a Region"
    className="select"
  >
    <option disabled={true}>Pick a Region</option>

    {regions.map((r, i) => (
      <option key={i} value={r}>
        {r}
      </option>
    ))}
  </select>
</fieldset>



          {/* Reciever district */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver Districts</legend>
              <select
                {...register("receiverDistrict")}
                defaultValue="Pick a District"
                className="select"
              >
                <option disabled={true}>Pick a District</option>

                {
                districtsByRegion(receiverRegion).map((d,i)=><option key={i} value={d}>{d}</option>)
                }
              </select>
            </fieldset>






            {/* Receiver Address */}
            <label className="label mt-3">Receiver Address</label>
            <input
              type="text"
              className="input w-full"
              {...register("receiverAddress")}
              placeholder="Receiver Address"
            />

           
          </fieldset>
        </div>

        <input
          type="submit"
          className="btn btn-primary text-black mt-8"
          value="Send-Parcel"
        />
      </form>
    </div>
  );
};

export default SendParcel;
