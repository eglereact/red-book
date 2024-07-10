import { useEffect, useState } from "react";
import useServerPost from "../../Hooks/useServerPost";
import { REDIRECT_AFTER_REGISTER } from "../../Constants/urls";
import useRegister from "../../Validations/useRegister";
import Input from "../Forms/Input";

export default function Register() {
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };

  const { doAction, response } = useServerPost("register");
  const { errors, validate, setServerErrors } = useRegister();

  const [form, setForm] = useState(defaultValues);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    if (null === response) {
      return;
    }
    setButtonDisabled(false);
    if (response.type === "success") {
      window.location.hash = REDIRECT_AFTER_REGISTER;
    } else {
      if (response.data?.response?.data?.errors) {
        console.log(response.data.response.data.errors);
        setServerErrors(response.data.response.data.errors);
      }
    }
  }, [response]);

  const handleForm = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    //TODO validation
    if (!validate(form)) {
      return;
    }
    setButtonDisabled(true);
    doAction({ name: form.name, email: form.email, password: form.password });
  };

  return (
    <div id="wrapper">
      <div id="main">
        <div className="inner">
          <header id="header"></header>
          <section>
            <header className="main">
              <div className="row aln-center">
                <div className="col-6 col-8-large col-10-medium col-12-small">
                  <form>
                    <div className="row gtr-uniform">
                      <div className="col-12">
                        <h1>Sign Up</h1>
                      </div>
                      <div className="col-6 col-12-xsmall">
                        <Input
                          type="text"
                          name="name"
                          onChange={handleForm}
                          value={form.name}
                          placeholder="Name"
                          autoComplete="username"
                          errors={errors}
                        />
                      </div>
                      <div className="col-6 col-12-xsmall">
                        <Input
                          type="email"
                          name="email"
                          onChange={handleForm}
                          value={form.email}
                          placeholder="Email"
                          autoComplete="email"
                          errors={errors}
                        />
                      </div>
                      <div className="col-6 col-12-xsmall">
                        <Input
                          type="password"
                          name="password"
                          onChange={handleForm}
                          value={form.password}
                          placeholder="Password"
                          autoComplete="new-password"
                          errors={errors}
                        />
                      </div>
                      <div className="col-6 col-12-xsmall">
                        <Input
                          type="password"
                          name="password2"
                          onChange={handleForm}
                          value={form.password2}
                          placeholder="Repeat Password"
                          autoComplete="new-password"
                          errors={errors}
                        />
                      </div>
                      <div className="col-12">
                        <ul className="actions">
                          <li>
                            <input
                              type="button"
                              value="Sign Up"
                              className="primary"
                              disabled={buttonDisabled}
                              onClick={handleSubmit}
                            />
                          </li>
                        </ul>
                      </div>
                      <div className="col-12">
                        <ul className="actions">
                          <li>
                            <a href="/#">Back to home page</a>
                          </li>
                          <li>
                            <a href="/#login">Have an account? Sign Up</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </header>
          </section>
        </div>
      </div>
    </div>
  );
}
