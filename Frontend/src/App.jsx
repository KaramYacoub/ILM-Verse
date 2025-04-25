import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./store/AuthStore";
import { Loader2 } from "lucide-react";

import Error from "./pages/shared/Error";
import Home from "./pages/shared/Home";
import Footer from "./components/shared/Footer";
import StudentLogin from "./pages/shared/studentLogin";
import StaffLogin from "./pages/shared/StaffLogin";
import AboutUs from "./pages/shared/AboutUs";
import ContactUs from "./pages/shared/ContactUs";
import SharedEvents from "./pages/shared/SharedEvents";

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentViewGrades from "./pages/student/StudentViewGrades";
import StudentEvents from "./pages/student/StudentEvents";
import StudentShowQuizzes from "./pages/student/StudentShowQuizzes";
import StudentQuizDetails from "./pages/student/StudentQuizDetails";
import StudentCourseContent from "./pages/student/StudentCourseContent";
import StudentOverviewTab from "./components/student/tabs/StudentOverviewTab";
import StudentLessonsTab from "./components/student/tabs/StudentLessonsTab";
import StudentAssignmentsTab from "./components/student/tabs/StudentAssignmentsTab";
import StudentResourcesTab from "./components/student/tabs/StudentResourcesTab";

import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherEvents from "./pages/teacher/teacherEvents";
import TeacherCourseContent from "./pages/teacher/teacherCourseContent";
import TeacherOverviewTab from "./components/teacher/tabs/TeacherOverviewTab";
import TeacherUnitContentTab from "./components/teacher/tabs/TeacherUnitContentTab";
import TeacherAssignmentsTab from "./components/teacher/tabs/TeacherAssignmentsTab";
import TeacherCoresStudentab from "./components/teacher/tabs/TeacherCourseStudentsTab";
import TeacherQuizzesTab from "./components/teacher/tabs/TeacherQuizzesTab";
import TeacherAddQuizzes from "./components/teacher/TeacherAddQuiz";

import ParentDashboard from "./pages/parent/ParentDashboard";
import ParentEvents from "./pages/parent/ParentEvents";
import ParentAssignment from "./components/parent/Tabs/ParentAssignment";
import ParentOverview from "./components/parent/Tabs/ParentOverview";
import ParentCourseContent from "./pages/parent/ParentCourseContent";
import ParentLessons from "./components/parent/Tabs/ParentLessons";
import ParentResourcesTab from "./components/parent/Tabs/ParentResourcesTap";

