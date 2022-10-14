import React from "react";
import Image from "next/image";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";

function UserInfoCard({ user }) {
  return (
    <div className="flex flex-col sm:align-center">
      <div className="justify-center h-full sm:w-full lg:w-3/4 bg-roz rounded-xl lg:h-100">
        <div className="flex flex-col justify-center h-4/4">
          <h1 className="flex justify-center text-xl text-center">Owner</h1>
          <div className="flex justify-center w-full text-center rounded-3xlr">
            <Image
              src={user.cover_photo ? user.cover_photo : "/user_default.png"}
              className="object-cover text-center rounded-full"
              height={200}
              width={200}
            />
          </div>

          <div className="flex flex-col items-center pt-8 pl-4">
            <div className="flex flex-row gap-1">
              <AiOutlineUser size={25} />
              <p className="text-lg">
                {user.first_name} {user.last_name}
              </p>
            </div>
            <div className="flex flex-row gap-1">
              <AiOutlineMail size={25} />
              <p className="text-lg">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfoCard;
