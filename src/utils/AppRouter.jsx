import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { LayoutPage } from "../pages/LayoutPage";
import { LoginPage } from "../pages/LoginPage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { SingleInvitationPage } from "../pages/SingleInvitationPage";
import { MainPage } from "../pages/MainPage";
import { AuthGuardPage } from "../pages/AuthGuardPage";
import { CreateNewAppointmentPage } from "../pages/CreateNewAppointmentPage";
import { SingleCreatedEvent } from "../pages/SingleCreatedEvent";
import { MyCreatedEventsPage } from "../pages/MyCreatedEventsPage";
import { MyReceivedInvitationsPage } from "../pages/MyReceivedInvitationsPage";
import { MySavedDraftsPage } from "../pages/MySavedDraftsPage";
import { SingleDraftPage } from "../pages/SingleDraftPage";

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
                            <MyCreatedEventsPage />
                        ),
                        path: "myevents",
                    },
                    {
                        element: (
                            <MyReceivedInvitationsPage />
                        ),
                        path: "myinvitations",
                    },
                    {
                        element: (
                            <MySavedDraftsPage />
                        ),
                        path: "mydrafts",
                    },
                    {
                        element: (
                            <SingleCreatedEvent />
                        ),
                        path: "event/:id",
                    }, 
                    {
                        element: (
                            <SingleInvitationPage />
                        ),
                        path: "invitation/:id",
                    }, 
                    {
                        element: (
                            <SingleDraftPage />
                        ),
                        path: "draft/:id",
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
