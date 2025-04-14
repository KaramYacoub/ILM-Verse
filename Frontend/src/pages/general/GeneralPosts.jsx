import { useState } from "react";
import { Plus, X, Pencil } from "lucide-react";
import GeneralNav from "../../components/general/GeneralNav";
import Post from "../../components/shared/Post";

function GeneralPosts() {
  const [posts, setPosts] = useState([
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
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  const handleAddOrUpdatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingPost) {
      // Update
      const updatedPosts = posts.map((post) =>
        post.id === editingPost.id ? { ...post, ...newPost } : post
      );
      setPosts(updatedPosts);
    } else {
      // Add
      const newId = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1;
      const postToAdd = { id: newId, ...newPost };
      setPosts([...posts, postToAdd]);
    }

    setNewPost({ title: "", content: "" });
    setEditingPost(null);
    setShowModal(false);
  };

  const handleEdit = (postId) => {
    const post = posts.find((p) => p.id === postId);
    setEditingPost(post);
    setNewPost({ title: post.title, content: post.content });
    setShowModal(true);
  };

  const handleDelete = (postId) => {
    if (window.confirm("Delete this post?")) {
      setPosts(posts.filter((post) => post.id !== postId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <GeneralNav />

      <div className="p-8 max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-6">Posts</h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowModal(true);
              setEditingPost(null);
              setNewPost({ title: "", content: "" });
            }}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Post
          </button>
        </div>

        <div className="space-y-6 mb-8">
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              isManageer="true"
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowModal(false);
                setEditingPost(null);
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold mb-4">
              {editingPost ? "Edit Post" : "Add New Post"}
            </h2>

            <div className="mb-4">
              <label className="block text-lg font-medium mb-1">Title</label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter post title"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg font-medium mb-1">Content</label>
              <textarea
                className="textarea textarea-bordered w-full h-40"
                placeholder="Write your post content here..."
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
              ></textarea>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleAddOrUpdatePost}
                className="btn btn-primary"
              >
                {editingPost ? (
                  <>
                    <Pencil className="w-5 h-5 mr-2" />
                    Update Post
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-2" />
                    Add Post
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GeneralPosts;
