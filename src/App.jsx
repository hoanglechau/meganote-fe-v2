import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import useTitle from "./hooks/useTitle";
import { useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  // Custom hook to set the page title
  useTitle("Meganote");

  // Get the theme from the global state
  const { theme } = useSelector(state => state.theme);

  // Create the theme
  const appTheme = createTheme({
    palette: {
      mode: theme,
      primary: {
        main: "#C13258",
        light: "#E16595",
        dark: "#9A264B",
      },
      secondary: {
        main: "#42A5F5",
        light: "#65C1FF",
        dark: "#2894E6",
      },
      background: {
        default: "#ffffff",
        light: "#F7FAFC",
        dark: "#212121",
      },
      text: {
        light: "#616161",
        dark: "#FFFFFF",
      },
    },
    typography: {
      fontFamily: "Roboto",
      fontSize: 16,
    },
  });

  return (
    <ThemeProvider theme={appTheme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
            {/* All roles (logged in users) are allowed to access the wrapped routes */}
            <Route
              element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
            >
              {/* If someone is not authorized, we're not going to prefetch the data, so we wrap 'RequireAuth' around 'Prefect' */}
              <Route element={<Prefetch />}>
                {/* Dash */}
                <Route path="dash" element={<DashLayout />}>
                  <Route index element={<Welcome />} />

                  {/* Only managers and admins are allowed to access the users route */}
                  <Route
                    element={
                      <RequireAuth
                        allowedRoles={[ROLES.Manager, ROLES.Admin]}
                      />
                    }
                  >
                    <Route path="users">
                      <Route index element={<UsersList />} />
                      <Route path=":id" element={<EditUser />} />
                      <Route path="new" element={<NewUserForm />} />
                    </Route>
                  </Route>

                  <Route path="notes">
                    <Route index element={<NotesList />} />
                    <Route path=":id" element={<EditNote />} />
                    <Route path="new" element={<NewNote />} />
                  </Route>
                </Route>
                {/* End Dash */}
              </Route>
            </Route>
          </Route>
          {/* End Protected Routes */}
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
