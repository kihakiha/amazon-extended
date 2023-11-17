import { CategoryService } from "@/services/category/category.service";
import { useActions } from "@/store/hooks/useActions";
import { useAuth } from "@/store/hooks/useAuth";
import { Loader } from "@/ui/loader";
import { useQuery } from "@tanstack/react-query";
import cn from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FaHandPointDown } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
const Sidebar: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get categories"],
    queryFn: () => CategoryService.getAll(),
    select: ({ data }) => data,
  });

  const { asPath } = useRouter();

  const { user } = useAuth();

  const { logout } = useActions();

  return (
    <aside
      className="bg-secondary flex flex-col justify-between"
      style={{ height: "calc(100vh - 116px)" }}
    >
      <div>
        {isLoading ? (
          <Loader />
        ) : data ? (
          <>
            <div className="flex items-center text-xl text-white mt-4 mb-6 ml-6">
              Категории: <FaHandPointDown className="text-primary ml-4" />
            </div>
            <ul>
              {data.map((category) => (
                <li key={category.name}>
                  <Link
                    className={cn(
                      "block text-lg my-3 px-10 hover: text-primary transition-colors duration-200",
                      asPath === `/category/${category.slug}`
                        ? "text-primary"
                        : "text-white",
                    )}
                    href={`/category/${category.slug}`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="text-white">Категорий нет :d</div>
        )}
      </div>

      {!!user && (
        <button
          className="text-white flex items-center ml-10 mb-10"
          onClick={() => logout()}
        >
          Выйти <FiLogOut className={"ml-4"} />
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
