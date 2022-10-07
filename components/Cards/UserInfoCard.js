import React from "react";
import Image from "next/image";
import { AiOutlineUser } from "react-icons/ai";

function UserInfoCard({ user }) {
  return (
    <div className="flex flex-col sm:align-center">
      <div className="justify-center h-full sm:w-full lg:w-3/4 bg-roz rounded-xl lg:h-100">
        <div className="flex flex-col justify-center h-full">
          <h1 className="flex justify-center text-xl text-center">Owner</h1>
          <div className="flex justify-center w-full text-center rounded-3xlr">
            <Image
              src={user.cover_photo ? user.cover_photo : "/user_default.png"}
              className="object-cover text-center rounded-3xl"
              height={200}
              width={400}
            />
          </div>

          <div className="flex flex-col items-center pl-4">
            <div className="flex flex-row gap-1 pt-3">
              <AiOutlineUser size={25} />
              <p className="text-lg"> {user.first_name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfoCard;
