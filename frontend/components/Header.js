import { useState } from "react";
import Link from "next/link";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { APP_NAME } from "../config";
import { signout, isAuth } from "../actions/auth";
import { useRouter } from "next/router";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggle = () => setIsOpen(!isOpen);

  const checkUserOrAdmin = () => {
    if (isAuth() && isAuth().role !== 1) {
      return (
        <>
          <NavItem>
            <NavLink
              style={{ cursor: "pointer" }}
              onClick={() => router.replace(`/user`)}
            >
              {`${isAuth().name}'s Dashboard`}
            </NavLink>
          </NavItem>
        </>
      );
    } else if (isAuth() && isAuth().role === 1) {
      return (
        <>
          <NavItem>
            <NavLink
              style={{ cursor: "pointer" }}
              onClick={() => router.replace(`/admin`)}
            >
              {`${isAuth().name}'s Dashboard`}
            </NavLink>
          </NavItem>
        </>
      );
    }
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavLink className="font-weight-bold">{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!isAuth() && (
              <>
                <NavItem>
                  <Link href="/signin">
                    <NavLink style={{ cursor: "pointer" }}>Signin</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/signup">
                    <NavLink style={{ cursor: "pointer" }}>Signup</NavLink>
                  </Link>
                </NavItem>
              </>
            )}
            {checkUserOrAdmin()}
            {isAuth() && (
              <>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    onClick={() => signout(() => router.replace(`/signin`))}
                  >
                    Signout
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
