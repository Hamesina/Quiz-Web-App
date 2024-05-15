import Image from "next/image";

const Button = ({ label, iconUrl, buttonType }) => {
  const buttonClass =
    buttonType === "outlined"
      ? "border border-brightblue-7 text-brightblue-9 bg-white"
      : "bg-brightblue-7 text-white";

  return (
    <button
      className={`flex justify-center items-center gap-2 px-7 py-4 font-montserrat text-lg leading-none rounded-full ${buttonClass}`}
    >
      {label}
      {iconUrl && (
        <Image
          className="ml-2 rounded-full w-5 h-5"
          src={iconUrl}
          alt="right arrow"
        />
      )}
    </button>
  );
};
export default Button;
