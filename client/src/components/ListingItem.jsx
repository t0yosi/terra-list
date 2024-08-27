import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaBath, FaBed } from "react-icons/fa";

export default function ListingItem({ listing }) {
  return (
    //   <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
    //     <Link to={`/listing/${listing._id}`}>
    //       <img
    //         src={
    //           listing.imageUrls[0] ||
    //           "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
    //         }
    //         alt="listing cover"
    //         className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
    //       />
    //       <div className="p-3 flex flex-col gap-2 w-full">
    //         <p className="truncate text-lg font-semibold text-slate-700">
    //           {listing.name}
    //         </p>
    //         <div className="flex items-center gap-1">
    //           <MdLocationOn className="h-4 w-4 text-green-700" />
    //           <p className="text-sm text-gray-600 truncate w-full">
    //             {listing.address}
    //           </p>
    // </div>
    // <p className="text-sm text-gray-600 line-clamp-2">
    //   {listing.description}
    // </p>
    //         <p className="text-slate-500 mt-2 font-semibold ">
    //           $
    //           {listing.offer
    //             ? listing.discountedPrice.toLocaleString("en-US")
    //             : listing.regularPrice.toLocaleString("en-US")}
    //           {listing.type === "rent" && " / month"}
    //         </p>
    //         <div className="text-slate-700 flex gap-4">
    //           <div className="font-bold text-xs">
    // <FaBed className="text-lg" />
    // {listing.bedrooms > 1
    //   ? `${listing.bedrooms} beds `
    //   : `${listing.bedrooms} bed `}
    //           </div>
    //           <div className="font-bold text-xs">
    // <FaBath className="text-lg" />
    // {listing.bathrooms > 1
    //   ? `${listing.bathrooms} baths `
    //   : `${listing.bathrooms} bath `}
    //           </div>
    //         </div>
    //       </div>
    //     </Link>

    //   </div>
    // );

    <div className="mt-0 p-4 w-full lg:w-1/3 hover:shadow-lg transition-shadow overflow-hidden rounded-lg sm:w-[280px]">
      <Link to={`/listing/${listing._id}`}>
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Card Image */}
          <img
            className="w-full h-64 object-cover rounded-t-3xl"
            src={
              listing.imageUrls[0] ||
              "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
            }
            alt={listing.name}
          />

          {/* Card Body */}
          <div className="p-6 my-auto">
            <p className="truncate text-lg font-semibold text-purple-700">
              {listing.name}
            </p>
            <div className="flex flex-row justify-between">
              <div className="flex items-center gap-1">
                <MdLocationOn className="h-4 w-4 text-green-700" />
                <p className="text-sm font-regular">{listing.address}</p>
              </div>
              <p className="text-sm text-gray-600">{listing.type}</p>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {listing.description}
            </p>
            <p className="text-xl font-bold text-green-700">
              $
              {listing.offer
                ? listing.discountedPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
                <div className="uppercase font-bold text-orange-700">{listing.type === "rent" && " / month"}</div>
              
            </p>
          </div>

          {/* Card Footer */}
          <div className="p-4 bg-gray-50 rounded-b-2xl">
            <div className="flex justify-around items-center text-center">
              <div className="flex items-center space-x-1">
                <FaBed className="text-lg" />
                <span className="text-black">
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} beds `
                    : `${listing.bedrooms} bed `}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <FaBath className="text-lg" />
                <span className="text-black">
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} baths `
                    : `${listing.bathrooms} bath `}
                </span>
              </div>
              {/* <div className="flex items-center space-x-1">
              <img className="w-5" src="" alt="Size" />
              <span className="text-black">4</span>
            </div> */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
