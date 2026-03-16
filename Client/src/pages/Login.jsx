import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button, Loading, Textbox } from "../components";
import { useLoginMutation } from "../redux/slices/api/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import { useEffect } from "react";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (data) => {
    try {
      const res = await login(data).unwrap();
      // console.log("User data: ", res);

      dispatch(setCredentials(res));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4">

    <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white shadow-2xl rounded-2xl overflow-hidden">

      {/* Left Side Branding */}
      <div className="hidden md:flex flex-col justify-center items-center bg-blue-600 text-white p-10">
        <h1 className="text-4xl font-bold mb-4">Task Manager</h1>
        <p className="text-lg text-center">
          Manage your tasks efficiently with our cloud based system.
        </p>
      </div>

      {/* Login Form */}
      <div className="p-8 md:p-12 flex flex-col justify-center">

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Welcome Back
        </h2>

        <p className="text-gray-500 text-center mb-8">
          Please login to your account
        </p>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-5"
        >

          <Textbox
            placeholder="you@example.com"
            type="email"
            name="email"
            label="Email"
            register={register("email", {
              required: "Email Address is required!",
            })}
            error={errors.email?.message}
          />

          <Textbox
            placeholder="password"
            type="password"
            name="password"
            label="Password"
            register={register("password", {
              required: "Password is required!",
            })}
            error={errors.password?.message}
          />

          <span className="text-sm text-blue-600 hover:underline cursor-pointer">
            Forgot Password?
          </span>

          {isLoading ? (
            <Loading />
          ) : (
            <Button
              type="submit"
              label="Login"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            />
          )}
        </form>

      </div>
    </div>
  </div>
);

};

export default Login;
