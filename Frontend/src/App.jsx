import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useAuthStore } from "./store/AuthStore";
import { Loader2 } from "lucide-react";

const Error = lazy(() => import("./pages/shared/Error"));
const Home = lazy(() => import("./pages/shared/Home"));
const Footer = lazy(() => import("./components/shared/Footer"));
const StudentLogin = lazy(() => import("./pages/shared/studentLogin"));
const StaffLogin = lazy(() => import("./pages/shared/StaffLogin"));
const AboutUs = lazy(() => import("./pages/shared/AboutUs"));
const ContactUs = lazy(() => import("./pages/shared/ContactUs"));
const SharedEvents = lazy(() => import("./pages/shared/SharedEvents"));

const StudentDashboard = lazy(() => import("./pages/student/StudentDashboard"));
const StudentViewGrades = lazy(() =>
  import("./pages/student/StudentViewGrades")
);
const StudentShowQuizzes = lazy(() =>
  import("./pages/student/StudentShowQuizzes")
);
const StudentQuizDetails = lazy(() =>
  import("./pages/student/StudentQuizDetails")
);
const StudentCourseContent = lazy(() =>
  import("./pages/student/StudentCourseContent")
);
const StudentOverviewTab = lazy(() =>
  import("./components/student/tabs/StudentOverviewTab")
);
const StudentLessonsTab = lazy(() =>
  import("./components/student/tabs/StudentLessonsTab")
);
const StudentAssignmentsTab = lazy(() =>
  import("./components/student/tabs/StudentAssignmentsTab")
);
const StudentResourcesTab = lazy(() =>
  import("./components/student/tabs/StudentResourcesTab")
);

const TeacherDashboard = lazy(() => import("./pages/teacher/TeacherDashboard"));
const TeacherCourseContent = lazy(() =>
  import("./pages/teacher/teacherCourseContent")
);
const TeacherOverviewTab = lazy(() =>
  import("./components/teacher/tabs/TeacherOverviewTab")
);
const TeacherUnitContentTab = lazy(() =>
  import("./components/teacher/tabs/TeacherUnitContentTab")
);
const TeacherAssignmentsTab = lazy(() =>
  import("./components/teacher/tabs/TeacherAssignmentsTab")
);
const TeacherCoresStudentab = lazy(() =>
  import("./components/teacher/tabs/TeacherCourseStudentsTab")
);
const TeacherQuizzesTab = lazy(() =>
  import("./components/teacher/tabs/TeacherQuizzesTab")
);
const TeacherAddQuizzes = lazy(() =>
  import("./components/teacher/TeacherAddQuiz")
);

const ParentDashboard = lazy(() => import("./pages/parent/ParentDashboard"));
const ParentAssignment = lazy(() =>
  import("./components/parent/Tabs/ParentAssignment")
);
const ParentOverview = lazy(() =>
  import("./components/parent/Tabs/ParentOverview")
);
const ParentCourseContent = lazy(() =>
  import("./pages/parent/ParentCourseContent")
);
const ParentLessons = lazy(() =>
  import("./components/parent/Tabs/ParentLessons")
);
const ParentResourcesTab = lazy(() =>
  import("./components/parent/Tabs/ParentResourcesTap")
);
const ParentViewGrades = lazy(() => import("./pages/parent/ParentViewGrades"));
const ParentShowReports = lazy(() =>
  import("./pages/parent/ParentShowReports")
);
const ParentShowQuizzes = lazy(() =>
  import("./pages/parent/ParentShowQuizzes")
);
const ParentShowAbsences = lazy(() =>
  import("./pages/parent/ParentShowAbsences")
);

