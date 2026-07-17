import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Check } from "lucide-react";

import { register } from "@/api/auth.api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerSchema } from "../../schema/AuthSchema";
import { showToast } from "../../lib/toast";
import { Link, useNavigate } from "react-router";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const roles = [
    "admin",
    "plant_manager",
    "maintenance_engineer",
    "supervisor",
    "technician",
  ];

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      employeeId: "",
      role: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await register(data);
      showToast.success(response?.message || "User Registered Successfully");
      navigate("/login");
      form.reset();
    } catch (error) {
      console.log(error);

      showToast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Registration Failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create User</CardTitle>

        <CardDescription>
          Create a new user for the Plant Maintenance System.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Full Name */}

            <Controller
              name="fullName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Full Name</FieldLabel>

                  <Input
                    {...field}
                    placeholder="Muhammad Ali"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Employee ID */}

            <Controller
              name="employeeId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Employee ID</FieldLabel>

                  <Input
                    {...field}
                    placeholder="EMP001"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Role Combobox */}

            <Controller
              name="role"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Role</FieldLabel>

                  <div className="relative">
                    <Input
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);

                        setRoleOpen(true);
                      }}
                      onFocus={() => setRoleOpen(true)}
                      onBlur={() => {
                        setTimeout(() => {
                          setRoleOpen(false);
                        }, 200);
                      }}
                      placeholder="Type or select role"
                      aria-invalid={fieldState.invalid}
                    />

                    {roleOpen && (
                      <div className="absolute z-50 mt-1 w-full rounded-md border bg-background shadow-md overflow-hidden">
                        {roles

                          .filter((role) =>
                            role

                              .toLowerCase()

                              .includes(field.value.toLowerCase()),
                          )

                          .map((role) => (
                            <button
                              key={role}
                              type="button"
                              onMouseDown={() => {
                                field.onChange(role);

                                setRoleOpen(false);
                              }}
                              className="flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-muted"
                            >
                              <span>{role}</span>

                              {field.value === role && (
                                <Check className="h-4 w-4" />
                              )}
                            </button>
                          ))}

                        {roles.filter((role) =>
                          role

                            .toLowerCase()

                            .includes(field.value.toLowerCase()),
                        ).length === 0 &&
                          field.value && (
                            <div className="px-3 py-2 text-sm text-muted-foreground">
                              Use custom role:
                              <span className="font-medium">{field.value}</span>
                            </div>
                          )}
                      </div>
                    )}
                  </div>

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Password */}

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>

                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      className="pr-10"
                      aria-invalid={fieldState.invalid}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create User"
              )}
            </Button>
          </FieldGroup>

          <p className="mt-2 capitalize">
            if you already have a account{" "}
            <Link className="font-bold underline" to={"/login"}>
              Login
            </Link>{" "}
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
