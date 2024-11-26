import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { LayoutPage } from "../pages/LayoutPage";
import { LoginPage } from "../pages/LoginPage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { SingleInvitationPage } from "../pages/SingleInvitationPage";
import { MainPage } from "../pages/MainPage";
import { AuthGuardPage } from "../pages/AuthGuardPage";
import { CreateNewAppointmentPage } from "../pages/CreateNewAppointmentPage";
import { GroupsPage } from "../pages/GroupsPage";
import { SingleCreatedEvent } from "../pages/SingleCreatedEvent";

export const AppRouter = createBrowserRouter([
    {
        element: <HomePage />,
        path: "/",
    },
    {
        element: <LayoutPage />,
        path: "/",
        children: [
            {
                element: (
                    <AuthGuardPage />
                ),
                children: [
                    {
                        element: (
                            <CreateNewAppointmentPage />
                        ),
                        path: "newappointment",
                    },
                    {
                        element: (
                            <MainPage />
                        ),
                        path: "main",
                    },  
                    {
                        element: (
                            <SingleCreatedEvent />
                        ),
                        path: "event/:id",
                    }, 
                    {
                        element: (
                            <GroupsPage />
                        ),
                        path: "groups",
                    },              
                ]
            },
        ]
    },
    {
        element: <LoginPage />,
        path: "login",
    },
    {
        element: <RegistrationPage />,
        path: "registration",
    },
    {
        element: <SingleInvitationPage />,
        path: "invitation/:id",
    },
]);
