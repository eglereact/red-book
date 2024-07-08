import { useEffect, useState } from "react";
import useServerPost from "../../Hooks/useServerPost";
import { REDIRECT_AFTER_REGISTER } from "../../Constants/urls";

export default function Register() {
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };

  const { doAction, response } = useServerPost("register");

  const [form, setForm] = useState(defaultValues);

  useEffect(() => {
    if (null === response) {
      return;
    }
    window.location.hash = REDIRECT_AFTER_REGISTER;
  }, [response]);

  const handleForm = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    //TODO validation
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
                        <input
                          type="text"
                          name="name"
                          onChange={handleForm}
                          value={form.name}
                          placeholder="Name"
                          autoComplete="username"
                        />
                      </div>
                      <div className="col-6 col-12-xsmall">
                        <input
                          type="email"
                          name="email"
                          onChange={handleForm}
                          value={form.email}
                          placeholder="Email"
                          autoComplete="email"
                        />
                      </div>
                      <div className="col-6 col-12-xsmall">
                        <input
                          type="password"
                          name="password"
                          onChange={handleForm}
                          value={form.password}
                          placeholder="Password"
                          autoComplete="new-password"
                        />
                      </div>
                      <div className="col-6 col-12-xsmall">
                        <input
                          type="password"
                          name="password2"
                          onChange={handleForm}
                          value={form.password2}
                          placeholder="Repeat Password"
                          autoComplete="new-password"
                        />
                      </div>
                      <div className="col-12">
                        <ul className="actions">
                          <li>
                            <input
                              type="button"
                              value="Sign Up"
                              className="primary"
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
