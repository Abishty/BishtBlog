import Admin from "../../components/auth/Admin";
import Layout from "../../components/Layout";
import { List } from "reactstrap";
import Link from "next/link";

const AdminIndex = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-3 pb-3">
              <h2>Admin Dashboard</h2>
            </div>
            <div className="col-md-4">
              <List type="unstyled">
                <li className="list-group-item">
                  <Link href="/admin/crud/category-tag">
                    <a>Create Category</a>
                  </Link>
                </li>
              </List>
            </div>
            <div className="col-md-8">
              <List type="unstyled">
                <li className="list-group-item">
                  <Link href="/admin/crud/category-tag">
                    <a>Create Tag</a>
                  </Link>
                </li>
              </List>
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default AdminIndex;
