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
        className="shrink-0  w-[168px] h-[auto]"
        priority={true}
      />
      <Image
        width={38}
        height={38}
        alt="Hourglass"
        src={Hourglass}
        className="shrink-0 hourglass-animation w-[38px] h-[38px]"
      />
    </Link>
  );
};

export default Logo;
