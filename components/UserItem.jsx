"use client";
const UserItem = () => {
  return (
    <div className="flex items-center justify-center gap-2 border rounded-[8px] p-4">
      <div className="avatar rounded-full min-h-10 min-w-10 bg-emerald-400 text-white font-[700] flex items-center justify-center">
        HT
      </div>
      <div>
        <p className="text-[16px] font-bold">Hammasii Teshome</p>
        <p className="text-[12px] text-neutral-500">
          Hammasiieteshom@gmail.com
        </p>
      </div>
    </div>
  );
};
export default UserItem;