const GeneralDash = lazy(() => import("./pages/general/GeneralDash"));
const Addition = lazy(() => import("./pages/general/Addition"));
const Deletion = lazy(() => import("./pages/general/Deletition"));
const CourseContent = lazy(() => import("./pages/general/CourseContent"));
const ResetPassword = lazy(() => import("./pages/general/ResetPassword"));
const DeleteContent = lazy(() => import("./pages/general/DeleteContent"));
const Settings = lazy(() => import("./pages/general/Settings"));
const GenralEvents = lazy(() => import("./pages/general/GenralEvents"));
const Reports = lazy(() => import("./pages/general/Reports"));
const GenerateReport = lazy(() => import("./pages/general/GenerateReports"));
const AddCourse = lazy(() => import("./pages/general/AddCourse"));
const AdminCourseOverview = lazy(() =>
  import("./components/courseThings/AdminCourseOverview")
);
const AdminUnitContent = lazy(() =>
  import("./components/courseThings/AdminUnitContent")
);
function App() {
  const {
    isCheckingAuth,
    authAdmin,
    authTeacher,
    authStudent,
    authParent,
    checkAuth,
  } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const isAuthenticated = authAdmin || authTeacher || authStudent || authParent;

  const getRedirectPath = () => {
    if (authAdmin) return "/general-dashboard";
    if (authTeacher) return "/teacher-dashboard";
    if (authStudent) return "/student-dashboard";
    if (authParent) return "/parent-dashboard";
    return "/";
  };

  if (isCheckingAuth && !isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin" size={50} />
      </div>
    );
  }
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="animate-spin" size={50} />
        </div>
      }
    >
      <div data-theme="mytheme">
        <Routes>
          {/* Shared Routes */}
          <>
            <Route path="*" element={<Error />} />
            <Route
              path="/"
              element={
                !isAuthenticated ? (
                  <Home />
                ) : (
                  <Navigate to={getRedirectPath()} />
                )
              }
            />
            <Route
              path="/about us"
              element={
                !isAuthenticated ? (
                  <AboutUs />
                ) : (
                  <Navigate to={getRedirectPath()} />
                )
              }
            />
            <Route
              path="/contact"
              element={
                !isAuthenticated ? (
                  <ContactUs />
                ) : (
                  <Navigate to={getRedirectPath()} />
                )
              }
            />
            <Route
              path="/studentLogin"
              element={
                !isAuthenticated ? (
                  <StudentLogin />
                ) : (
                  <Navigate to={getRedirectPath()} />
                )
              }
            />
            <Route
              path="/staffLogin"
              element={
                !isAuthenticated ? (
                  <StaffLogin />
                ) : (
                  <Navigate to={getRedirectPath()} />
                )
              }
            />
            <Route
              path="/events"
              element={<SharedEvents />}
            />
          </>

          {/* Student Routes */}
          <>
            <Route
              path="/student-dashboard"
              element={
                authStudent ? <StudentDashboard /> : <Navigate to={"/"} />
              }
            />
            <Route
              path="/student-view-grades"
              element={
                authStudent ? <StudentViewGrades /> : <Navigate to="/" />
              }
            />
            <Route
              path="/student-show-quizzes"
              element={
                authStudent ? <StudentShowQuizzes /> : <Navigate to="/" />
              }
            />
            <Route
              path="/Student-Quiz-Details"
              element={
                authStudent ? <StudentQuizDetails /> : <Navigate to="/" />
              }
            />
            <Route
              path="/student-course-content/"
              element={
                authStudent ? <StudentCourseContent /> : <Navigate to="/" />
              }
            >
              <Route
                index
                element={<Navigate replace to="student-overview" />}
              />
              <Route
                path="student-overview"
                element={
                  authStudent ? <StudentOverviewTab /> : <Navigate to="/" />
                }
              />
              <Route
                path="student-lessons"
                element={
                  authStudent ? <StudentLessonsTab /> : <Navigate to="/" />
                }
              />
              <Route
                path="student-resources"
                element={
                  authStudent ? <StudentResourcesTab /> : <Navigate to="/" />
                }
              />
              <Route
                path="student-assignments"
                element={
                  authStudent ? <StudentAssignmentsTab /> : <Navigate to="/" />
                }
              />
            </Route>
          </>

          {/* Teacher Routes */}
          <>
            <Route
              path="/teacher-dashboard"
              element={authTeacher ? <TeacherDashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/teacher-course-content/"
              element={
                authTeacher ? <TeacherCourseContent /> : <Navigate to="/" />
              }
            >
              <Route
                index
                element={<Navigate replace to="teacher-course-students" />}
              />
              <Route
                path="teacher-unit-content"
                element={
                  authTeacher ? <TeacherUnitContentTab /> : <Navigate to="/" />
                }
              />
              <Route
                path="teacher-overview"
                element={
                  authTeacher ? <TeacherOverviewTab /> : <Navigate to="/" />
                }
              />
              <Route
                path="teacher-course-students"
                element={
                  authTeacher ? <TeacherCoresStudentab /> : <Navigate to="/" />
                }
              />
              <Route
                path="teacher-assignments"
                element={
                  authTeacher ? <TeacherAssignmentsTab /> : <Navigate to="/" />
                }
              />
              <Route
                path="teacher-quizzes"
                element={
                  authTeacher ? <TeacherQuizzesTab /> : <Navigate to="/" />
                }
              />
            </Route>
            <Route
              path="/teacher-course-content/teacher-quizzes/teacher-add-quiz"
              element={
                authTeacher ? <TeacherAddQuizzes /> : <Navigate to="/" />
              }
            />
          </>

          {/* Parent Routes */}
          <>
            <Route
              path="/parent-dashboard"
              element={authParent ? <ParentDashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/parent-view-grades"
              element={authParent ? <ParentViewGrades /> : <Navigate to="/" />}
            />
            <Route
              path="/parent-show-reports"
              element={authParent ? <ParentShowReports /> : <Navigate to="/" />}
            />
            <Route
              path="/parent-show-absences"
              element={
                authParent ? <ParentShowAbsences /> : <Navigate to="/" />
              }
            />
            <Route
              path="/parent-quizzes"
              element={authParent ? <ParentShowQuizzes /> : <Navigate to="/" />}
            />
            <Route
              path="/parent-course-content"
              element={
                authParent ? <ParentCourseContent /> : <Navigate to="/" />
              }
            >
              <Route
                index
                element={<Navigate replace to="parent-overview" />}
              />
              <Route
                path="parent-overview"
                element={authParent ? <ParentOverview /> : <Navigate to="/" />}
              />
              <Route
                path="parent-lessons"
                element={authParent ? <ParentLessons /> : <Navigate to="/" />}
              />
              <Route
                path="parent-resources"
                element={
                  authParent ? <ParentResourcesTab /> : <Navigate to="/" />
                }
              />
              <Route
                path="parent-assignments"
                element={
                  authParent ? <ParentAssignment /> : <Navigate to="/" />
                }
              />
            </Route>
          </>

          {/* General Routes */}
          <>
            <Route
              path="/general-dashboard"
              element={authAdmin ? <GeneralDash /> : <Navigate to="/" />}
            />
            <Route
              path="/addition"
              element={authAdmin ? <Addition /> : <Navigate to="/" />}
            />
            <Route
              path="/deletion"
              element={authAdmin ? <Deletion /> : <Navigate to="/" />}
            />
            <Route
              path="/reset-password"
              element={authAdmin ? <ResetPassword /> : <Navigate to="/" />}
            />
            <Route
              path="/delete-content/:courseId/"
              element={authAdmin ? <DeleteContent /> : <Navigate to="/" />}
            />
            <Route
              path="/coursecontent"
              element={authAdmin ? <CourseContent /> : <Navigate to="/" />}
            />

            <Route
              path="/settings"
              element={authAdmin ? <Settings /> : <Navigate to="/" />}
            />
            <Route
              path="/general-event"
              element={authAdmin ? <GenralEvents /> : <Navigate to="/" />}
            />
            <Route
              path="/reports"
              element={authAdmin ? <Reports /> : <Navigate to="/" />}
            />
            <Route
              path="/generate-report"
              element={authAdmin ? <GenerateReport /> : <Navigate to="/" />}
            />
            <Route
              path="/addCourse"
              element={authAdmin ? <AddCourse /> : <Navigate to="/" />}
            />
            <Route
              path="/admin-course-overview/:courseId"
              element={<AdminCourseOverview />}
            />
            <Route
              path="/admin-unit-content/:courseId"
              element={<AdminUnitContent />}
            />
          </>
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Suspense>
  );
}

export default App;
