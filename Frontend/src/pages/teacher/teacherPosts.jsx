import Breadcrumbs from "../../components/shared/Breadcrumbs";
import Post from "../../components/shared/Post";
import TeacherNavbar from "../../components/teacher/TeacherNavbar";

function TeacherPosts() {
  const posts = [
    {
      id: 1,
      title: "First Day of School",
      content: "Welcome back students for the new academic year...",
    },
    {
      id: 2,
      title: "Science Fair Announcement",
      content: "Our annual science fair will be held on...",
    },
  ];
  const breadcrumbPages = [
    { name: "My Courses", path: "/teacher-ashboard" },
  ];

  return (
    <div className="min-h-screen bg-base-200 pb-5">
      <TeacherNavbar />
      <Breadcrumbs
        prevPages={breadcrumbPages}
        currentPage='Posts'
      />
      <h1 className="text-3xl text-primary m-5 font-bold">Posts</h1>

      <div className="space-y-6 mt-8 px-4">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default TeacherPosts;