import GeneralDash from "./pages/general/GeneralDash";
import Addition from "./pages/general/Addition";
import Deletion from "./pages/general/Deletition";
import CourseContent from "./pages/general/CourseContent";
import ResetPassword from "./pages/general/ResetPassword";
import DeleteContent from "./pages/general/DeleteContent";
import Settings from "./pages/general/Settings";
import GenralEvents from "./pages/general/GenralEvents";
import Reports from "./pages/general/Reports";
import GenerateReport from "./pages/general/GenerateReports";
import AddCourse from "./pages/general/AddCourse";
import ParentViewGrades from "./pages/parent/ParentViewGrades";
import ParentShowReports from "./pages/parent/ParentShowReports";

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
			<div className='flex items-center justify-center h-screen'>
				<Loader2 className='animate-spin' size={50} />
			</div>
		);
	}
	return (
		<div data-theme='mytheme'>
			<Routes>
				{/* Shared Routes */}
				<Route path='*' element={<Error />} />
				<Route
					path='/'
					element={
						!isAuthenticated ? <Home /> : <Navigate to={getRedirectPath()} />
					}
				/>
				<Route
					path='/about us'
					element={
						!isAuthenticated ? <AboutUs /> : <Navigate to={getRedirectPath()} />
					}
				/>
				<Route
					path='/contact'
					element={
						!isAuthenticated ? (
							<ContactUs />
						) : (
							<Navigate to={getRedirectPath()} />
						)
					}
				/>
				<Route
					path='/shared-events'
					element={
						!isAuthenticated ? (
							<SharedEvents />
						) : (
							<Navigate to={getRedirectPath()} />
						)
					}
				/>
				<Route
					path='/studentLogin'
					element={
						!isAuthenticated ? (
							<StudentLogin />
						) : (
							<Navigate to={getRedirectPath()} />
						)
					}
				/>
				<Route
					path='/staffLogin'
					element={
						!isAuthenticated ? (
							<StaffLogin />
						) : (
							<Navigate to={getRedirectPath()} />
						)
					}
				/>

				{/* Student Routes */}
				<Route
					path='/student-dashboard'
					element={authStudent ? <StudentDashboard /> : <Navigate to={"/"} />}
				/>
				<Route
					path='/student-view-grades'
					element={authStudent ? <StudentViewGrades /> : <Navigate to='/' />}
				/>
				<Route
					path='/student-show-quizzes'
					element={authStudent ? <StudentShowQuizzes /> : <Navigate to='/' />}
				/>
				<Route
					path='/Student-Quiz-Details'
					element={authStudent ? <StudentQuizDetails /> : <Navigate to='/' />}
				/>
				<Route
					path='/events'
					element={authStudent ? <StudentEvents /> : <Navigate to='/' />}
				/>
				<Route
					path='/student-course-content/'
					element={
						authStudent ? <StudentCourseContent /> : <Navigate to='/' />
					}>
					<Route index element={<Navigate replace to='student-overview' />} />
					<Route
						path='student-overview'
						element={authStudent ? <StudentOverviewTab /> : <Navigate to='/' />}
					/>
					<Route
						path='student-lessons'
						element={authStudent ? <StudentLessonsTab /> : <Navigate to='/' />}
					/>
					<Route
						path='student-resources'
						element={
							authStudent ? <StudentResourcesTab /> : <Navigate to='/' />
						}
					/>
					<Route
						path='student-assignments'
						element={
							authStudent ? <StudentAssignmentsTab /> : <Navigate to='/' />
						}
					/>
				</Route>

				{/* Teacher Routes */}
				<Route
					path='/teacher-dashboard'
					element={authTeacher ? <TeacherDashboard /> : <Navigate to='/' />}
				/>
				<Route
					path='/teacher-events'
					element={authTeacher ? <TeacherEvents /> : <Navigate to='/' />}
				/>
				<Route
					path='/teacher-course-content/'
					element={
						authTeacher ? <TeacherCourseContent /> : <Navigate to='/' />
					}>
					<Route
						index
						element={<Navigate replace to='teacher-course-students' />}
					/>
					<Route
						path='teacher-unit-content'
						element={
							authTeacher ? <TeacherUnitContentTab /> : <Navigate to='/' />
						}
					/>
					<Route
						path='teacher-overview'
						element={authTeacher ? <TeacherOverviewTab /> : <Navigate to='/' />}
					/>
					<Route
						path='teacher-course-students'
						element={
							authTeacher ? <TeacherCoresStudentab /> : <Navigate to='/' />
						}
					/>
					<Route
						path='teacher-assignments'
						element={
							authTeacher ? <TeacherAssignmentsTab /> : <Navigate to='/' />
						}
					/>
					<Route
						path='teacher-quizzes'
						element={authTeacher ? <TeacherQuizzesTab /> : <Navigate to='/' />}
					/>
				</Route>
				<Route
					path='/teacher-course-content/teacher-quizzes/teacher-add-quiz'
					element={authTeacher ? <TeacherAddQuizzes /> : <Navigate to='/' />}
				/>

				{/* Parent Routes */}
				<Route
					path='/parent-dashboard'
					element={authParent ? <ParentDashboard /> : <Navigate to='/' />}
				/>
				<Route
					path='/parent-events'
					element={authParent ? <ParentEvents /> : <Navigate to='/' />}
				/>
				<Route
					path='/parent-view-grades'
					element={authParent ? <ParentViewGrades /> : <Navigate to='/' />}
				/>
				<Route
					path='/parent-show-reports'
					element={authParent ? <ParentShowReports /> : <Navigate to='/' />}
				/>
				<Route
					path='/parent-course-content'
					element={authParent ? <ParentCourseContent /> : <Navigate to='/' />}>
					<Route index element={<Navigate replace to='parent-overview' />} />
					<Route
						path='parent-overview'
						element={authParent ? <ParentOverview /> : <Navigate to='/' />}
					/>
					<Route
						path='parent-lessons'
						element={authParent ? <ParentLessons /> : <Navigate to='/' />}
					/>
					<Route
						path='parent-resources'
						element={authParent ? <ParentResourcesTab /> : <Navigate to='/' />}
					/>
					<Route
						path='parent-assignments'
						element={authParent ? <ParentAssignment /> : <Navigate to='/' />}
					/>
					<Route
						path='parent-quizzes'
						element={authParent ? <TeacherQuizzesTab /> : <Navigate to='/' />}
					/>
				</Route>

				{/* General Routes */}
				<Route
					path='/general-dashboard'
					element={authAdmin ? <GeneralDash /> : <Navigate to='/' />}
				/>
				<Route
					path='/addition'
					element={authAdmin ? <Addition /> : <Navigate to='/' />}
				/>
				<Route
					path='/deletion'
					element={authAdmin ? <Deletion /> : <Navigate to='/' />}
				/>
				<Route
					path='/reset-password'
					element={authAdmin ? <ResetPassword /> : <Navigate to='/' />}
				/>
				<Route
					path='/delete-content/:courseId'
					element={authAdmin ? <DeleteContent /> : <Navigate to='/' />}
				/>
				<Route
					path='/coursecontent'
					element={authAdmin ? <CourseContent /> : <Navigate to='/' />}
				/>
				<Route
					path='/settings'
					element={authAdmin ? <Settings /> : <Navigate to='/' />}
				/>
				<Route
					path='/general-event'
					element={authAdmin ? <GenralEvents /> : <Navigate to='/' />}
				/>
				<Route
					path='/reports'
					element={authAdmin ? <Reports /> : <Navigate to='/' />}
				/>
				<Route
					path='/generate-report'
					element={authAdmin ? <GenerateReport /> : <Navigate to='/' />}
				/>
				<Route
					path='/addCourse'
					element={authAdmin ? <AddCourse /> : <Navigate to='/' />}
				/>
			</Routes>

			{/* Footer */}
			<Footer />
		</div>
	);
}

export default App;
