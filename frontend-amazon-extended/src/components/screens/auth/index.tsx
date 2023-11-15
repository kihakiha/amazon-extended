import { useAuthRedirect } from "@/components/hooks/useAuthRedirect";
import { useActions } from "@/store/hooks/useActions";
import { useAuth } from "@/store/hooks/useAuth";
import { IEmailPassword } from "@/store/user/user.interface";
import { Button } from "@/ui/button";
import Field from "@/ui/field";
import { Heading } from "@/ui/heading";
import { Loader } from "@/ui/loader";
import { Meta } from "@/ui/meta";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { validEmail } from "../../../utils/validEmail";

export const Auth: React.FC = () => {
  useAuthRedirect();

  const { isLoading } = useAuth();

  const { login, register } = useActions();

  const [authType, setAuthType] = React.useState<"login" | "register">("login");

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IEmailPassword>({ mode: "onChange" });

  const onSubmit: SubmitHandler<IEmailPassword> = (data) => {
    if (authType === "login") {
      login(data);
    } else {
      register(data);
    }
    reset();
  };
  return (
    <Meta title="Авторизация">
      <main className="flex">
        <section className="flex h-screen w-1/2">
          <form
            className="rounded-lg bg-white shadow-sm py-8 px-20 m-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Heading className="text-center mb-8">
              {authType === "login" ? "Авторизация" : "Регистрация"}
            </Heading>

            {!isLoading ? (
              <>
                <Field
                  {...formRegister("email", {
                    required: "Введите Email!",
                    pattern: {
                      value: validEmail,
                      message: "Введите корректный email",
                    },
                  })}
                  placeholder="Email"
                  error={errors.email?.message}
                />
                <Field
                  {...formRegister("password", {
                    required: "Введите пароль!",
                    minLength: {
                      value: 6,
                      message: "Минимальная длина: 6",
                    },
                  })}
                  type="password"
                  placeholder="Пароль"
                  error={errors.password?.message}
                />
              </>
            ) : (
              <div className="w-full flex justify-center">
                <Loader />
              </div>
            )}

            <Button variant="primary" className="block mt-8 mx-auto">
              {authType === "login" ? "Войти" : "Зарегистрироваться"}
            </Button>
            <hr className="mt-4 opacity-20" />
            <div className="w-full flex justify-center mt-2 cursor-pointer">
              <span
                className="opacity-40"
                onClick={() =>
                  setAuthType(authType === "login" ? "register" : "login")
                }
              >
                {authType === "login"
                  ? "Зарегистрироваться"
                  : "Уже есть аккаунт?"}
              </span>
            </div>
          </form>
        </section>
        <section className="h-screen w-1/2">
          <img
            src="/img/AuthBg.png"
            alt="text"
            className="h-screen block absolute right-0"
          />
        </section>
      </main>
    </Meta>
  );
};
