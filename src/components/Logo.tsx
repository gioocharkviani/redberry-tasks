import momentumLogo from "../../public/Momentum.png";
import Hourglass from "../../public/Hourglass.png";
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/" className="flex gap-2 items-center Logo-group">
      <Image
        width={168}
        height={38}
        alt="Logo"
        src={momentumLogo}
        className="shrink-0"
      />
      <Image
        width={38}
        height={38}
        alt="Hourglass"
        src={Hourglass}
        className="shrink-0 hourglass-animation"
      />
    </Link>
  );
};

export default Logo;
