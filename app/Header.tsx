import Image from "next/image";

function Header() {
  return (
    <div className="w-full h-16 px-12 flex items-center">
      <div className="h-full w-36 relative flex items-center">
        <Image src="runic.svg" alt="Runic logo" fill />
      </div>
    </div>
  );
}

export default Header;
