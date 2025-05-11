import Link from "next/link";

type Props = {
  title: string;
};

export default function Breadcrumb({ title }: Props) {
  return (
    <div className="flex items-center text-gray-500 text-sm border-b border-gray-200">
      <div className="container mx-auto py-4 px-10">
        <Link href="/" className="hover:text-blue-600">
          Accueil
        </Link>
        <span className="mx-2">{">"}</span>
        <span className="text-black font-bold">{title}</span>
      </div>
    </div>
  );
}
