export default function Register() {
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
                          placeholder="Name"
                          autoComplete="username"
                        />
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
                      <div className="col-6 col-12-xsmall">
                        <input
                          type="password"
                          name="psw2"
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
