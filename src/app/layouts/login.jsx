import React, { useState } from "react";
import LoginForm from "../components/ui/loginForm";
import { useParams } from "react-router-dom";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );
  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === "register" ? (
            <>
              <h3 className="mb-4">Регистрация</h3>
              <RegisterForm />
              <p>
                Уже есть аккаунт?
                <a
                  className="link-underline-primary"
                  role="button"
                  onClick={toggleFormType}
                >
                  Вход
                </a>
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-4">Авторизация</h3>
              <LoginForm />
              <p>
                Нет аккаунта?
                <a
                  className="link-underline-primary"
                  role="button"
                  onClick={toggleFormType}
                >
                  Зарегистрируйтесь
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
