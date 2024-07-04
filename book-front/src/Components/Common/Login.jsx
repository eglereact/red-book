export default function Login() {
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
                        <h1>Login</h1>
                      </div>
                      <div className="col-6 col-12-xsmall">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          autoComplete="email"
                        />
                      </div>
                      <div className="col-6 col-12-xsmall">
                        <input
                          type="password"
                          name="psw"
                          placeholder="Password"
                          autoComplete="new-password"
                        />
                      </div>
                      <div className="col-12">
                        <ul className="actions">
                          <li>
                            <input
                              type="button"
                              value="Login"
                              className="primary"
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
                            <a href="/#register">
                              Don't have an account? Register
                            </a>
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
